import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  // action creator will return a function
  // when thunk sees a function returned, it will apply the dispatch
  return function(dispatch) {
    axios.get("/api/current_user").then(res =>
      dispatch({
        type: FETCH_USER,
        payload: res
      })
    );
  };
};
