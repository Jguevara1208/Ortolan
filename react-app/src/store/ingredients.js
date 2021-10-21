/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */
const SET_INGREDIENTS = 'ingredients/SET_INGREDIENTS';
const ADD_INGREDIENT = 'ingredients/ADD_INGREDIENT';
const DELETE_INGREDIENT = 'ingredients/DELETE_INGREDIENT';


/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setIngredientsAction = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients
    };
};

const addIngredientAction = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient
    };
};

const deleteIngredientAction = (name) => {
    return {
        type: DELETE_INGREDIENT,
        name
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setIngredients = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/ingredients/`);
    const ingredients = await res.json();
    return dispatch(setIngredientsAction(ingredients));
};

export const addIngredient = (ingredient) => async (dispatch) => {
    const res = await fetch(`/api/ingredients/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(ingredient)
    });

    const newIngredient = await res.json();
    dispatch(addIngredientAction(newIngredient));
};

export const deleteIngredient = (ingredient) => async (dispatch) => {
    await fetch(`/api/ingredients/${ingredient.id}`, {
        method: "DELETE"
    });
    dispatch(deleteIngredientAction(ingredient.name));
};

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function ingredientsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_INGREDIENTS:
            newState = action.ingredients
            return newState;
        case ADD_INGREDIENT:
            newState = {...state};
            newState[action.ingredient.name] = action.ingredient.ingredient;
            return newState;
        case DELETE_INGREDIENT:
            newState = {...state};
            delete newState[action.name];
            return newState;
        default:
            return state;
    }
}

export default ingredientsReducer