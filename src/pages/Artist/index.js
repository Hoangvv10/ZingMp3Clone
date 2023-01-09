import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './Artist.module.scss';
import * as apis from '~/apis';
import * as actions from '~/store/actions';
import Lists from '~/components/Lists';
import Playlist from '~/components/Playlist';

const cx = classNames.bind(styles);

function Artist() {
    const [artistData, setArtistData] = useState(null);
    const [songs, setSongs] = useState(null);
    const [single, setSingle] = useState(null);
    const [album, setAlbum] = useState(null);
    const [collection, setCollection] = useState(null);
    const [appearance, setAppearance] = useState(null);
    const [otherArtist, setOtherArtist] = useState(null);

    const { name } = useParams();
    const dispatch = useDispatch();

    const regex = /<br>/g;

    useEffect(() => {
        const fetchArtist = async () => {
            const res = await apis.getArtist(name);
            setArtistData(res.data.data);
            dispatch(actions.setPlaylist(res?.data?.data?.song?.items));
        };

        fetchArtist();
    }, [name]);

    useEffect(() => {
        const resizeArray = (array, newSize) => {
            const changeSize = newSize - array?.length;
            if (changeSize > 0) {
                return array?.concat(Array(changeSize).fill(0));
            }
            return array?.slice(0, newSize);
        };

        setSongs(resizeArray(artistData?.sections[0]?.items, 6));
        setSingle(artistData?.sections.find((item) => item.title === 'Single & EP'));
        setAlbum(artistData?.sections.find((item) => item.title === 'Album'));
        setCollection(artistData?.sections.find((item) => item.title === 'Tuyển tập'));
        setAppearance(artistData?.sections.find((item) => item.title === 'Xuất hiện trong'));
        setOtherArtist(artistData?.sections.find((item) => item.title === 'Bạn Có Thể Thích'));
    }, [artistData]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <img src={artistData?.cover} className={cx('header-img')} alt="Artist thumb" />
                    <div className={cx('info')}>
                        <div className={cx('top')}>
                            <header className={cx('header-title')}>{artistData?.name}</header>
                            <span className={cx('header-play')}>
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        </div>
                        <div className={cx('follow')}>{artistData?.totalFollow} người quan tâm</div>
                    </div>
                </div>
                <div className={cx('highlight-songs')}>
                    <h3 className={cx('title')}>Bài hát nổi bật</h3>
                    <div className={cx('highlight-list')}>
                        <Lists data={songs} isArtist={true} />
                    </div>
                </div>
                <Playlist songs={single} />
                <Playlist songs={album} />
                <Playlist songs={collection} />
                <Playlist songs={appearance} />
                <Playlist songs={otherArtist} other={true} />

                {artistData?.biography && (
                    <div className={cx('about')}>
                        <div className={cx('title')}>Về {artistData?.name}</div>
                        <div className={cx('about-body')}>
                            <div className={cx('about-left')}>
                                <img src={artistData?.thumbnailM} className={cx('about-img')} alt="song-img" />
                            </div>
                            <div className={cx('about-right')}>
                                <div className={cx('about-description')}>
                                    {artistData?.biography.replace(regex, '')}
                                </div>
                                <div className={cx('statistic')}>
                                    <h3 className={cx('title')}>{artistData?.follow}</h3>
                                    <h3 className={cx('people')}>Người quan tâm</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div style={{ minHeight: '100px' }}></div>
        </div>
    );
}

export default Artist;
