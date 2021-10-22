const SET_TEAM_MEMBERS = 'teamMembers/SET_TEAM_MEMBERS';

const setTeamMembersAction = (team) => {
    return {
        type: SET_TEAM_MEMBERS,
        team
    };
};

export const setTeamMembers = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/team/`)
    const team = await res.json()
    dispatch(setTeamMembersAction(team.team));
};

const initialState = []

const teamMembersReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_TEAM_MEMBERS:
            newState = action.team ;           
            return newState;
        default:
            return state;
    };
};

export default teamMembersReducer;