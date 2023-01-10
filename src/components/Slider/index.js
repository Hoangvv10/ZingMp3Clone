import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Slider.module.scss';
import * as actions from '~/store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Slider() {
    const [curImg, setCurImg] = useState(1);

    const setIntervalId = useRef();

    const { banner } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sliderItemEles = document.querySelectorAll('.js-slider');

    const handleNextItem = () => {
        curImg > sliderItemEles?.length - 2 ? setCurImg(0) : setCurImg((prev) => prev + 1);
    };

    const handlePrevItem = () => {
        curImg === 0 ? setCurImg(sliderItemEles?.length - 1) : setCurImg((prev) => prev - 1);
    };

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.play(true));
            dispatch(actions.setCurPlaylistPlaying([item]));
        } else if (item?.type === 4) {
            const albumPath = item?.link?.split('.')[0];
            navigate(albumPath);
        }
    };

    useEffect(() => {
        setIntervalId.current = setTimeout(() => {
            handleNextItem();
        }, 4000);

        return setIntervalId && clearTimeout(setIntervalId);
    }, [curImg]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('gallery')}>
                    {banner.map((item, index) => (
                        <img
                            key={item.encodeId}
                            src={item.banner}
                            onClick={() => handleClickBanner(item)}
                            // className={`gallery-item ${index <= 2 ? 'block' : 'hidden'}`}
                            className={cx({
                                'gallery-item': true,
                                'js-slider': true,
                                first: curImg - 2 < 0 ? index === sliderItemEles?.length - 2 : index === curImg - 2,
                                previous: curImg - 1 < 0 ? index === sliderItemEles?.length - 1 : index === curImg - 1,
                                selected: curImg === index,
                                next: curImg > sliderItemEles?.length - 2 ? index === 0 : index === curImg + 1,
                                last:
                                    curImg > sliderItemEles?.length - 2
                                        ? index === 1
                                        : curImg > sliderItemEles?.length - 3
                                        ? index === 0
                                        : index === curImg + 2,
                            })}
                            dataindex={index}
                        />
                    ))}

                    <div className={cx('left')} onClick={handlePrevItem}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div className={cx('right')} onClick={handleNextItem}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
