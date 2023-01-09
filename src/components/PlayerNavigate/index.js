import styles from './PlayerNavigate.module.scss';
import * as actions from '~/store/actions';

import classNames from 'classnames/bind';
import {
    faPlay,
    faRotateRight,
    faShuffle,
    faStepBackward,
    faStepForward,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function PlayerNavigate({ audio }) {
    const { curSongId, isPlay, songs, isRandom } = useSelector((state) => state.music);

    const [isRepeatMode, setIsRepeatMode] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const dispatch = useDispatch();

    const random = Math.floor(Math.random() * songs?.length);
    let currentSongIndex;

    songs?.forEach((item, index) => {
        if (item?.encodeId === curSongId) currentSongIndex = index;
    });

    const handleTogglePlayMusic = async () => {
        if (isPlay) {
            // audio.pause();
            dispatch(actions.play(false));
        } else {
            // audio.play();
            dispatch(actions.play(true));
        }
    };

    const handleTogglePlayRandom = async () => {
        if (isRandom) {
            dispatch(actions.random(false));
        } else {
            dispatch(actions.random(true));
        }
    };

    useEffect(() => {
        if (isRepeatMode !== 1 && currentSongIndex === songs?.length - 1) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }

        audio.onended = () => {
            if (isRepeatMode === 2) {
                audio.currentTime = 0;
                audio.play();
            } else {
                handleNextSong();
            }
        };
    }, [audio, isRepeatMode]);

    const handleNextSong = () => {
        if (currentSongIndex > songs?.length - 1) {
            dispatch(actions.setCurSongId(songs[0].encodeId));
        } else if (isRandom) {
            dispatch(actions.setCurSongId(songs[random].encodeId));
        } else {
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
        }
    };

    const handlePrevSong = () => {
        if (currentSongIndex === 0) {
            dispatch(actions.setCurSongId(songs[songs?.length - 1].encodeId));
        } else if (isRandom) {
            dispatch(actions.setCurSongId(songs[random].encodeId));
        } else {
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
        }
        audio.play();
    };

    return (
        <div className={cx('navigate')}>
            <button
                className={cx({
                    btn: true,
                    btnActive: isRandom,
                })}
                onClick={handleTogglePlayRandom}
            >
                <FontAwesomeIcon className={cx('nav-btn')} icon={faShuffle} />
            </button>
            <button className={cx('btn')} onClick={handlePrevSong}>
                <FontAwesomeIcon className={cx('nav-btn')} icon={faStepBackward} />
            </button>
            <button className={cx('play-btn')} onClick={handleTogglePlayMusic}>
                {isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
            <button className={cx('btn')} disabled={isDisabled} onClick={handleNextSong}>
                <FontAwesomeIcon className={cx('nav-btn')} icon={faStepForward} />
            </button>

            <button
                className={cx({
                    btn: true,
                    btnActive: isRepeatMode === 1 || isRepeatMode === 2,
                })}
                onClick={() => setIsRepeatMode((prev) => (prev === 3 ? 0 : prev + 1))}
            >
                <FontAwesomeIcon className={cx('nav-btn')} icon={faRotateRight} />
                <span
                    className={cx({
                        repeatNum: true,
                        btnActive2: isRepeatMode === 2,
                    })}
                >
                    1
                </span>
            </button>
        </div>
    );
}

export default PlayerNavigate;
