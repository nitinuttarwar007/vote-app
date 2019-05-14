import axios from "axios";
import {
  GET_MATCHES,
  MATCHES_LOADING
} from "./types";


export const matchesAreLoading = (bool) => {
    return {
        type: MATCHES_LOADING,
        isLoading: bool
    };
}

export const getMatchesData = (items) => {
    return {
        type: GET_MATCHES,
        payload: items
    };
}

export const getMatches = () => dispatch => {
    dispatch(matchesAreLoading(true));
    axios
        .get("/api/users/matches")
        .then((res) => {
            console.log("API Call response", res);
            if(res.status !== 200){
                throw Error(res.statusText);
            }
            dispatch(matchesAreLoading(false));
            return res;
        })
        .then((res) => dispatch(getMatchesData(res.data)))
};
