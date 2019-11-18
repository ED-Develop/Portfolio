import {profileAPI} from "../api/api";

const ADD_POST = 'portfolio/profile/ADD-POST';
const SET_USER_PROFILE = 'portfolio/profile/SET-USER-PROFILE';
const TOGGLE_IS_FETCHING = 'portfolio/profile/TOGGLE_IS_FETCHING';
const SET_PROFILE_STATUS = 'portfolio/profile/SET_PROFILE_STATUS';
const DELETE_POST = 'portfolio/profile/DELETE_POST';
const INCREMENTED_LIKE = 'portfolio/profile/INCREMENTED_LIKE';

let initialState = {
    postData: [
        {
            id: 3,
            date: '10/20/2019',
            likeCount: 15,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n' +
                'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n' +
                'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n' +
                'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n' +
                'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
            id: 2,
            date: '10/20/2019',
            likeCount: 54,
            postText: 'I learn React JS'
        },
        {
            id: 1,
            date: '10/20/2019',
            likeCount: 24,
            postText: "It'style my first post"

        }
    ],
    postTextValue: '',
    profile: null,
    status: '',
    isFetching: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postData[0].id + 1,
                date: '10/21/2019',
                likeCount: 0,
                postText: action.post
            };
            return {
                ...state,
                postData: [newPost, ...state.postData],
                postTextValue: ''
            };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile

            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching

            }
        }
        case SET_PROFILE_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                postData: state.postData.filter((post) => post.id != action.postId)
            }
        }
        case INCREMENTED_LIKE: {
            return {
                ...state,
                postData: state.postData.map((post) => {
                    if (post.id == action.postId) {
                        return {...post, likeCount: post.likeCount + 1};
                    } else {
                        return post;
                    }
                })
            }
        }
        default:
            return state;
    }
};

export const addPost = (post) => ({type: ADD_POST, post: post});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
});

export const incrementedLike = (postId) => {
    return {
        type: INCREMENTED_LIKE,
        postId
    }
};

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};

const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};

const setProfileStatus = (status) => {
    return {
        type: SET_PROFILE_STATUS,
        status
    }
};


export const getUserProfile = (userId) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await profileAPI.getUserProfile(userId);
        dispatch(setUserProfile(data));
        dispatch(toggleIsFetching(false));
    }
};

export const getProfileStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfileStatus(userId);
        dispatch(setProfileStatus(response.data));
    }
};
export const updateProfileStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateProfileStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setProfileStatus(status));
        }
    }
};

export default profileReducer;