import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  ROOT_URL,
  MENTORS,
  LEARNER_PREFERENCES,
  CURRENT_MENTOR,
} from './actionTypes';


export function fetchMentors() {
  const endpoint = '/api/learner/mentors';
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        dispatch({
          type: MENTORS,
          payload: response.data,
        });
      });
  };
}

export function newSearchQuery(query) {
  console.log('query: ', query)
  const endpoint = `/api/learner/search?q=${query}`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        console.log('response: ', response)
        dispatch({
          type: MENTORS,
          payload: response.data,
        });
      });
  };
}

export function fetchPreferences(userId) {
  const endpoint = `ROOT_URL/api/learner/users/${userId}/perferences`;
  return dispatch => {
    axios.get(endpoint)
      .then(response => {
        dispatch({
          type: LEARNER_PREFERENCES,
          payload: response.data,
        });
      });
  };
}

export function fetchCurrentMentor(currentMentor) {
  return (dispatch, getState) => {
    const state = getState();
    const mentorObj = state.learner.mentors.filter(mentor => {
      return currentMentor === mentor.username;
    });
    console.log(mentorObj);
    dispatch({
      type: CURRENT_MENTOR,
      payload: mentorObj,
    });
  };
}
