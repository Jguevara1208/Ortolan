const reduxState = {
    session: { id: 1, name: 'Jordan Guevara', restaurant: 'Nico', admin: true },
    recentRecipes: [
        {id: 1, img: 'some-url', created_at: 'Oct, 20, 2021'},
        {id: 2, img: 'some-url', created_at: 'Oct, 20, 2021'},
    ],

    projects: [
        {id: 1, title: 'Deep Clean Walk In', description: 'make it really clean', assigned: [{id: '1', name: 'James Lee'}]},
        {id: 2, title: 'Deep Clean Freezer', description: 'make it really clean', assigned: [{id: '2', name: 'Ethan Hodge'}]}
    ],

    recipesTree: {
        season: {
            winter: [ {recipeId: 1, title: 'Lobster, Sorrel, Curry'}, ],
            spring: [ {recipeId: 1, title: 'Lobster, Sorrel, Curry'}, ],
            summer: [ {recipeId: 1, title: 'Lobster, Sorrel, Curry'}, ],
            autumn: [ {recipeId: 1, title: 'Lobster, Sorrel, Curry'}, ],
        },

        tag: {
            squab: [{ recipeId: 1, title: 'Lobster, Sorrel, Curry' },],
            turbot: [{ recipeId: 1, title: 'Lobster, Sorrel, Curry' },],
            duck: [{ recipeId: 1, title: 'Lobster, Sorrel, Curry' },],
        }
    },

    allRecipes: [
        {id: 1, title: 'Lobster, Sorrel, Curry'},
    ],

    units: {
        'g' : 1,
        'L' : 2
    },

    tags: {
        'Duck' : 1,
        'Squab' : 2
    },

    orderCategories: {
        'Produce' : 1,
        'Dairy' : 2,
        'Specialty Ingredient': 3
    },

    ingredients: {
        'Turnip': {
            id: 1, category: {name: 'Produce', id: 1}
        }, 
    },

    currentRecipe: {
        title: 'Lobster, Sorrel, Curry',
        img: 'some-url',
        tags: ['Lemongrass', 'Crab'],
        season: 'Autumn',
        year: '2020',
        components: { 1: '1ea crab terrine', 2: '64ea Mandarin Spheres',},
        subRecipes: { 
            1: { 
                title: 'Lemongrass Cream Base', 
                ingredients: { 
                    1: { qty: '1200', unit: 'g', ingredient: 'Cream'},
                    2: { qty: '400', unit: 'g', ingredient: 'Lemongrass', description: 'sliced thinly'},
                    3: { qty: '90', unit: 'g', ingredient: 'Leek'},
                },
                details: 'Bring everything to a boil, than simmer for 8 minutes, allow it to infuse for 10 more minutes off of the heat. Strain through chinois'
            },
        },
    },
}