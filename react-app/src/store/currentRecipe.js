/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_CURRENT_RECIPE = 'currentRecipe/SET_CURRENT_RECIPE';


/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setCurrentRecipeAction = (recipe) => {
    return {
        type: SET_CURRENT_RECIPE,
        recipe
    };
};


/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setCurrentRecipe = (recipeId) => async (dispatch) => {
    const res = await fetch(`/api/recipes/${recipeId}`)
    const recipe = await res.json();
    dispatch(setCurrentRecipeAction(recipe));
};

export const createCurrentRecipe = (recipe) => async (dispatch) => {
    const res = await fetch(`/api/recipes/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(recipe)
    });
    const newRecipe = await res.json();
    dispatch(setCurrentRecipeAction(newRecipe));
}

export const deleteCurrentRecipe = (recipeId) => async () => {
    const res = await fetch(`/api/recipes/${recipeId}/`, {
        method: "DELETE"
    });
};

export const updateCurrentRecipe = (recipe) => async () => {
    await deleteCurrentRecipe(recipe.id)
    await createCurrentRecipe(recipe)
};


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function currentRecipeReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_CURRENT_RECIPE:
            newState = action.recipe;
            return newState;
        default:
            return state;
    }
}

export default currentRecipeReducer