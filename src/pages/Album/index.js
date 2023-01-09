import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faPlay, faEllipsis, faPause, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Album.module.scss';
import * as apis from '~/apis';
import * as actions from '~/store/actions';
import Action from '~/components/Action';
import Lists from '~/components/Lists';

const cx = classNames.bind(styles);

function Album() {
    const [playlistData, setPlaylistData] = useState(null);

    const { isPlay } = useSelector((state) => state.music);
    const { pid } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const res = await apis.getDetailPlaylist(pid);
            setPlaylistData(res.data.data);
            dispatch(actions.setPlaylist(res?.data?.data?.song.items));
        };

        fetchDetailPlaylist();
    }, [pid]);

    const handleTogglePlayMusic = async () => {
        if (isPlay) {
            dispatch(actions.play(false));
        } else {
            dispatch(actions.play(true));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div
                        className={cx({
                            'album-thumnail': true,
                            'thumbnail-rotate': isPlay,
                        })}
                        onClick={handleTogglePlayMusic}
                    >
                        <img className={cx('album-img')} src={playlistData?.thumbnailM} alt="Ảnh album" />
                        {!isPlay ? (
                            <div className={cx('play-hover')}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        ) : (
                            <i className={cx('playing-icon')}></i>
                        )}
                    </div>
                    <div className={cx('media-content')}>
                        <div className={cx('content-top')}>
                            <div className={cx('title')}>{playlistData?.title}</div>
                            <div className={cx('date')}>
                                Cập nhật: {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}
                            </div>
                            <div className={cx('artists')}>
                                {playlistData?.artists?.map((x, index) => (
                                    <a key={index} href={x?.link}>
                                        {index > 0 ? ',  ' : ''}
                                        {x?.name}
                                    </a>
                                ))}
                            </div>
                            <div className={cx('like')}>{playlistData?.like} người yêu thích</div>
                        </div>
                    </div>
                    <div className={cx('media-action')}>
                        <button className={cx('play-all')} onClick={handleTogglePlayMusic}>
                            {!isPlay ? (
                                <>
                                    <FontAwesomeIcon className={cx('icon-play')} icon={faPlay} />
                                    <span className={cx('play-text')}>TIẾP TỤC PHÁT</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon className={cx('icon-play')} icon={faPause} />
                                    <span className={cx('play-text')}>TẠM DỪNG</span>
                                </>
                            )}
                        </button>
                        <div className={cx('level')}>
                            <Action
                                style={{ fontSize: '1.6rem' }}
                                title="Thêm vào thư viện"
                                body={<FontAwesomeIcon icon={faHeart} />}
                            />
                            <Action
                                style={{ fontSize: '1.6rem' }}
                                title="Xem thêm"
                                body={<FontAwesomeIcon icon={faEllipsis} />}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('description')}>
                        <span className={cx('preface')}>Lời tựa</span>
                        <span>{playlistData?.sortDescription}</span>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('header')}>
                            <div className={cx('media-left')}>
                                <div className={cx('list-sort')}>
                                    <FontAwesomeIcon icon={faArrowDownZA} />
                                </div>
                                <div className={cx('column-text')}>BÀI HÁT</div>
                            </div>
                            <div className={cx('media-mid')}>
                                <div className={cx('column-text')}>ALBUM</div>
                            </div>
                            <div className={cx('media-right')}>
                                <div className={cx('column-text')}>THỜI GIAN</div>
                            </div>
                        </div>
                        <div className={cx('songs')}>
                            <Lists data={playlistData?.song?.items} />
                        </div>
                    </div>
                    <div className={cx('bottom-info')}>
                        <span>{playlistData?.song?.total} bài hát</span>
                        <FontAwesomeIcon icon={faCircle} />
                        <span>{Math.floor(playlistData?.song?.totalDuration / 60)} phút</span>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: '100px' }}></div>
        </div>
    );
}

export default Album;
