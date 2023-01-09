import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import {
    faEllipsis,
    faCompactDisc,
    faMicrophone,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import styles from './Dashboard.module.scss';
import * as apis from '~/apis';
import Action from '~/components/Action';
import * as actions from '~/store/actions';
import PlayerNavigate from '~/components/PlayerNavigate';

const cx = classNames.bind(styles);

function Dashboard() {
    const { curSongId, isPlay } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);

    const [audio, setAudio] = useState(new Audio());
    const [timeLine, setTimeLine] = useState(0);
    const [muted, setMuted] = useState(false);

    const dispatch = useDispatch();
    const thumbRef = useRef();
    const trackRef = useRef();
    const knobRef = useRef();
    const volumeRef = useRef();
    const volumeDownRef = useRef();
    const volumeKnobRef = useRef();
    const intervalId = useRef();

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([apis.getDetailSong(curSongId), apis.getSong(curSongId)]);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                dispatch(actions.play(false));
                setAudio(new Audio());
            }
        };

        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        if (isPlay) {
            audio.play();
            intervalId.current = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                trackRef.current.style.cssText = `right: ${100 - percent}%`;
                knobRef.current.style.cssText = `left: ${percent - 1}%`;
                setTimeLine(Math.round(audio.currentTime));
            }, 300);
        }
    }, [audio]);

    useEffect(() => {
        if (!isPlay) {
            audio.pause();
        } else {
            audio.play();
        }
    }, [isPlay]);

    const handleClickDurationBar = (e) => {
        const trackTimeLine = thumbRef.current.getBoundingClientRect();
        const curTimeLine = e.clientX;
        const x = Math.round(((curTimeLine - trackTimeLine.left) * 10000) / trackTimeLine.width) / 100;
        audio.currentTime = (x * songInfo?.duration) / 100;
        setTimeLine(Math.round((x * songInfo?.duration) / 100));
    };

    const handleMuted = () => {
        setMuted((prev) => !prev);
        if (!muted) {
            audio.muted = true;
        } else {
            audio.muted = false;
        }
    };

    const handleAdjustVolume = (e) => {
        const volumeTrack = volumeRef.current.getBoundingClientRect();
        const curVolume = e.clientX;
        const y = Math.round(((curVolume - volumeTrack.left) * 10000) / volumeTrack.width) / 100;
        audio.volume = y / 100;
        volumeDownRef.current.style.cssText = `right : ${100 - y}% `;
        volumeKnobRef.current.style.cssText = `right : ${100 - y}% `;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <img src={songInfo?.thumbnail} alt="thumnail" className={cx('song-img')} />
                    <div className={cx('info')}>
                        <h4 className={cx('song-title')}>{songInfo?.title}</h4>
                        <p className={cx('song-author')}>{songInfo?.artistsNames}</p>
                    </div>
                    <Action title="Thêm vào thư viện" body={<FontAwesomeIcon icon={faHeart} />} />
                    <Action title="Xem thêm" body={<FontAwesomeIcon icon={faEllipsis} />} />
                </div>
                <div className={cx('middle')}>
                    <PlayerNavigate audio={audio} />
                    <div className={cx('duration-inner')}>
                        <span className={cx('start')}>{moment.utc(timeLine * 1000).format('mm:ss')}</span>
                        <div className={cx('duration-bar')}>
                            <div ref={thumbRef} className={cx('duration-up')} onClick={handleClickDurationBar}>
                                <div ref={trackRef} id="thumb-progress" className={cx('duration-bottom')}></div>
                                <div ref={knobRef} className={cx('knob')}></div>
                            </div>
                        </div>
                        <span className={cx('end')}>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                    </div>
                </div>
                <div className={cx('right')}>
                    <Action body={<FontAwesomeIcon icon={faCompactDisc} />} title="MV" />
                    <Action body={<FontAwesomeIcon icon={faMicrophone} />} title="Lời bài hát" />
                    <Action body={<FontAwesomeIcon icon={faWindowRestore} />} title="Chế độ cửa sổ" />

                    <button className={cx('muted-btn')} onClick={handleMuted}>
                        {muted ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
                    </button>

                    <div className={cx('volume-slider')}>
                        <div className={cx('volume-inner')}>
                            <div ref={volumeRef} className={cx('volume-up')} onClick={handleAdjustVolume}>
                                <div ref={volumeDownRef} className={cx('volume-down')}></div>
                                <div ref={volumeKnobRef} className={cx('volume-knob')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
