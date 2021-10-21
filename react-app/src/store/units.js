/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_UNITS = 'units/SET_UNITS';
const DELETE_UNIT = 'units/DELETE_UNIT';
const CREATE_UNIT = 'units/CREATE_UNIT'

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setUnitsAction = (units) => {
    console.log(units, 'from action')
    return {
        type: SET_UNITS,
        units
    };
};


const deleteUnitActions = (unit) => {
    return {
        type: DELETE_UNIT,
        unit
    };
};

const createUnitAction = (unit) => {
    return {
        type: CREATE_UNIT,
        unit
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setUnits = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/units/`);
    const units = await res.json();
    console.log(units)
    dispatch(setUnitsAction(units));
}

export const createUnit = (unit) => async (dispatch) => {
    const res = await fetch(`/api/units/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(unit)
    });
    const newUnit = await res.json();
    dispatch(createUnitAction(newUnit));
}

export const deleteUnit = (unit) => async (dispatch) => {
    const res = await fetch(`/api/units/${unit.id}/`, {
        method: "DELETE"
    });
    return dispatch(deleteUnitActions(unit));
}


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function unitsReducer(state = initialState, action) {
    let newState;
    console.log('im in the reducer')
    console.log(action.type)
    console.log(action)
    switch (action.type) {
        case SET_UNITS:
            console.log('from reducer', action.units)
            newState = action.units;
            return newState;
        case CREATE_UNIT:
            newState = {...state};
            newState[action.unit.unit] = action.unit.id
            return newState;
        case DELETE_UNIT:
            newState = {...state}
            delete newState[action.unit.unit]
            return newState
        default:
            return state;
    }
}

export default unitsReducer;