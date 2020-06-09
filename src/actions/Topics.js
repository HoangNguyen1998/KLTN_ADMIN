import * as TopicsConstants from "constants/Topics";
export const getTopicsRequest = (setIsWaiting) => {
  return {
    type: TopicsConstants.GET_TOPICS_REQUEST,
    payload: setIsWaiting
  };
};

export const getTopicsSuccess = success => {
  return {
    type: TopicsConstants.GET_TOPICS_SUCCESS,
    payload: success
  };
};

export const getTopicsError = error => {
  return {
    type: TopicsConstants.GET_TOPICS_ERROR,
    payload: error
  };
};

//Lay thong tin chi tiet cua mot topic
export const gettopicdetailsRequest = id => {
  return {
    type: TopicsConstants.GET_TOPIC_DETAILS_REQUEST,
    payload: id
  };
};
export const gettopicdetailsSuccess = success => {
  return {
    type: TopicsConstants.GET_TOPIC_DETAILS_SUCCESS,
    payload: success
  };
};
export const gettopicdetailsError = error => {
  return {
    type: TopicsConstants.GET_TOPIC_DETAILS_ERROR,
    payload: error
  };
};

//Hoc mot topic duoc chon
export const learntopicRequest = id => {
  return {
    type: TopicsConstants.LEARN_TOPIC_REQUEST,
    payload: id
  };
};
export const learntopicSuccess = success => {
  return {
    type: TopicsConstants.LEARN_TOPIC_SUCCESS,
    payload: success
  };
};
export const learntopicError = error => {
  return {
    type: TopicsConstants.LEARN_TOPIC_ERROR,
    payload: error
  };
};

//Luu lich su
export const setHistoriesRequest = data => {
  return {
    type: TopicsConstants.SET_HISTORIES_REQUEST,
    payload: data
  };
};
export const setHistoriesSuccess = success => {
  return {
    type: TopicsConstants.SET_HISTORIES_SUCCESS,
    payload: success
  };
};
export const setHistoriesError = error => {
  return {
    type: TopicsConstants.SET_HISTORIES_ERROR,
    payload: error
  };
};
