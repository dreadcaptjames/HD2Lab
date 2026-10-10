# HELLDIVER // SYNERGY LAB

An unofficial, browser-based tactical loadout planner inspired by **Helldivers 2**. It is designed to answer the question: *Does this equipment work well together for my mission?* It is a planning aid, not a real-time game companion or an authoritative weapon-statistics database.

## What it does

- Lets players manually choose an enemy front (Terminids, Automatons, Illuminate, or all fronts), mission type, squad/solo mode, and difficulty.
- Provides nine selectable loadout slots: **armor with its attached passive, primary, secondary, throwable, booster, and four stratagems**.
- Includes **203 curated equipment entries**: 22 armor sets, 39 primary weapons, 22 secondaries, 22 throwables, 20 boosters, and 78 stratagems. The catalog is intentionally wider than the original prototype, but is **not an exhaustive or guaranteed patch-current database**.
- Uses a role-based heuristic to estimate anti-heavy coverage, swarm control, medium-target coverage, objective destruction, survivability, and sustain.
- Identifies particular tactical combinations, such as stuns plus precision attacks, Med-Kit plus Experimental Infusion, engineering throwables, and defensive backpack support.
- Warns about weak roles, overreliance on large area barrages, and friendly-fire concerns.
- Applies **deliberate planner restrictions** on duplicate stratagems, multiple support-weapon stratagems, and competing backpack selections. Some restricted combinations might be technically equipable in-game; these are intentional planning rules.
- Includes three **optional** faction-oriented sample loadouts. Builds are **never evaluated automatically**: the user must select **Evaluate Synergy**.
- Produces a copyable text report of the loadout and any evaluated insights.
- Uses a responsive command-terminal interface, with hand-drawn SVG insignia and equipment icons. No game artwork or third-party UI library is required.

## How analysis works

Each equipment item has six **relative role weights (0–5)** defined in `data.js`. These are editorial heuristic ratings, **not damage numbers, exact penetration, cooldown timings, win probabilities, or datamined values**. The evaluator in `app.js` aggregates coverage, adjusts its mission/faction weighting, applies detected positive equipment interactions, and deducts role-gap or risk penalties. It explains the resulting assessment in plain language.

The same equipment can have different tactical value depending on player preferences, game updates, team composition, and mission modifiers. A high score is not a promise of effectiveness or of being the optimal build.

## Project files

- `index.html` — page structure, controls and accessibility labels
- `styles.css` — responsive visual theme and custom terminal styling
- `data.js` — curated items, tags, roles, armor/passive pairings and relative coverage values
- `app.js` — equipment picker, templates, constraints, scoring, report copy and custom SVG iconography

There is also a single-file HTML version available separately, with styles and scripts embedded for convenience.

## References

For checking terminology and changes, consult the community-maintained [Helldivers Wiki](https://helldivers.wiki.gg/wiki/Helldivers_2), including its pages on [weapons](https://helldivers.wiki.gg/wiki/Weapons), [armor passives](https://helldivers.wiki.gg/wiki/Armor_Passive), [stratagems](https://helldivers.wiki.gg/wiki/All_Stratagems), and [boosters](https://helldivers.wiki.gg/wiki/Boosters).

**Disclaimer:** This is an unofficial fan project. Not endorsed by or affiliated with Arrowhead Game Studios, Sony Interactive Entertainment, or the Helldivers franchise. Game terms are used descriptively.
