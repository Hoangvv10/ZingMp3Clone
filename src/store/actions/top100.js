import actionTypes from './actionTypes';
import * as apis from '~/apis';

export const getTop100 = () => async (dispatch) => {
    try {
        const response = await apis.getTop100();

        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOP_100,
                newChartData: response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_TOP_100,
                newChartData: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOP_100,
            newChartData: null,
        });
    }
};
