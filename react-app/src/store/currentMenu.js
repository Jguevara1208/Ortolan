/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const GET_CURRENT_MENU = 'currentMenu/GET_CURRENT_MENU';
const ADD_CURRENT_MENU = 'currentMenu/ADD_CURRENT_MENU';
const REMOVE_CURRENT_MENU = 'currentMenu/REMOVE_CURRENT_MENU';

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const getCurrentMenuAction = (menu) => {
    return {
        type: GET_CURRENT_MENU,
        menu
    };
};

const addCurrentMenuAction = (menu) => {
    return {
        type: GET_CURRENT_MENU,
        menu
    };
};

const removeCurrentMenuAction = (menu) => {
    return {
        type: GET_CURRENT_MENU,
        menu
    };
};


/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const getCurrentMenu = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/currentMenu/`)
    const menu = await res.json();
    dispatch(getCurrentMenuAction(menu.currentMenu))
};

export const addCurrentMenu = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/currentMenu/${recipeId}/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: {}
    })
    const menu = await res.json()
    dispatch(addCurrentMenuAction(menu.currentMenu))
};

export const removeCurrentMenu = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/currentMenu/${recipeId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: {}
    })
    const menu = await res.json()
    dispatch(removeCurrentMenuAction(menu.currentMenu))
};


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = []

function currentMenuReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_CURRENT_MENU:
            newState = [...action.menu]
            return newState;
        case ADD_CURRENT_MENU:
            newState = [...action.menu]
            return newState;
        case REMOVE_CURRENT_MENU:
            newState = [...action.menu]
            return newState;
        default:
            return state;
    }
}

export default currentMenuReducer