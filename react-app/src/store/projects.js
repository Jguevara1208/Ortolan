/* ----------------------------------------------------------------------- */
/* -----------------------------Actions----------------------------------- */
/* ----------------------------------------------------------------------- */
const SET_PROJECTS = 'projects/SET_PROJECTS';
const DELETE_PROJECTS = 'projects/DELETE_PROJECTS';
const UPDATE_PROJECTS = 'projects/UPDATE_PROJECTS';
const ADD_PROJECT_ASSIGNMENTS = 'projects/ADD_PROJECT_ASSIGNMENTS';
const DELETE_PROJECT_ASSIGNMENTS = 'projects/DELETE_PROJECT_ASSIGNMENTS';
const CREATE_PROJECT = 'projects/CREATE_PROJECT';


/* ----------------------------------------------------------------------- */
/* ----------------------------Action Creators---------------------------- */
/* ----------------------------------------------------------------------- */

const setProjectsAction = (projects) => {
    return {
        type: SET_PROJECTS,
        projects
    };
};

const updateProjectsAction = (project) => {
    return {
        type: UPDATE_PROJECTS,
        project
    };
};

const deleteProjectsAction = (projectId) => {
    return {
        type: DELETE_PROJECTS,
        projectId
    };
};

const addProjectAssignmentsAction = (project) => {
    return {
        type: ADD_PROJECT_ASSIGNMENTS,
        project
    };
};

const deleteProjectAssignmentsAction = (project) => {
    return {
        type: DELETE_PROJECT_ASSIGNMENTS,
        project
    };
};

const createProjectAction = (project) => {
    return {
        type: CREATE_PROJECT,
        project
    };
};

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setProjects = (userId) => async (dispatch) => {
    let res = await fetch(`/api/users/${userId}/projects/`);
    res = await res.json();
    const projects = res.projects;
    dispatch(setProjectsAction(projects));
};

export const createProject = (project) => async (dispatch) => {
    const res = await fetch(`/api/projects/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    });
    const newProject = res.json();
    dispatch(createProjectAction(newProject));
}

export const updateProject = (project) => async (dispatch) => {
    await fetch(`/api/projects/${project.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    });
    dispatch(updateProjectsAction(project));
};

export const deleteProject = (projectId) => async (dispatch) => {
    await fetch(`/api/projects/${projectId}`, {
        method: "DELETE"
    });
    dispatch(deleteProjectsAction(projectId));
};

export const addProjectAssignment = (projectId, userId) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}/assign/${userId}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    });

    let project = {
        id: projectId,
        user: await res.json()
    };
    dispatch(addProjectAssignmentsAction(project));
};

export const deleteProjectAssignment = (projectId, userId) => async (dispatch) => {
    await fetch(`/api/projects/${projectId}/assign/${userId}/`, {
        method: "DELETE"
    });
    dispatch(deleteProjectAssignmentsAction( { projectId, userId } ));
};


/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

function projectsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_PROJECTS:
            newState = action.projects;
            return newState;
        case CREATE_PROJECT:
            newState = {...state};
            newState[action.project.id] = action.project
            return newState;
        case DELETE_PROJECTS:
            newState = {...state};
            delete newState[action.projectId]
            return newState;
        case UPDATE_PROJECTS:
            newState = {...state};
            newState[action.project.id] = action.project
            return newState;
        case ADD_PROJECT_ASSIGNMENTS:
            newState = {...state};
            newState[action.project.id].assigned.push(action.project.user)
            return newState;
        case DELETE_PROJECT_ASSIGNMENTS:
            newState = {...state};
            newState[action.project.projectId].assigned = newState[action.project.projectId].assigned.filter(user => user.id !== action.project.userId)
            return newState;
        default:
            return state;
    }
}

export default projectsReducer