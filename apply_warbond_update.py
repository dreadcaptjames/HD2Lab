#!/usr/bin/env python3
"""Patch existing HD2Lab source archive/directory for Scope of Authority.

Usage:
  python apply_warbond_update.py /path/to/helldivers-synergy-lab-v6.0-site.zip
  python apply_warbond_update.py /path/to/site-folder
  python apply_warbond_update.py /path/to/helldivers-synergy-lab-v6.0-standalone.html

Never downloads or overwrites the input. Emits a *-scope-of-authority.zip or HTML.
"""
import argparse
import copy
import json
import re
import tempfile
import zipfile
from pathlib import Path

BASE = Path(__file__).resolve().parent
INFO = json.loads((BASE / 'warbond_items.json').read_text(encoding='utf-8'))
WAR = INFO['items']
SOURCE = INFO['officialSource']
DATE = INFO['releaseDate']
ROOT = 'window.HD2_DB='
META = 'window.HD2_CATALOG='

STEALTH_OLD = "if(armor.tags.includes('stealth')&&(primary.tags.includes('precision')||primary.tags.includes('stealth')||state.mission==='stealth'))bonus(6,'Scout × low-contact approach','Reduced detection and radar information reinforce deliberate target selection and avoidance.');"
STEALTH_NEW = """if(armor.passive==='Stationary Shroud'&&(primary.tags.includes('precision')||strats.some(x=>x.tags.includes('precision'))))bonus(7,'Stationary Shroud × precision overwatch','Reduced sway and detection while crouched or prone reinforce your long-range precision package. The bonus requires staying in those positions.');
if(armor.passive!=='Stationary Shroud'&&armor.tags.includes('stealth')&&(primary.tags.includes('precision')||primary.tags.includes('stealth')||state.mission==='stealth'))bonus(6,'Scout × low-contact approach','Reduced detection and radar information reinforce deliberate target selection and avoidance.');
if(grenade.id==='throwable-g11caltrops'&&(primary.tags.includes('precision')||strats.some(x=>x.tags.includes('precision'))))bonus(5,'Caltrops × precision lane control','Stunning and slowing approaching foes buys time for carefully aimed shots. Mind squad movement through the trap field.');"""


def upsert_db(db):
    added = []
    for category, entries in WAR.items():
        if category not in db or not isinstance(db[category], list):
            raise ValueError('Missing original equipment category: ' + category)
        actual = db[category]
        for entry in entries:
            matches = [x for x in actual if x.get('id') == entry['id'] or x.get('name', '').casefold() == entry['name'].casefold()]
            record = copy.deepcopy(entry)
            record['source'] = f"Scope of Authority / official PlayStation Blog ({DATE})"
            if matches:
                actual[actual.index(matches[0])] = record
            else:
                actual.append(record)
                added.append(category + ': ' + record['name'])
        if category == 'armor':
            weight = {'Light': 0, 'Medium': 1, 'Heavy': 2}
            actual.sort(key=lambda x: (weight.get(x.get('weight'), 9), x['name'].casefold()))
        else:
            actual.sort(key=lambda x: x['name'].casefold())
    # IDs must remain unique. This also ensures randomizer and picker indexes aren't overwritten.
    all_entries = [x for arr in db.values() for x in arr]
    ids = [x['id'] for x in all_entries]
    if len(ids) != len(set(ids)):
        raise ValueError('Duplicate equipment IDs found after updating')
    return added


def counts(db):
    return {k: len(v) for k, v in db.items()}


def patch_catalog_content(original):
    m = re.search(r'window\.HD2_DB=(\{.*?\});\s*window\.HD2_CATALOG=', original, re.S)
    if not m:
        raise ValueError('Could not find original window.HD2_DB assignment in data.js or standalone file.')
    db = json.loads(m.group(1))
    additions = upsert_db(db)
    meta, consumed = json.JSONDecoder().raw_decode(original[m.end():].lstrip())
    whitespace = len(original[m.end():]) - len(original[m.end():].lstrip())
    end = m.end() + whitespace + consumed
    if not isinstance(meta, dict) or not original[end:].lstrip().startswith(';'):
        raise ValueError('Could not parse HD2_CATALOG metadata')
    meta['version'] = '6.1'
    meta['audited'] = DATE
    meta['counts'] = counts(db)
    meta['latestWarbond'] = {"name": INFO['warbond'], "released": DATE, "source": SOURCE, "newSelectableEntries": 7}
    notes = meta.setdefault('notes', [])
    note = 'Scope of Authority (Oct 20, 2026): 7 added loadout entries; capability vectors are editorial estimates.'
    if note not in notes:
        notes.append(note)
    urls = meta.setdefault('referenceUrls', [])
    if SOURCE not in urls:
        urls.append(SOURCE)
    json_db = json.dumps(db, ensure_ascii=False, separators=(',', ':'))
    json_meta = json.dumps(meta, ensure_ascii=False, separators=(',', ':'))
    revised = original[:m.start()] + ROOT + json_db + ';\n' + META + json_meta + original[end:]
    return revised, db, meta, additions


def patch_synergy(original):
    if 'Stationary Shroud × precision overwatch' in original:
        return original
    if STEALTH_OLD not in original:
        raise ValueError('Existing synergy engine does not match the expected v5.4–v6.0 code; cannot safely add interaction rules.')
    return original.replace(STEALTH_OLD, STEALTH_NEW, 1)


def catalog_md(db):
    count = counts(db)
    output = [
        '# HELLDIVER // SYNERGY LAB — selectable equipment checklist', '',
        f'Checked **{DATE}**. **{sum(count.values())} selectable entries**. The new Scope of Authority Warbond was verified against [the official PlayStation announcement]({SOURCE}).', '',
        'This excludes cosmetics (helmets, capes, player cards, emotes and titles), mission-only call-ins, and unequippable world equipment. Scores are editorial loadout-planning estimates, not exact game combat statistics.', '',
    ]
    labels = {'armor':'Body armor','primary':'Primary weapons','secondary':'Secondary weapons','throwable':'Throwables','booster':'Boosters','strat':'Stratagems'}
    for key, label in labels.items():
        items = db[key]
        output += [f'## {label} — {len(items)}', '']
        kinds = ['Light', 'Medium', 'Heavy'] if key == 'armor' else sorted(set(x['cat'] for x in items))
        for kind in kinds:
            group = [x for x in items if (x.get('weight') if key=='armor' else x['cat']) == kind]
            output += [f'### {kind} — {len(group)}', '']
            for item in sorted(group, key=lambda x:x['name'].casefold()):
                extra = (' — ' + item['passive']) if key == 'armor' else ''
                output.append(f"- {item['name']}{extra}")
            output.append('')
    output += ['## Scope of Authority release (2026-10-20)', '', 'Confirmed additions:']
    for key, items in WAR.items():
        for item in items:
            output.append(f"- {item['name']} ({labels[key]}; {item.get('weight') or item.get('cat')})")
    output += ['', f'Official source: {SOURCE}', '']
    return '\n'.join(output)


def update_readme(old, db):
    n = counts(db)
    combined = sum(n.values())
    old = old.replace('326 selectable armory entries', f'{combined} selectable armory entries')
    old = old.replace('110 body armor sets (30 light / 50 medium / 30 heavy)', '112 body armor sets (31 light / 51 medium / 30 heavy)')
    old = old.replace('55 primary weapons', '56 primary weapons').replace('25 secondaries', '26 secondaries')
    old = old.replace('23 throwables', '24 throwables').replace('93 normal selectable stratagems', '95 normal selectable stratagems')
    old = old.replace('audited October 10, 2026', 'audited through October 20, 2026')
    old = old.replace('all 326', 'all 333')
    header = '## V6.1 — Scope of Authority Warbond (2026-10-20)'
    if header not in old:
        old += f'''\n\n{header}\n\nNew selectable equipment: SS-33 Mimetic Marshal (Light, Stationary Shroud), SS-15 Focal Point (Medium, Stationary Shroud), R-40 Sightliner (primary marksman rifle), P-44 Mist (secondary machine pistol), G-11 Caltrops (control throwable), AMW-20 Apex (backpack-fed support weapon), and LAS-44 Nova (heat-based support weapon).\n\nThe Stationary Shroud synergy rule correctly applies only while crouched or prone; Caltrops improves precision follow-up opportunities. The Apex is tagged `packRequired: true` and therefore participates in existing separate-backpack conflicts and randomizer constraints. Neither the PDF export engine nor the existing randomizer restrictions were changed.\n\n**Accuracy:** Categories, armor weights, passive and broad behavior are from [Arrowhead's announcement]({SOURCE}) and the community wiki. Capability values are planning estimates (`estimate: true`), not confirmed damage, ammo economy or armor-penetration numbers. Cosmetic rewards are outside the site's loadout scope.\n'''
    return old


def patch_files(source):
    if source.suffix.lower() == '.html':
        raw = source.read_text(encoding='utf-8')
        raw, db, meta, added = patch_catalog_content(raw)
        raw = patch_synergy(raw)
        output = source.with_name(source.stem + '-scope-of-authority.html')
        output.write_text(raw, encoding='utf-8')
        return output, db, added
    if source.suffix.lower() == '.zip':
        with zipfile.ZipFile(source) as zin:
            members = [x for x in zin.infolist() if not x.is_dir()]
            data = {x.filename: zin.read(x.filename) for x in members}
        name_db = next((name for name in data if name.endswith('/data.js') or name == 'data.js'), None)
        if name_db is None:
            raise ValueError('Cannot locate data.js in the input ZIP')
        prefix = name_db[:-len('data.js')]
        original = data[name_db].decode('utf-8')
        patched, db, meta, added = patch_catalog_content(original)
        data[name_db] = patched.encode('utf-8')
        app_name = prefix+'app.js'
        if app_name not in data:
            raise ValueError('Cannot locate app.js in ZIP')
        data[app_name] = patch_synergy(data[app_name].decode('utf-8')).encode('utf-8')
        data[prefix+'CATALOG.md'] = catalog_md(db).encode('utf-8')
        if prefix+'README.md' in data:
            data[prefix+'README.md'] = update_readme(data[prefix+'README.md'].decode('utf-8'), db).encode('utf-8')
        if prefix+'catalog-audit.json' in data:
            data[prefix+'catalog-audit.json'] = (json.dumps(meta, indent=2, ensure_ascii=False)+'\n').encode('utf-8')
        out = source.with_name(source.stem+'-scope-of-authority.zip')
        with zipfile.ZipFile(out,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
            for name, content in data.items():
                z.writestr(name,content)
        return out,db,added
    if source.is_dir():
        dbfile = source/'data.js'
        if not dbfile.exists():
            raise ValueError('The folder must contain data.js at its root')
        patched, db, meta, added = patch_catalog_content(dbfile.read_text(encoding='utf-8'))
        import shutil
        out = source.with_name(source.name + '-scope-of-authority')
        if out.exists():
            raise FileExistsError('Output directory already exists: '+str(out))
        shutil.copytree(source,out)
        (out/'data.js').write_text(patched,encoding='utf-8')
        appfile=out/'app.js'
        appfile.write_text(patch_synergy(appfile.read_text(encoding='utf-8')),encoding='utf-8')
        (out/'CATALOG.md').write_text(catalog_md(db),encoding='utf-8')
        if (out/'README.md').exists():
            (out/'README.md').write_text(update_readme((out/'README.md').read_text(encoding='utf-8'), db),encoding='utf-8')
        if (out/'catalog-audit.json').exists():
            (out/'catalog-audit.json').write_text(json.dumps(meta,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
        return out,db,added
    raise ValueError('Expected an existing site ZIP, site directory, or standalone HTML file')


def main():
    parser=argparse.ArgumentParser(description='Upgrade existing HD2Lab website or standalone HTML with Scope of Authority Warbond equipment')
    parser.add_argument('path', type=Path, help='Path to the original, existing app ZIP / folder / standalone HTML')
    args=parser.parse_args()
    if not args.path.exists():
        parser.error('Input not found: '+str(args.path))
    output,db,added=patch_files(args.path)
    total=sum(len(arr) for arr in db.values())
    print('Created',output)
    print('Selectable equipment:',total,'(added',len(added),')')
    print('Category counts:',counts(db))
    print('PDF export code retained; no existing equipment was removed.')
    if total < 333:
        print('NOTE: Input catalog was smaller than the expected v6.0 baseline; totals may differ.')

if __name__=='__main__':main()
