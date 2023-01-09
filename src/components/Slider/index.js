import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getArrSlider } from '~/ultis';
import styles from './Slider.module.scss';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);

function Slider() {
    const { banner, playing } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const sliderEls = document.getElementsByClassName('gallery-item');
        let min = 0;
        let max = 2;
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1);
            for (let i = 0; i < sliderEls.length; i++) {
                // Delete classnames (css)
                // sliderEls[i]?.classList?.remove(slideRight, orderLast);
                // sliderEls[i]?.classList?.remove(slideLeft, orderFirst);
                // sliderEls[i]?.classList?.remove(slideLeftTwo, orderTwo);

                // Hide or Show images
                if (list.some((item) => item === i)) {
                    sliderEls[i].style.display = 'block';
                } else {
                    sliderEls[i].style.display = 'none';
                }
            }
            // Add animation by adding classnames

            const slideRight = cx('slide-right');
            const slideLeft = cx('slide-left');
            const slideLeftTwo = cx('slide-left-2');
            const orderFirst = cx('order-first');
            const orderLast = cx('order-last');
            const orderTwo = cx('order-two');

            list.forEach((item) => {
                if (item === max) {
                    sliderEls[item]?.classList?.add(slideRight, orderLast);
                } else if (item === min) {
                    sliderEls[item]?.classList?.add(slideLeft, orderFirst);
                } else {
                    sliderEls[item]?.classList?.add(slideLeftTwo, orderTwo);
                }
            });
            min = min === sliderEls.length - 1 ? 0 : min + 1;
            max = max === sliderEls.length - 1 ? 0 : max + 1;
        }, 3000);
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, []);

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('gallery')}>
                    {banner.map((item, index) => (
                        <img
                            key={item.encodeId}
                            src={item.banner}
                            onClick={() => handleClickBanner(item)}
                            className={`gallery-item ${index <= 2 ? 'block' : 'hidden'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;
