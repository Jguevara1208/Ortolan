/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

    const SET_ORDER_GUIDE = 'orderingGuide/SET_ORDER_GUIDE';

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setOrderGuideAction = (orderGuide) => {
    return {
        type: SET_ORDER_GUIDE,
        orderGuide
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setOrderGuide = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/ordering/`)
    const orderGuide = await res.json()
    dispatch(setOrderGuideAction(orderGuide))
}

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function orderingGuideReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ORDER_GUIDE:
            newState = action.orderGuide;
            return newState
        default:
            return state;
    }
}

export default orderingGuideReducer;