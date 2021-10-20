/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */
const SET_ALL_RECIPES = 'allRecipes/SET_ALL_RECIPES';
const UPDATE_ALL_RECIPES = 'allRecipes/UPDATE_ALL_RECIPES';
const DELETE_ALL_RECIPES = 'allRecipes/DELETE_ALL_RECIPES';


/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */
const setAllRecipesAction = (recipes) => {
    return {
        type: SET_ALL_RECIPES,
        recipes
    };
};

const updateAllRecipesAction = (recipe) => {
    return {
        type: UPDATE_ALL_RECIPES,
        recipe
    };
};

const deleteAllRecipesAction = (recipeId) => {
    return {
        type: DELETE_ALL_RECIPES,
        recipeId
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setAllRecipes = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/allRecipes/`);
    const resJson = await res.json();
    const recipes = resJson.allRecipes;
    dispatch(setAllRecipesAction(recipes));
};

export const updateAllRecipes = (recipe) => (dispatch) => {
    dispatch(updateAllRecipesAction(recipe));
};

export const deleteAllRecipes = (recipeId) => (dispatch) => {
    dispatch(deleteAllRecipesAction(recipeId));
}; 

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function allRecipesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ALL_RECIPES:
            newState = action.recipes;
            return newState;
        case UPDATE_ALL_RECIPES:
            newState = {...state};
            newState[action.recipe.recipeId] = action.recipe;
            return newState;
        case DELETE_ALL_RECIPES:
            newState = {...state};
            delete newState[action.recipeId];
            return newState;
        default:
            return state;
    }
}

export default allRecipesReducer;