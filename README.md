# InfrastructureSickos Server

[![Deploy Server](https://github.com/infrastructureSickos/server/actions/workflows/deploy.yml/badge.svg)](https://github.com/infrastructureSickos/server/actions/workflows/deploy.yml)

# KubeJS Scripts

This directory contains KubeJS scripts for InfrastructureSickos recipe tweaks and progression gating.

## Directory Structure

- `startup_scripts/` — Run at game startup (item/block/fluid registration). Rarely needed for this pack.
- `server_scripts/` — Run on server start (recipe modifications, loot tables, tags). **This is where progression gates live.**
- `client_scripts/` — Run on client start (JEI display, tooltips, resource pack tweaks).

## Progression Gates

All progression gate scripts live in `server_scripts/progression/`. Each gate file:
1. Removes vanilla/default recipes for locked items
2. Adds new recipes requiring the gate ingredient

### Active Gates

| File | Gate | Locks |
|------|------|-------|
| `create_to_ie_gate.js` | Create Brass → IE | Early IE items require Brass |
| `ie_to_botania_gate.js` | IE Steel → Botania | Manasteel recipe requires IE Steel |
| `botania_endgame_gate.js` | Botania → Endgame | Stub — TBD |
| `magmacobble_recipes.js` | MagmaCobble mod | Obsidian + Magma Block Create recipes |

## How to Add a New Progression Gate

1. Create a new file in `server_scripts/progression/your_gate_name.js`
2. Use `ServerEvents.recipes(event => { ... })` as the entry point
3. Remove the original recipe: `event.remove({ id: 'modid:recipe_id' })` or `event.remove({ output: 'modid:item' })`
4. Add the replacement recipe with the gate ingredient included
5. Test in a local dev server with `/reload` or a server restart

## Finding Recipe IDs

In-game: Use the KubeJS recipe viewer (press F3+H for advanced tooltips, or use a recipe viewer mod like JEI and click the recipe to see its ID).

From source: Recipe IDs match the data pack path, e.g. `data/botania/recipes/mana_infusion/manasteel.json` → `botania:mana_infusion/manasteel`.
