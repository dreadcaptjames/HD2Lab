#!/usr/bin/env python3
"""Cache matching Helldivers 2 armor renders as static WebP assets.

Source: https://helldivers-api.dionatha.com.br/v1/armors.json
Its wiki-backed armor records include image references, served as 512px WebP.
Only matching BODY ARMOR from this repository's catalog is downloaded.
No network access is required to use the website after these files are checked in.
"""
from __future__ import annotations

import json
import re
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "armor"
BASE = "https://helldivers-api.dionatha.com.br"
CATALOG_URL = BASE + "/v1/armors.json"
USER_AGENT = "HD2Lab-Armor-Asset-Cache/1.0 (unofficial fan project)"


def load_url(url: str) -> bytes:
    last_error = None
    for attempt in range(4):
        try:
            req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
            with urlopen(req, timeout=40) as response:
                return response.read()
        except Exception as exc:
            last_error = exc
            if attempt < 3:
                time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Cannot retrieve {url}: {last_error}") from last_error


def normalize(name: str) -> str:
    ascii_name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", ascii_name.lower())


def armor_catalog() -> list[dict[str, str]]:
    source = (ROOT / "data.js").read_text(encoding="utf-8")
    match = re.search(r"window\.HD2_DB=(\{.*?\});\s*window\.HD2_CATALOG", source, re.S)
    if not match:
        raise RuntimeError("Cannot find the JSON armor catalog in data.js")
    entries = [{"id": entry["id"], "name": entry["name"]}
               for entry in json.loads(match.group(1))["armor"]]

    # The Scope of Authority entries are embedded in index.html, not data.js.
    markup = (ROOT / "index.html").read_text(encoding="utf-8")
    extra = re.search(r"const entries=\{\s*armor:\s*\[(.*?)\],\s*primary:\s*\[", markup, re.S)
    if extra:
        for match in re.finditer(r"\{id:'([^']+)',name:'([^']+)'", extra.group(1)):
            entries.append({"id": match.group(1), "name": match.group(2)})

    distinct = {entry["id"]: entry for entry in entries}
    return list(distinct.values())


def download_armor(entry: dict[str, str], remote_image: str) -> tuple[str, str]:
    item_id = entry["id"]
    if not re.fullmatch(r"[A-Za-z0-9_-]+", item_id):
        raise ValueError(f"Unsafe catalog item ID: {item_id}")
    image_url = urljoin(BASE, remote_image)
    parsed = urlparse(image_url)
    if (parsed.scheme != "https" or parsed.netloc != urlparse(BASE).netloc
            or not parsed.path.startswith("/images/v1/armors/")
            or not parsed.path.endswith(".webp")):
        raise ValueError(f"Unexpected image source for {item_id}: {image_url}")

    filename = item_id + ".webp"
    content = load_url(image_url)
    if len(content) < 64 or content[:4] != b"RIFF" or content[8:12] != b"WEBP":
        raise ValueError(f"Invalid WebP payload for {item_id}: {image_url}")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    target = OUTPUT / filename
    temporary = OUTPUT / (filename + ".tmp")
    temporary.write_bytes(content)
    temporary.replace(target)
    return item_id, filename


def main() -> None:
    entries = armor_catalog()
    source = json.loads(load_url(CATALOG_URL))
    by_name = {normalize(record["name"]): record for record in source["data"]}
    targets = []
    missing = []
    for entry in entries:
        record = by_name.get(normalize(entry["name"]))
        remote_image = record.get("image", {}).get("url") if record else None
        if remote_image:
            targets.append((entry, remote_image))
        else:
            missing.append(entry["name"])

    fetched: dict[str, str] = {}
    failures = []
    with ThreadPoolExecutor(max_workers=6) as pool:
        jobs = {pool.submit(download_armor, entry, image): entry["name"]
                for entry, image in targets}
        for task in as_completed(jobs):
            try:
                item_id, filename = task.result()
                fetched[item_id] = filename
            except Exception as exc:
                failures.append(f"{jobs[task]}: {exc}")

    # Avoid committing a misleading or empty manifest on upstream outages.
    if len(fetched) < max(80, int(len(entries) * 0.75)):
        raise RuntimeError(f"Downloaded only {len(fetched)} of {len(entries)} images; "
                           + "; ".join(failures[:6]))

    manifest = {
        "source": CATALOG_URL,
        "sourceVersion": source.get("meta", {}).get("dataVersion"),
        "images": dict(sorted(fetched.items())),
        "unmatchedArmor": sorted(missing),
        "failedDownloads": sorted(failures),
    }
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Armor images: {len(fetched)} of {len(entries)} catalog items cached.")
    if missing:
        print("Unmatched catalog names: " + ", ".join(missing))
    if failures:
        print("Failed downloads: " + "; ".join(failures))


if __name__ == "__main__":
    main()
