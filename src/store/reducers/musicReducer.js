import actionTypes from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlay: false,
    songs: null,
    playing: null,
    isRandom: null,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null,
            };
        case actionTypes.PLAY:
            return {
                ...state,
                isPlay: action.flag,
            };

        case actionTypes.RANDOM:
            return {
                ...state,
                isRandom: action.flag,
            };

        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs,
            };
        case actionTypes.SET_CURRENT_PLAYLIST_PLAYING:
            return {
                ...state,
                playing: action.playing || null,
            };

        default:
            return state;
    }
};

export default musicReducer;
