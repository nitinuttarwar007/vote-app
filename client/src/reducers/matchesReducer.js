import {
    GET_MATCHES,
    MATCHES_LOADING
} from "../actions/types";

export function matchesAreLoading(state= false, action) {
    switch(action.type) {
        case MATCHES_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function getMatchesData(state={}, action) {
    switch(action.type){
        case GET_MATCHES:
            console.log("State and action", state, action.payload);
            return action.payload
        default:
            return state
    }
}
