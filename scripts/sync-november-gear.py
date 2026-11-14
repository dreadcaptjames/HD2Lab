#!/usr/bin/env python3
"""Cache November 2026 HD2Lab additions from the wiki-backed Helldivers 2 Data API.

Files are stored in the repository for stable GitHub Pages and PDF use:
 - AR-23L Liberator Legacy weapon render (WebP)
 - SS-500 Pale Prosecutor full armor render (WebP)
The 112 existing armor entries remain untouched in the manifest.
"""
from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://helldivers-api.dionatha.com.br"
WEAPON_ID = "primary-ar23lliberatorlegacy"
ARMOR_ID = "armor-ss500paleprosecutor"


def download(url: str) -> bytes:
    req = Request(url, headers={"User-Agent": "HD2Lab-Asset-Cache/1.1"})
    with urlopen(req, timeout=45) as response:
        return response.read()


def item_with_render(collection: str, slug: str, name: str) -> tuple[dict, bytes]:
    payload = json.loads(download(f"{BASE}/v1/{collection}/{slug}.json"))
    record = payload.get("data", payload)
    if record.get("name") != name or record.get("upcoming") is True:
        raise RuntimeError(f"Unexpected catalog item response for {name}")
    image_url = urljoin(BASE, record.get("image", {}).get("url", ""))
    parsed = urlparse(image_url)
    if (parsed.scheme != "https" or parsed.netloc != "helldivers-api.dionatha.com.br"
            or not parsed.path.startswith(f"/images/v1/{collection}/")
            or not parsed.path.endswith(".webp")):
        raise RuntimeError(f"Unexpected image URL for {name}: {image_url}")
    content = download(image_url)
    if len(content) < 64 or content[:4] != b"RIFF" or content[8:12] != b"WEBP":
        raise RuntimeError(f"Invalid WebP image for {name}")
    return record, content


def main() -> None:
    catalog = (ROOT / "data.js").read_text(encoding="utf-8")
    if WEAPON_ID not in catalog or ARMOR_ID not in catalog:
        raise RuntimeError("New gear must be in data.js before downloading its artwork")
    weapon, gun = item_with_render("weapons", "ar-23l-liberator-legacy", "AR-23L Liberator Legacy")
    armor, suit = item_with_render("armors", "ss-500-pale-prosecutor", "SS-500 Pale Prosecutor")

    weapon_target = ROOT / "assets" / "equipment" / "primary" / f"{WEAPON_ID}.webp"
    armor_target = ROOT / "assets" / "armor" / f"{ARMOR_ID}.webp"
    manifest_target = ROOT / "assets" / "armor" / "manifest.json"

    manifest = json.loads(manifest_target.read_text(encoding="utf-8"))
    if len(manifest.get("images", {})) < 112:
        raise RuntimeError("Existing armor inventory manifest is unexpectedly incomplete")
    manifest["images"][ARMOR_ID] = f"{ARMOR_ID}.webp"
    manifest["images"] = dict(sorted(manifest["images"].items()))
    manifest["sourceVersion"] = armor.get("sourceVersion", manifest.get("sourceVersion"))
    manifest["unmatchedArmor"] = [item for item in manifest.get("unmatchedArmor", [])
                                  if item != "SS-500 Pale Prosecutor"]
    manifest["failedDownloads"] = [item for item in manifest.get("failedDownloads", [])
                                   if "SS-500 Pale Prosecutor" not in item]
    manifest["newGearSync"] = {
        "weapon": weapon["name"],
        "armor": armor["name"],
        "source": BASE,
    }

    weapon_target.parent.mkdir(parents=True, exist_ok=True)
    armor_target.parent.mkdir(parents=True, exist_ok=True)
    weapon_target.write_bytes(gun)
    armor_target.write_bytes(suit)
    manifest_target.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
                               encoding="utf-8")
    print(f"Cached {weapon['name']} ({len(gun)} bytes)")
    print(f"Cached {armor['name']} ({len(suit)} bytes)")
    print(f"Local armor artwork coverage: {len(manifest['images'])} images")


if __name__ == "__main__":
    main()
