import axios from '~/axios';

export const getNewChart = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/NewReleaseChart',
                method: 'get',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
