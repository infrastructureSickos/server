// =============================================================================
// MAGMACOBBLE MOD — KUBEJS RECIPE ADDITIONS
// =============================================================================
// The MagmaCobble custom mod replaces vanilla water+lava → cobblestone/obsidian
// interactions with magma block production. As a result, Obsidian is no longer
// naturally obtainable. These KubeJS recipes restore access to both Obsidian
// and Magma Block items via Create's Mixer.
//
// See docs/custom-mods/magma-cobble.md for full mod spec.
//
// Status: Waiting on MagmaCobble mod completion before these go live.
//         The recipes are stubbed here ready to activate.
//
// Activate by: removing the TODO comments and ensuring MagmaCobble is in the
// modpack's mod list (3rd-party-mods/ or custom-mods/ build output).
// =============================================================================

ServerEvents.recipes(event => {

    // -------------------------------------------------------------------------
    // Obsidian — Create Mixing recipe (superheated)
    // Replaces the vanilla water + lava bucket crafting path (now unavailable)
    //
    // Inputs: Lava Bucket + Water Bucket, superheated
    // Output: Obsidian
    //
    // Create Mixer fluid inputs use 'FluidIngredient' — amounts in mB.
    // 1 bucket = 1000 mB.
    // -------------------------------------------------------------------------

    // TODO: Activate once MagmaCobble mod is added to the pack
    // event.custom({
    //     type: 'create:mixing',
    //     ingredients: [
    //         { fluidTag: 'minecraft:lava', amount: 1000 },
    //         { fluidTag: 'minecraft:water', amount: 1000 }
    //     ],
    //     results: [
    //         { item: 'minecraft:obsidian', count: 1 }
    //     ],
    //     heatRequirement: 'superheated'
    // })

    // -------------------------------------------------------------------------
    // Magma Block — Create Mixing recipe
    // Allows crafting Magma Block items (normally only silk-touch-obtainable
    // from magma blocks placed by the MagmaCobble interaction).
    //
    // Recipe TBD — needs design input. Placeholder uses lava + stone.
    // -------------------------------------------------------------------------

    // TODO: Finalize recipe inputs, then activate once MagmaCobble is in pack
    // event.custom({
    //     type: 'create:mixing',
    //     ingredients: [
    //         { item: 'minecraft:stone', count: 4 },
    //         { fluidTag: 'minecraft:lava', amount: 500 }
    //     ],
    //     results: [
    //         { item: 'minecraft:magma_block', count: 1 }
    //     ],
    //     heatRequirement: 'heated'
    // })

})
