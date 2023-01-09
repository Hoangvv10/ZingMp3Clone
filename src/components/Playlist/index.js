import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { faEllipsis, faPlay, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import Action from '../Action';
import styles from './Playlist.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Playlist({ songs, num = 5, other = false, isArtistCollection = false }) {
    const [resizePlaylist, setResizePlaylist] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const resizeArray = (array, newSize) => {
            const changeSize = newSize - array?.length;
            if (changeSize > 0) {
                return array?.concat(Array(changeSize).fill(0));
            }
            return array?.slice(0, newSize);
        };
        if (num > songs?.items?.length) {
            num = songs?.items?.length;
        }
        setResizePlaylist(resizeArray(songs?.items, num));
    }, [songs]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <p>{songs?.title}</p>
                    {songs?.title === 'Top 100' && (
                        <div className={cx('play-all')} onClick={() => navigate('/top100')}>
                            Tất cả
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    )}
                </div>
                <div className={cx('playlist-list')}>
                    {resizePlaylist?.map((item, index) => (
                        <div
                            key={index}
                            className={cx({
                                'playlist-item': true,
                                other: other,
                            })}
                            onClick={() => {
                                const playlistPath = item?.link?.split('.')[0];
                                navigate(playlistPath);
                            }}
                        >
                            <div
                                className={cx({
                                    'item-thumb': true,
                                    other: other,
                                })}
                            >
                                <div className={cx('thumb')}>
                                    <img src={item?.thumbnailM} alt="Anh playlist" className={cx('item-img')} />
                                    <div className={cx('item-hover')}>
                                        <div className={cx('hover-inner')}>
                                            <Action
                                                title="Thêm vào thư viện"
                                                body={<FontAwesomeIcon icon={faHeart} />}
                                            />
                                            <span className={cx('playlist-play')}>
                                                <FontAwesomeIcon icon={faPlay} />
                                            </span>
                                            <Action title="Xem thêm" body={<FontAwesomeIcon icon={faEllipsis} />} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isArtistCollection ? (
                                <div className={cx('list-artist')}>{item?.sortDescription}</div>
                            ) : (
                                <>
                                    <div
                                        onClick={() => (window.location.href = item?.link.replace('.html', ''))}
                                        className={cx('list-title')}
                                    >
                                        {other ? item?.name : item?.title}
                                    </div>
                                    <div className={cx('list-artist')}>
                                        {other
                                            ? `${Math.floor(item?.totalFollow / 1000)}K người theo dõi`
                                            : item?.artists?.map((singer, index) => (
                                                  <a href={singer?.link} key={index} className={cx('list-singer')}>
                                                      {index > 0 ? ',  ' : ''}
                                                      {singer?.name}
                                                  </a>
                                              ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
