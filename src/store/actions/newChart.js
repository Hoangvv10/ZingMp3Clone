import actionTypes from './actionTypes';
import * as apis from '~/apis';

export const getNewChart = () => async (dispatch) => {
    try {
        const response = await apis.getNewChart();

        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_CHART,
                newChartData: response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_NEW_CHART,
                newChartData: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_CHART,
            newChartData: null,
        });
    }
};
