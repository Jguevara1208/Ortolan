/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_RECIPE_TREE = 'recipesTree/SET_RECIPE_TREE';
const DELETE_RECIPE_TREE_BY_SEASON = 'recipesTree/DELETE_RECIPE_TREE_BY_SEASON';
const DELETE_RECIPE_TREE_BY_TAG = 'recipesTree/DELETE_RECIPE_TREE_BY_TAGS';
const UPDATE_RECIPE_TREE_BY_SEASON = 'recipesTree/UPDATE_RECIPE_TREE_BY_SEASON';
const UPDATE_RECIPE_TREE_BY_TAG = 'recipesTree/UPDATE_RECIPE_TREE_BY_TAGS';
const ADD_RECIPE_TREE_BY_SEASON ='recipesTree/ADD_RECIPE_TREE_BY_SEASON';
const ADD_RECIPE_TREE_BY_TAG ='recipesTree/ADD_RECIPE_TREE_BY_TAG';

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setRecipeTreeAction = (tree) => {
    return {
        type: SET_RECIPE_TREE,
        tree
    };
};

const deleteRecipeTreeBySeasonAction = (data) => {
    return {
        type: DELETE_RECIPE_TREE_BY_SEASON,
        data
    };
};

const deleteRecipeTreeByTagAction = (data) => {
    return {
        type: DELETE_RECIPE_TREE_BY_TAG,
        data
    };
};

const updateRecipeTreeBySeasonAction = (data) => {
    return {
        type: UPDATE_RECIPE_TREE_BY_SEASON,
        data
    };
};

const updateRecipeTreeByTagAction = (data) => {
    return {
        type: UPDATE_RECIPE_TREE_BY_TAG,
        data
    };
};

const addRecipeTreeBySeasonAction = (data) => {
    return {
        type: ADD_RECIPE_TREE_BY_SEASON,
        data
    };
};

const addRecipeTreeByTagAction = (data) => {
    return {
        type: ADD_RECIPE_TREE_BY_TAG,
        data
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setRecipeTree = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/treeRecipes/`);
    const tree = await res.json();
    dispatch(setRecipeTreeAction(tree));
};

export const deleteRecipetree = (year, season, recipeId, tags) => (dispatch) => {
    dispatch(deleteRecipeTreeBySeasonAction({year, season, recipeId}))
    tags.forEach(tag => {
        dispatch(deleteRecipeTreeByTagAction({tag, recipeId}))
    });
};

export const updateRecipeTree = (year, season, recipeId, tags, updatedTitle) => (dispatch) => {
    dispatch(updateRecipeTreeBySeasonAction({year, season, recipeId, updatedTitle}))
    tags.forEach(tag => {
        dispatch(updateRecipeTreeByTagAction({tag, updatedTitle, recipeId}))
    });
};

export const addRecipeTree = (recipe) => (dispatch) => {
    dispatch(addRecipeTreeBySeasonAction(recipe));
    recipe.tags.forEach(tag => {
        dispatch(addRecipeTreeByTagAction({tag, recipe}));
    });
};

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function recipesTreeReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_RECIPE_TREE:
            newState = action.tree;
            return newState;
        case ADD_RECIPE_TREE_BY_SEASON:
            newState = {...state};
            newState[action.data.year][action.data.season].push({'recipeId': action.data.id, 'title': action.data.title})
            return newState;
        case ADD_RECIPE_TREE_BY_TAG:
            newState = {...state};
            newState['tags'][action.data.tag].push({ 'recipeId': action.data.recipe.id, 'title': action.data.recipe.title})
            return newState;
        case DELETE_RECIPE_TREE_BY_SEASON:
            newState = {...state};
            newState[action.data.year][action.data.season] = newState[action.data.year][action.data.season].filter(recipe => recipe.recipeId !== action.data.recipeId);
            return newState
        case DELETE_RECIPE_TREE_BY_TAG:
            newState = {...state};
            newState['tags'][action.data.tag] = newState['tags'][action.data.tag].filter(recipe => recipe.recipeId !== action.data.recipeId);
            return newState;
        case UPDATE_RECIPE_TREE_BY_SEASON:
            newState = {...state};
            newState[action.data.year][action.data.season] = newState[action.data.year][action.data.season].map(recipe => {
                if (recipe.recipeId === action.data.recipeId) {
                    recipe.title = action.data.updatedTitle;
                    return recipe;
                }
                return recipe;
            });
            return newState;
        case UPDATE_RECIPE_TREE_BY_TAG:
            newState = {...state};
            newState['tags'][action.data.tag] = newState['tags'][action.data.tag].map(recipe => {
                if (recipe.recipeId === action.data.recipeId) {
                    recipe.title = action.data.updatedTitle;
                    return recipe;
                }
                return recipe;
            });
            return newState;
        default:
            return state;
    }
}

export default recipesTreeReducer;