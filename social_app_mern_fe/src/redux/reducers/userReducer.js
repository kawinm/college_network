import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    UPDATE_POST_IMAGE,
    SET_GROUPS
} from "./types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false,
    groups: [],
    post_image: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_SCREAM:
            return {
                ...state,
                like: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            };
        case UNLIKE_SCREAM:
            return {
                ...state,
                like: state.likes.filter(
                    like => like.screamId == action.payload.screamId
                )
            };
        case UPDATE_POST_IMAGE:
            return {
                ...state,
                post_image: action.payload
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
