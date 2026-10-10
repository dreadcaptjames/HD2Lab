# HELLDIVER // SYNERGY LAB

A browser-based, unofficial **Helldivers 2** loadout planner. Players can assemble a loadout manually or generate one with a configurable randomizer, then evaluate tactical role coverage and synergy for an enemy faction and mission.

## What the app does

- Lets users manually choose **body armor (with its fixed passive), a primary weapon, a secondary weapon, a throwable, a booster, and four stratagems**.
- Includes **326 selectable armory entries**, audited October 10, 2026: **110 body armor sets (30 light / 50 medium / 30 heavy)**, **55 primary weapons**, **25 secondaries**, **23 throwables**, **20 boosters**, and **93 normal selectable stratagems**.
- Includes limited-time, collaboration, campaign, and promotional equipment where it can occupy a regular loadout slot. Ownership is not required for browsing or evaluating a theoretical build.
- For armor, provides **Light / Medium / Heavy** filters and passive filters. All other equipment is searchable by name, class, or keyword.
- Offers Terminid, Automaton, Illuminate, and mixed-front scenarios, mission roles, solo/team modes, and 1–10 difficulty.
- Identifies six role-coverage dimensions: anti-heavy, swarm control, medium-target tools, objective destruction, survivability, and sustain.
- Recognizes tactical interactions, including Engineering Kit + throwables, Med-Kit + Experimental Infusion, stuns + strikes, and support-weapon + backpack conflicts.
- Always prevents duplicate stratagems **and a second vehicle of the same class** in every mode, including Complete Chaos. The vehicle classes are **Mech (4 items), FRV (3 items), and Tank (2 items)**; one of each may coexist in a loadout. The manual builder and tactical randomizers also prevent multiple support weapons and incompatible backpacks. Complete Chaos can bypass only those support/backpack planner guardrails. The game itself can allow some non-conflicting carry-ins; these constraints are planner policy.
- Never generates anything on launch or before the user clicks **Generate Random Loadout**. Manual selection and three click-to-load sample builds are still supported.
- Includes **Controlled Chaos**, a rule-driven loadout randomizer with Complete Chaos, Tactical Blend, and Mission-Tuned rolls; armor-weight and passive filters; optional category restrictions for primary weapons, sidearms, throwables, boosters, and stratagems; support-weapon and backpack requirements/exclusions; anti-heavy and demolition coverage requirements; and per-slot locks for partial rerolls.
- Supports optional **automatic synergy evaluation after a random roll**. Otherwise, scoring still happens only when the user clicks **Evaluate Synergy**. Randomized and manual builds share the *same* analysis and report-copying features.
- Explains contradictory restrictions or unreachable rolls and preserves the current loadout if no legal build can be generated.
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
- `app.js`: manual picker, faction/difficulty context, loadout templates, configurable loadout randomizer, shared conflict rules, synergy evaluator, and report copying.

## Reference catalogs

- [Armor (body armor and passives)](https://helldivers.wiki.gg/wiki/Armor)
- [Primary weapons](https://helldivers.wiki.gg/wiki/Category:Primary_Weapons)
- [Secondary weapons](https://helldivers.wiki.gg/wiki/Category:Secondary_Weapons)
- [Throwables](https://helldivers.wiki.gg/wiki/Category:Throwables)
- [Boosters](https://helldivers.wiki.gg/wiki/Boosters)
- [Stratagems](https://helldivers.wiki.gg/wiki/Stratagems)

## Disclaimer

Unofficial community planning tool. Not affiliated with or endorsed by Arrowhead Game Studios or Sony Interactive Entertainment. Game trademarks and item names belong to their respective owners.

## V3.1 picker usability fixes

- The equipment picker has a dedicated scrollable results area. Search, category filters, and result counts remain visible.
- The results list returns to the top whenever a picker opens, its category changes, or its search query changes.
- All seven stratagem filters remain fully visible even on narrow phones. Larger filter groups (such as armor passives) have an independent scroll area, with its position preserved when selecting a chip.
- Search receives focus without making the results list or the page jump.
- All 326 catalog entries, loadout rules, and synergy analysis logic are unchanged.

## V4 randomizer behavior

The randomizer uses the full curated equipment catalog and the same nine-slot build state as manual selection. **Complete Chaos** now chooses any catalog equipment without tactical optimization; it also offers sandbox switches that override support/backpack compatibility while never duplicating a stratagem or vehicle class. **Tactical Blend** compares several legal rolls and favors varied role coverage and familiar equipment interactions. **Mission-Tuned** weighs the current enemy front and mission type more heavily. Those roll-selection heuristics are not an additional score and should not be confused with the actual Field Analysis.

The optional weapon/throwable/booster category pools are collapsed initially to keep the main rule panel approachable. Every equipment category is allowed unless the player changes it. Each equipment lock keeps that currently selected piece on reroll; locks on empty slots are disabled. For mandatory support/backpack rules, a separate backpack cannot coexist with a support weapon that occupies that slot with its own ammo pack. Rule constraints are enforced before mutating a build. Reset Build clears both the loadout and the randomizer configuration; Reset Rules clears rules and locks without wiping the equipment.

The randomizer does not filter by a player's owned Warbonds or equipment unlocks, and it is not connected to a live player account.

## V5: UNRESTRICTED Complete Chaos

Select **COMPLETE CHAOS — anything in the armory** in the Randomizer. By default, the following Chaos-only options are on:

- **Break Loadout Rules:** allows multiple support weapon call-ins, multiple separate backpacks, and combinations with ammo-backpack-fed weapons. These deliberately bypass the planner’s tactical guardrails (not necessarily all actual in-game loadout rules).
- **Cursed Combinations:** alternates fully unbiased draws with occasional bizarre patterns: category takeover, support weapon invasion, backpack pileup, and a vehicle parade that can combine one mech, one FRV, and one tank. Stratagem choices are always distinct and the same vehicle class never appears twice. Every allowed catalog item still has a nonzero chance of appearing via the Wild Draw pattern.

Entering Complete Chaos automatically turns off the default **Require anti-heavy coverage** filter unless the player has explicitly adjusted that filter. The player can re-enable anti-heavy and any other restrictions: armor weight, passive, item category pools, required/excluded support weapons or backpacks, objective demolition, and slot locks are always respected. **Turning off Break Loadout Rules and Cursed Combinations yields fully random, planner-compatible equipment with no tactical bias.** Tactical Blend and Mission-Tuned stay unchanged and continue to enforce the guardrails and tactical requirements.

Every randomized build still fills the normal nine equipment slots and feeds into the **same** six-role Synergy Analysis. The evaluator flags unconventional support/backpack combinations at the top of the report. Duplicate stratagems and duplicate vehicle classes are not offered or generated in any mode. Analyzing a bizarre roll is not a claim that all listed items can be carried together in the game.

No build is generated automatically at launch; opening the app still starts from empty slots. Reset Rules restores the tactical default while leaving the existing build untouched.

## V5.1: Unique stratagems in every roll

Removed the **Clone the Nonsense** control and the **COPY MACHINE** cursed pattern. Even Complete Chaos now picks four different stratagem IDs, while retaining support-weapon overloads, backpack pileups, and category-specific themed rolls. Locked duplicate stratagems fail validation with a clear message instead of silently rolling an invalid build. The manual editor already disallowed duplicate selections and remains unchanged.

## V5.2: Vehicle class limits in all modes

Each loadout may select **at most one mech**, **one FRV (wheeled vehicle)**, and **one tank**. This is a limit per vehicle family, not a limit of one vehicle total: a mech + FRV, FRV + tank, mech + tank, and mech + FRV + tank combination are all permitted as far as the vehicle-class restriction is concerned. Four Vehicle-category stratagems cannot be selected together, because the catalog has only three unique vehicle families.

The equipment catalog now explicitly labels all nine Vehicle-category entries with `vehicleClass: "mech" | "frv" | "tank"`. Manual picking, ordinary randomization, **Complete Chaos** with unsafe overrides, Cursed Combinations / Vehicle Parade, and rerolls with locked stratagems enforce this non-negotiable limit. A preexisting invalid locked combination produces a clear error instead of modifying the loadout. Other Chaos allowances for multiple distinct support weapons and backpacks remain.
