/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_RECENT_RECIPES = 'recentRecipes/SET_RECENT_RECIPES';
const UPDATE_RECENT_RECIPES = 'recentRecipes/UPDATE_RECENT_RECIPES';


/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setRecentRecipesAction = (recipes) => {
    return {
        type: SET_RECENT_RECIPES,
        recipes
    };
};

const updateRecentRecipesAction = (recipe) => {
    return {
        type: UPDATE_RECENT_RECIPES,
        recipe
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setRecentRecipes = (userId) => async (dispatch) => {
    console.log(userId, 'userId in the thunk')
    let res = await fetch(`/api/users/${userId}/recentRecipes`);
    res = await res.json();

    console.log(res, 'res from the thunk')
    const recipes = res.recentRecipes;

    console.log(recipes, 'recipes from the thunk')
    dispatch(setRecentRecipesAction(recipes));
    console.log('after dispatch')
};

export const updateRecentRecipes = (recipe) => (dispatch) => {
    dispatch(updateRecentRecipesAction(recipe));
};

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = []

function recentRecipesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_RECENT_RECIPES:
            console.log(action.recipes, 'recipes inside of the reducer')
            newState = action.recipes;
            return newState;
        case UPDATE_RECENT_RECIPES:
            newState = [...state];
            newState.pop();
            newState.unshift(action.recipe);
            return newState;
        default:
            return state;
    }
}

export default recentRecipesReducer;