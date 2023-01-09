import axios from '~/axios';

export const getSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/song',
                method: 'get',
                params: {
                    id: sid,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getDetailSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/infosong',
                method: 'get',
                params: {
                    id: sid,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getDetailPlaylist = (pid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/detailplaylist',
                method: 'get',
                params: {
                    id: pid,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getArtist = (name) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/artist',
                method: 'get',
                params: {
                    name: name,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getSearchData = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/search',
                method: 'get',
                params: {
                    keyword,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
