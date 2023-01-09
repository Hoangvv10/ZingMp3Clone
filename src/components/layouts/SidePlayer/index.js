import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './SidePlayer.module.scss';
import Action from '~/components/Action';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);

function SidePlayer() {
    const [isActive, setIsActive] = useState(1);
    const [curIndex, setCurIndex] = useState(0);

    let setTimeoutId = useRef();

    const { playing, curSongId, isPlay, isRandom } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    useEffect(() => {
        const activeIndex = document.querySelector('.js-active');
        setCurIndex(activeIndex?.dataset.index);

        setTimeoutId.current = setTimeout(() => {
            activeIndex?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);

        return () => clearTimeout(setTimeoutId);
    }, [curSongId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <header className={cx('header-inner')}>
                        <div className={cx('header-left')}>
                            <button
                                className={cx({
                                    'header-btn': true,
                                    'is-active': isActive === 1,
                                })}
                                onClick={() => setIsActive(1)}
                            >
                                Danh sách phát
                            </button>
                            <button
                                className={cx({
                                    'header-btn': true,
                                    'is-active': isActive === 2,
                                })}
                                onClick={() => setIsActive(2)}
                            >
                                Nghe gần đây
                            </button>
                        </div>
                        <div className={cx('header-right')}>
                            <Action title="Hẹn giờ tắt nhạc" body={<FontAwesomeIcon icon={faClock} />} />
                            <Action title="Khác" body={<FontAwesomeIcon icon={faEllipsis} />} />
                        </div>
                    </header>
                </div>
                <div className={cx('playlist-wrapper')}>
                    <div tabIndex="0" className={cx('playlist-inner')}>
                        <div className={cx('playlist')}>
                            <div className={cx('list')}>
                                <div className={cx('songs')}>
                                    {playing?.map((item, index) => (
                                        <div
                                            className={cx({
                                                item: true,
                                                'song-active': item?.encodeId === curSongId,
                                                'js-active': item?.encodeId === curSongId,
                                                'is-vip': item?.streamingStatus === 2,
                                                'is-prev': index < curIndex && !isRandom,
                                            })}
                                            key={index}
                                            onDoubleClick={() => {
                                                dispatch(actions.setCurSongId(item?.encodeId));
                                                dispatch(actions.play(true));
                                            }}
                                            data-index={index}
                                        >
                                            <img src={item?.thumbnail} className={cx('song-img')} alt="Ảnh bài hát" />
                                            <div className={cx('song-info')}>
                                                <h4 className={cx('song-title')}>
                                                    <p>{item?.title}</p>
                                                </h4>

                                                <p className={cx('singer')}>
                                                    {item?.artists?.map((x, index) => (
                                                        <a key={index} href={x?.link}>
                                                            {index > 0 ? ',  ' : ''}
                                                            {x?.name}
                                                        </a>
                                                    ))}
                                                </p>
                                            </div>
                                            {isPlay ? (
                                                <i className={cx('playing-icon')}></i>
                                            ) : (
                                                <div className={cx('song-hover')}>
                                                    <FontAwesomeIcon icon={faPlay} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidePlayer;
