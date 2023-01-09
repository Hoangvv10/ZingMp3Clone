import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    playlist: [],
    release: [],
    livestream: [],
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData.find((item) => item.sectionType === 'banner').items || null,
                playlist: action.homeData.filter((item) => item.sectionType === 'playlist') || null,
                release: action.homeData.find((item) => item.sectionType === 'new-release').items || null,
                livestream: action.homeData.find((item) => item.sectionType === 'livestream').items || null,
            };

        case actionTypes.GET_NEW_CHART:
            return {
                ...state,
            };

        case actionTypes.GET_SEARCH_DATA:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default appReducer;
