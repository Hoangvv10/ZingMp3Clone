import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './Livestream.module.scss';

const cx = classNames.bind(styles);

function Livestream({ isArtistSlide = false }) {
    const slideEl = isArtistSlide ? 'js-artist' : 'js-item';
    const sliderItems = document.getElementsByClassName(slideEl);
    const slideOndisplay = sliderItems.length - 7;

    const defaultArtist = [
        {
            name: 'Trịnh Thăng Bình',
            link: '/Trinh-thang-binh',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/trinh-thanh-binh.png',
        },
        {
            name: 'mr-siro',
            link: '/mr-siro',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/mr-siro.png',
        },
        {
            name: 'karik',
            link: '/karik',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png',
        },
        {
            name: 'justatee',
            link: '/justatee',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/justatee.png',
        },
        {
            name: 'Only C',
            link: '/onlyc',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/onlyc.png',
        },
        {
            name: 'jack',
            link: '/jack',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/jack.png',
        },
        {
            name: 'huong-ly',
            link: '/huong-ly',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/huong-ly.png',
        },
        {
            name: 'hoa-minzy',
            link: '/hoa-minzy',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/hoa-minzy.png',
        },
        {
            name: 'erik',
            link: '/erik',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png',
        },
        {
            name: 'duc-phuc',
            link: '/duc-phuc',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/duc-phuc.png',
        },
        {
            name: 'chi-dan',
            link: '/chi-dan',
            thumbnail: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/chi-dan.png',
        },
    ];

    const navigate = useNavigate();

    const slideRight = cx('slide-right');
    const slideLeft = cx('slide-left');
    const disBlock = cx('dis-block');
    const disNone = cx('dis-none');

    const { livestream } = useSelector((state) => state.app);

    const handleControlPrev = () => {
        for (let i = 0; i < 7; i++) {
            sliderItems[i]?.classList.remove(disNone);
            sliderItems[i]?.classList.add(disBlock);
            sliderItems[i]?.classList.remove(slideLeft);
            sliderItems[i]?.classList.add(slideRight);
        }
        for (let x = 7; x <= sliderItems.length; x++) {
            sliderItems[x]?.classList.add(disNone);
        }
    };

    const handleControlNext = () => {
        for (let i = 0; i < slideOndisplay; i++) {
            sliderItems[i]?.classList.add(disNone);
        }
        for (let x = slideOndisplay; x <= sliderItems.length; x++) {
            sliderItems[x]?.classList.remove(slideRight);
            sliderItems[x]?.classList.add(slideLeft);
            sliderItems[x]?.classList.add(disBlock);
            sliderItems[x]?.classList.remove(disNone);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {!isArtistSlide && <div className={cx('header')}>Radio nổi bật</div>}
                <div className={cx('slider')}>
                    {isArtistSlide
                        ? defaultArtist.map((item, index) => (
                              <div
                                  onClick={() => navigate(item.link)}
                                  key={index}
                                  className={cx({
                                      item: true,
                                      'js-artist': true,
                                      higher: index >= 7,
                                  })}
                              >
                                  <div className={cx('artist-thumb')}>
                                      <div className={cx('thumb')}>
                                          <img src={item?.thumbnail} className={cx('item-img')} />
                                      </div>
                                  </div>
                              </div>
                          ))
                        : livestream?.map((item, index) => (
                              <div
                                  key={index}
                                  className={cx({
                                      item: true,
                                      'js-item': true,
                                      higher: index >= 7,
                                  })}
                              >
                                  <div className={cx('item-thumb')}>
                                      <div className={cx('thumb')}>
                                          <img
                                              src={item?.program?.thumbnail}
                                              className={cx('item-img')}
                                              alt="radio-img"
                                          />
                                          <div className={cx('song-hover')}>
                                              <FontAwesomeIcon icon={faPlay} />
                                          </div>
                                      </div>
                                  </div>
                                  <img src={item?.thumbnail} className={cx('host-img')} alt="host-img" />
                                  <img
                                      src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/live-tag.svg"
                                      className={cx('live-tag')}
                                      alt="live-img"
                                  />

                                  <div className={cx('item-info')}>
                                      <div className={cx('title')}>{item?.host?.name}</div>
                                      <div className={cx('active-user')}>{item?.activeUsers} đang nghe</div>
                                  </div>
                              </div>
                          ))}

                    <div className={cx('control-prev')} onClick={handleControlPrev}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div className={cx('control-next')} onClick={handleControlNext}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Livestream;
