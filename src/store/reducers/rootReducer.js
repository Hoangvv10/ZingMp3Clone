import appReducer from './appReducer';
import musicReducer from './musicReducer';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId'],
};

const appConfig = {
    ...commonConfig,
    key: 'banner',
    whitelist: ['banner'],
};

const rootReducer = combineReducers({
    app: persistReducer(appConfig, appReducer),
    music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
