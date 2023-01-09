import actionTypes from './actionTypes';

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    sid,
});
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,
});

export const random = (flag) => ({
    type: actionTypes.RANDOM,
    flag,
});

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs,
});

export const setCurPlaylistPlaying = (playing) => ({
    type: actionTypes.SET_CURRENT_PLAYLIST_PLAYING,
    playing,
});
