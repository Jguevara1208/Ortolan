/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_ORDER_CATEGORIES = 'orderCategories/SET_ORDER_CATEGORIES';
const ADD_ORDER_CATEGORY = 'orderCategories/ADD_ORDER_CATEGORY';
const DELETE_ORDER_CATEGORY = 'orderCategories/DELETE_ORDER_CATEGORY';


/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setOrderCategoriesAction = (categories) => {
    return {
        type: SET_ORDER_CATEGORIES,
        categories
    };
};

const addOrderCategoryAction = (category) => {
    return {
        type: ADD_ORDER_CATEGORY,
        category
    };
};

const deleteOrderCategoryAction = (category) => {
    return {
        type: DELETE_ORDER_CATEGORY,
        category
    };
};


/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setOrderCategories = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/categories/`);
    const categories = await (await res).json();
    dispatch(setOrderCategoriesAction(categories));
};

export const addOrderCategory = (category) => async (dispatch) => {
    const res = await fetch(`/api/categories/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(category)
    });

    const newCat = await res.json();
    dispatch(addOrderCategoryAction(newCat));
};

export const deleteOrderCategory = (category) => async (dispatch) => {
    await fetch(`/api/categories/${category.id}/`, {
        method: "DELETE"
    });
    dispatch(deleteOrderCategoryAction(category));
};


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function orderCategoriesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ORDER_CATEGORIES:
            newState = action.categories;
            return newState
        case ADD_ORDER_CATEGORY:
            newState = {...state};
            newState[action.category.name] = action.category.id;
            return newState;
        case DELETE_ORDER_CATEGORY:
            newState = {...state};
            delete newState[action.category.name];
            return newState;
        default:
            return state;
    }
}

export default orderCategoriesReducer;