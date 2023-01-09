import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPlay, faAngleUp, faAngleDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Lists.module.scss';
import * as actions from '~/store/actions';
import { useEffect, memo, useRef } from 'react';

const cx = classNames.bind(styles);

function Lists({ data, isChart = false, isArtist = false }) {
    const { curSongId, isPlay } = useSelector((state) => state.music);

    const dispatch = useDispatch();

    return (
        <>
            {data?.map((item, index) => (
                <div
                    onDoubleClick={() => {
                        dispatch(actions.setCurSongId(item?.encodeId));
                        dispatch(actions.play(true));
                        dispatch(actions.setCurPlaylistPlaying(data));
                    }}
                    key={index}
                    className={cx({
                        song: true,
                        'song-active': item?.encodeId === curSongId,
                        'js-active': item?.encodeId === curSongId,
                        'w-50': isArtist,
                        'is-vip': item?.streamingStatus === 2,
                        'is-chart': isChart,
                    })}
                >
                    <div className={cx('media-left')}>
                        {isChart ? (
                            <>
                                <div
                                    className={cx({
                                        rank: true,
                                        'is-top1': index === 0,
                                        'is-top2': index === 1,
                                        'is-top3': index === 2,
                                    })}
                                >
                                    {index + 1}
                                </div>
                                <div className={cx('status')}>
                                    <div className={cx('sort')}>
                                        {item?.rakingStatus > 0 ? (
                                            <>
                                                <div className={cx('sort-up')}>
                                                    <FontAwesomeIcon icon={faAngleUp} />
                                                </div>
                                                <div className={cx('status-num')}>{item?.rakingStatus}</div>
                                            </>
                                        ) : item?.rakingStatus === 0 ? (
                                            <div className={cx('status-num')}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </div>
                                        ) : (
                                            <>
                                                <div className={cx('sort-down')}>
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                </div>
                                                <div className={cx('status-num')}>{item?.rakingStatus * -1}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={cx('list-sort')}>
                                <FontAwesomeIcon icon={faMusic} />
                            </div>
                        )}

                        <div className={cx('song-text')}>
                            <img src={item?.thumbnail} className={cx('song-img')} alt="Ảnh bài hát" />
                            <div className={cx('song-info')}>
                                <h4 className={cx('song-title')}>
                                    <p>{item?.title}</p>{' '}
                                    {item?.streamingStatus === 2 && (
                                        <img
                                            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.16/static/media/vip-label.3dd6ac7e.svg"
                                            className={cx('icon-vip')}
                                            alt="vip-icon"
                                        />
                                    )}
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
                        </div>
                    </div>
                    {!isArtist && (
                        <div className={cx('media-mid')}>
                            <a href={item?.album?.link.replace('.html', '')} className={cx('column-text')}>
                                {item?.album?.title}
                            </a>
                        </div>
                    )}
                    <div className={cx('media-right')}>
                        <div className={cx('column-text')}>{moment.utc(item?.duration * 1000).format('mm:ss')}</div>
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
        </>
    );
}

export default memo(Lists);
