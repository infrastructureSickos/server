// =============================================================================
// IMMERSIVE ENGINEERING → BOTANIA GATE
// =============================================================================
// Gate: IE Steel Ingot must be obtained before Manasteel (and therefore all
// of Botania's progression) becomes accessible.
//
// Design: Manasteel is Botania's first crafted metal and prerequisite for
// nearly every Botania item. Normally it is made in the Pure Daisy ritual
// (place Iron Ingot on grass next to Pure Daisy → converts to Manasteel Ingot).
// We override the Pure Daisy transformation recipe to require IE Steel Ingot
// as the input instead of Iron Ingot.
//
// Progression flow:
//   Iron → IE Blast Furnace → IE Steel → Pure Daisy → Mana Steel → Botania
//
// KubeJS recipe type for Pure Daisy: 'botania:pure_daisy'
//   Input: the block placed on grass adjacent to the Pure Daisy
//   Output: the block it transforms into
//
// To add more gated Botania recipes:
//   1. Find the recipe ID
//   2. event.remove({ id: 'botania:recipe_id' })
//   3. Add replacement with IE Steel as an ingredient
// =============================================================================

ServerEvents.recipes(event => {

    // -------------------------------------------------------------------------
    // Manasteel Pure Daisy transformation
    //
    // Vanilla: Iron Block on grass → Mana Steel Block
    //          (the ingot equivalent is obtained via crafting 9x manasteel_ingot
    //           from the mana steel block, or directly from ingots around a
    //           Pure Daisy — verify exact recipe ID in-game)
    //
    // Override: require IE Steel Block (or ingots) instead of Iron Block
    //
    // TODO: Verify exact recipe IDs. Common candidates:
    //   - botania:pure_daisy/manasteel      (block transformation)
    //   - botania:pure_daisy/manasteel_slab (slab variant, if any)
    // -------------------------------------------------------------------------

    // Remove vanilla Pure Daisy iron→manasteel conversion
    // event.remove({ id: 'botania:pure_daisy/manasteel' })

    // Replace with IE Steel Block → Mana Steel Block via Pure Daisy
    // event.custom({
    //     type: 'botania:pure_daisy',
    //     input: { block: 'immersiveengineering:storage_steel' },   // IE Steel Block
    //     output: { block: 'botania:manasteel_block' },
    //     time: 200   // ticks — same as vanilla (200 = 10 seconds)
    // })

    // -------------------------------------------------------------------------
    // STUB: Manasteel ingot direct crafting (if Botania provides a crafting
    // table shortcut for ingots rather than Pure Daisy) — remove if found
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // STUB: Terrasteel recipe — already requires Manasteel so transitively
    // gated. No changes needed unless a shortcut exists.
    // -------------------------------------------------------------------------

})
