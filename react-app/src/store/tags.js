/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */

const SET_TAGS = 'tags/SET_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const UPDATE_TAG = 'tags/UPDATE_TAG';
const DELETE_TAG = 'tags/DELETE_TAG';

/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setTagsAction = (tags) => {
    return {
        type: SET_TAGS,
        tags
    };
};

const addTagAction = (tag) => {
    return {
        type: ADD_TAG,
        tag
    };
};

const updateTagAction = (tag) => {
    return {
        type: UPDATE_TAG,
        tag
    };
};

const deleteTagAction = (tag) => {
    return {
        type: DELETE_TAG,
        tag
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setTags = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/tags/`);
    const tags = await res.json();
    dispatch(setTagsAction(tags));
};

export const addTag = (tag) => async (dispatch) => {
    const res = await fetch(`/api/tags/`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(tag)
    });
    const newTag = await res.json();
    dispatch(addTagAction(newTag));
};

export const updateTag = (tag) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tag.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(tag)
    });
    dispatch(updateTagAction(tag));
};

export const deleteTag = (tag) => async (dispatch) => {
    await fetch(`/api/tags/${tag.id}`, {
        method: "DELETE"
    });
    dispatch(deleteTagAction(tag.id));
};


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function tagsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_TAGS:
            newState = action.tags;
            return newState;
        case ADD_TAG:
            newState = {...state};
            newState[action.tag.name] = action.tag.id
            return newState;
        case UPDATE_TAG:
            newState = {...state};
            newState[action.tag.name] = action.tag.id
            return newState;
        case DELETE_TAG:
            newState = {...state};
            delete newState[action.tag.name]
            return newState;
        default:
            return state;
    }
}

export default tagsReducer;