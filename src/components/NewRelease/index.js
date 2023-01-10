import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './NewRelease.module.scss';
import * as actions from '~/store/actions';
import moment from 'moment';

const cx = classNames.bind(styles);

function NewRelease() {
    const { release } = useSelector((state) => state.app);

    const [releaseAll, setReleaseAll] = useState(null);
    const [releaseWorldwide, setReleaseWorldwide] = useState(null);
    const [releaseVpop, setReleaseVpop] = useState(null);
    const [isActive, setIsActive] = useState(0);
    const [releaseList, setReleaseList] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        switch (isActive) {
            case 1:
                setReleaseList(releaseVpop);
                break;
            case 2:
                setReleaseList(releaseWorldwide);
                break;
            default:
                setReleaseList(releaseAll);
                break;
        }
    }, [isActive]);

    useEffect(() => {
        const resizeArray = (array, newSize) => {
            const changeSize = newSize - array?.length;
            if (changeSize > 0) {
                return array?.concat(Array(changeSize).fill(0));
            }
            return array?.slice(0, newSize);
        };

        setReleaseAll(resizeArray(release?.all, 12));
        setReleaseWorldwide(resizeArray(release?.others, 11));
        setReleaseVpop(resizeArray(release?.vPop, 12));
    }, [release]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>Mới Phát Hành</div>
                <div className={cx('release-btn')}>
                    <button
                        onClick={() => setIsActive(0)}
                        className={cx({
                            btn: true,
                            active: isActive === 0,
                        })}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setIsActive(1)}
                        className={cx({
                            btn: true,
                            active: isActive === 1,
                        })}
                    >
                        Việt Nam
                    </button>
                    <button
                        onClick={() => setIsActive(2)}
                        className={cx({
                            btn: true,
                            active: isActive === 2,
                        })}
                    >
                        Quốc Tế
                    </button>
                </div>
                <div className={cx('songs')}>
                    {releaseList?.map((item, index) => (
                        <div
                            className={cx('song')}
                            key={index}
                            onDoubleClick={() => {
                                dispatch(actions.setCurSongId(item.encodeId));
                                dispatch(actions.play(true));
                            }}
                        >
                            <img src={item?.thumbnail} className={cx('song-img')} />
                            <div className={cx('song-info')}>
                                <div className={cx('song-title')}>{item?.title}</div>
                                <a href={item?.artists[0]?.link} className={cx('song-singer')}>
                                    {item?.artists[0]?.name}
                                </a>
                                <div className={cx('date')}>{moment.unix(item?.releaseDate).fromNow()}</div>
                            </div>
                            <div className={cx('song-hover')}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewRelease;
