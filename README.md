# HELLDIVER // SYNERGY LAB

A browser-based, unofficial **Helldivers 2** loadout planner. Players pick gear manually and then evaluate tactical role coverage and selected synergy interactions for a particular enemy faction and mission.

## What the app does

- Lets users manually choose **body armor (with its fixed passive), a primary weapon, a secondary weapon, a throwable, a booster, and four stratagems**.
- Includes **326 selectable armory entries**, audited October 10, 2026: **110 body armor sets (30 light / 50 medium / 30 heavy)**, **55 primary weapons**, **25 secondaries**, **23 throwables**, **20 boosters**, and **93 normal selectable stratagems**.
- Includes limited-time, collaboration, campaign, and promotional equipment where it can occupy a regular loadout slot. Ownership is not required for browsing or evaluating a theoretical build.
- For armor, provides **Light / Medium / Heavy** filters and passive filters. All other equipment is searchable by name, class, or keyword.
- Offers Terminid, Automaton, Illuminate, and mixed-front scenarios, mission roles, solo/team modes, and 1–10 difficulty.
- Identifies six role-coverage dimensions: anti-heavy, swarm control, medium-target tools, objective destruction, survivability, and sustain.
- Recognizes tactical interactions, including Engineering Kit + throwables, Med-Kit + Experimental Infusion, stuns + strikes, and support-weapon + backpack conflicts.
- Prevents duplicate stratagems, multiple selected support weapons and incompatible backpacks **as deliberate build-design constraints**. The game itself can allow some non-conflicting carry-ins; these constraints are planner policy.
- Never auto-fills gear or evaluates automatically; users select slots and click **Evaluate Synergy**. Three optional sample builds can be loaded by clicking their buttons.
- Lets players copy a loadout and its analysis as text.

## Catalog scope and accuracy

The catalog is built from named **player-loadout equipment** in community-maintained indexes checked **October 10, 2026**. It excludes *cosmetic helmets and capes*, *mission-only stratagems* (such as Reinforce and Hellbomb objective drops), April Fools/community joke items, and world-spawn-only objects that cannot be equipped in the four normal stratagem slots. The **IX-Voidwalker is helmet-only** and is therefore not shown in the body-armor picker. The **KDM-500 Outrider** body armor is included. We corrected the **CE-67 Titan** and **CE-74 Breaker** classifications to Light, and include the **BFM-77 Reformer** as Medium.

The **item names, armor weight classes, and armor passives** were checked against the referenced catalog and individual entries where possible. **Coverage values (`c`) are editorial 0–5 heuristics, not in-game damage, actual penetration values, cooldowns, or patch-verified DPS.** Older curated items retain hand-authored roles, while added entries have conservative class-based planning estimates marked with `estimate: true`. A higher synergy score is not proof of a stronger or optimal build. Item role tags and descriptions may need tuning after future game patches.

This is an **as-of-date catalog**, not a live-sync service; new releases after the audit will require updates. Equipment references are community-maintained and may be delayed or inconsistent immediately after a patch. If a specific item is missing or incorrectly described, the per-category source links below are useful for checking its current status.

## Project files

- `index.html`: static page and accessible loadout controls.
- `styles.css`: command-terminal theme, desktop/mobile layout, responsive equipment modal.
- `data.js`: armor/weapon/stratagem catalog, item capability weights, tags, and `HD2_CATALOG` audit metadata.
- `catalog-audit.json`: audit date, item counts and reference URLs.
- `CATALOG.md`: human-readable item-by-item checklist of all 326 entries, sorted by slot type and armor weight or equipment category.
- `app.js`: manual picker, faction/difficulty context, loadout templates, conflict rules, synergy evaluator, and report copying.

## Reference catalogs

- [Armor (body armor and passives)](https://helldivers.wiki.gg/wiki/Armor)
- [Primary weapons](https://helldivers.wiki.gg/wiki/Category:Primary_Weapons)
- [Secondary weapons](https://helldivers.wiki.gg/wiki/Category:Secondary_Weapons)
- [Throwables](https://helldivers.wiki.gg/wiki/Category:Throwables)
- [Boosters](https://helldivers.wiki.gg/wiki/Boosters)
- [Stratagems](https://helldivers.wiki.gg/wiki/Stratagems)

## Disclaimer

Unofficial community planning tool. Not affiliated with or endorsed by Arrowhead Game Studios or Sony Interactive Entertainment. Game trademarks and item names belong to their respective owners.
