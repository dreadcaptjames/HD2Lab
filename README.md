# HELL​​DIVER // SYNERGY LAB — Scope of Authority equipment update

The newest *Scope of Authority* Premium Warbond (October 20, 2026) adds **seven loadout-selectable entries**: two armors, one primary weapon, one secondary weapon, one throwable, and two support-weapon stratagems. The capes, cards, emote, and title are not selectable in this app and are not included.

This kit updates your **existing** v6.0 site ZIP, site folder, or standalone HTML **without replacing the visual design, original 101st logo, PDF exporter, or randomizer rules**. The source website needs to be supplied; this patch is not itself a replacement website.

## Apply to the full website ZIP

Place your previous `helldivers-synergy-lab-v6.0-site.zip` next to `apply_warbond_update.py` and `warbond_items.json`. Run:

```bash
python apply_warbond_update.py helldivers-synergy-lab-v6.0-site.zip
```

It generates a new `helldivers-synergy-lab-v6.0-site-scope-of-authority.zip` containing the updated source website. The previous ZIP stays untouched.

For a standalone HTML file, supply that file instead; the script outputs a new HTML with the same additions. For a site folder, supply its path instead.

## Included functionality

- Item categories stay accurate: **LAS-44 Nova and AMW-20 Apex are support stratagems**, not primary weapons; **G-11 Caltrops is a throwable**.
- `Stationary Shroud` is attached to the correct Light and Medium armor sets and treated as a positional benefit, not ordinary Scout radar.
- `AMW-20 Apex` requires its ammunition backpack, so conflicting extra backpacks are blocked in standard builds and recognized in Chaos.
- `G-11 Caltrops` provides slow/stun trap utility with a precision follow-up synergy.
- Existing loadout filters, nine-slot randomizer, distinct stratagem restrictions, vehicle-class limits and PDF exporter remain intact.
- Totals update from 326 to **333** entries for a matching v6.0 baseline.

## Source and data fidelity

Source: [Arrowhead / PlayStation Blog — Scope of Authority](https://blog.playstation.com/2026/10/13/helldivers-2-scope-of-authority-premium-warbond-launches-oct-20/), with slot/type support from the Helldivers Wiki.

**Important:** `c` capability values are game-planning estimates, not verified damage, cooldowns or penetration statistics. No account connection or real-time game data is implied.
