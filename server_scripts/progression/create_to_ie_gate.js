// =============================================================================
// CREATE → IMMERSIVE ENGINEERING GATE
// =============================================================================
// Gate: Create's Brass Ingot must be obtained before IE recipes unlock.
//
// Design: Lock IE's earliest crafting prerequisite (the Engineer's Hammer)
// behind a Brass Ingot requirement. Since every IE multiblock and tool requires
// the Engineer's Hammer to form, this single recipe change gates the entire
// IE tech tree.
//
// How to identify which IE recipes to gate:
//   - IE Engineer's Hammer: immersiveengineering:hammer
//   - Run a local dev server, craft the Engineer's Hammer in JEI, note the
//     recipe ID (should be immersiveengineering:crafting/hammer or similar)
//   - Replace that recipe below
//
// To add more gated IE recipes:
//   1. Find the recipe ID (see kubejs/README.md for tips)
//   2. Call event.remove({ id: 'immersiveengineering:your_recipe_id' })
//   3. Add a replacement shaped/shapeless recipe that includes create:brass_ingot
// =============================================================================

ServerEvents.recipes(event => {

    // -------------------------------------------------------------------------
    // Engineer's Hammer — the gating recipe
    // Vanilla IE recipe: 2x Iron Ingot + 1x Stick (shapeless or shaped — verify in-game)
    //
    // TODO: Verify the exact vanilla recipe ID and shape, then uncomment below.
    // -------------------------------------------------------------------------

    // Remove the default Engineer's Hammer recipe
    // event.remove({ id: 'immersiveengineering:crafting/hammer' })

    // Replace it with a recipe that requires one Brass Ingot
    // event.shaped(
    //     Item.of('immersiveengineering:hammer'),
    //     [
    //         ' BI',
    //         ' SI',
    //         'S  '
    //     ],
    //     {
    //         B: 'create:brass_ingot',   // <-- the progression gate ingredient
    //         I: 'minecraft:iron_ingot',
    //         S: 'minecraft:stick'
    //     }
    // )

    // -------------------------------------------------------------------------
    // STUB: Additional IE early-game recipes that may need gating
    // Candidates (verify recipe IDs in-game):
    //   - immersiveengineering:crafting/wirecoil_copper
    //   - immersiveengineering:crafting/hemp_rope
    //   - Any IE component that unlocks before the hammer
    // -------------------------------------------------------------------------

})
