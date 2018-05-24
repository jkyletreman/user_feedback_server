import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  // action creator will return a function
  // when thunk sees a function returned, it will apply the dispatch
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

// stripe api
export const handleToken = token => async dispatch => {
  const res = await axois.post('/api/stripe', token);
  // getting the same user model, so we can dispatch the same action creator
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
