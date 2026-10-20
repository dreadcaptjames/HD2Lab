# HD2Lab — Scope of Authority (October 20, 2026)

This is a **drop-in content update**, not a standalone replacement website. It solves the problem with the previous update kit: that kit did not modify your running website, so the new gear wasn't visible.

## Add to your existing HD2Lab website

1. Put `warbond-scope-of-authority.js` alongside your existing `index.html`, `data.js`, and `app.js`.
2. In `index.html`, find the existing two lines at the bottom:

   ```html
   <script src="./data.js" defer></script>
   <script src="./app.js" defer></script>
   ```

   Replace them with:

   ```html
   <script src="./data.js" defer></script>
   <script src="./warbond-scope-of-authority.js" defer></script>
   <script src="./app.js" defer></script>
   ```

3. Upload both files (`warbond-scope-of-authority.js` and updated `index.html`) to your GitHub repository and hard-refresh the GitHub Pages app.

### How to double-check in the website

- A **SCOPE OF AUTHORITY / 7 new loadout items** panel appears below the main header.
- The equipment total changes from **326 to 333** (unless there were other equipment additions).
- Open any matching equipment picker and search `scope` to show new Warbond gear in that category. The `scopeOfAuthority` search tag has been added to all seven entries.
- Verify the following names in their actual menus:

| Picker | New items |
| --- | --- |
| Light armor | SS-33 Mimetic Marshal |
| Medium armor | SS-15 Focal Point |
| Primary weapons | R-40 Sightliner |
| Secondary weapons | P-44 Mist |
| Throwables | G-11 Caltrops |
| Support-weapon stratagems | AMW-20 Apex, LAS-44 Nova |

The randomizer uses the same database as the manual builder, so these items are automatically available in random rolls when their categories are allowed. The Apex is marked as a backpack-required weapon and obeys the existing restrictions.

The existing synergy engine uses their conservative capability estimates and tags. The new Stationary Shroud armor currently uses the existing stealth/precision interaction; the app's generic insight label may still say “Scout” until a subsequent `app.js` copy update. Exact in-game weapon damage is **not** claimed.

### Scope

The player-loadout catalog covers body armor and equipment. The Warbond's capes, cosmetics, emote, and player title are intentionally excluded because they cannot be equipped in those slots. Your logo, PDF export and randomizer are untouched.

**Official source:** https://blog.playstation.com/2026/10/13/helldivers-2-scope-of-authority-premium-warbond-launches-oct-20/
