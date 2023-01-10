import classNames from 'classnames/bind';
import styles from './AcountItem.module.scss';
import { useDispatch } from 'react-redux';

import * as actions from '~/store/actions';
import { memo } from 'react';

const cx = classNames.bind(styles);

function AcountItem({ data }) {
    const dispatch = useDispatch();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('list')}>
                    {data?.map((item, index) => (
                        <div className={cx('item')} key={index}>
                            <div className={cx('item-thumb')}>
                                <img src={item?.thumbnailM} className={cx('item-img')} alt="item-img" />
                            </div>
                            <div className={cx('item-body')}>
                                {item?.streamingStatus ? (
                                    <>
                                        <a
                                            onClick={() => dispatch(actions.setCurSongId(item?.encodeId))}
                                            className={cx('item-title')}
                                        >
                                            {item?.name || item?.title}
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a href={item?.link.replace('.html', '')} className={cx('item-title')}>
                                            {item?.name || item?.title}
                                        </a>
                                    </>
                                )}

                                <div className={cx('item-singer')}>
                                    {item?.artistsNames || (
                                        <>
                                            {' '}
                                            <p>Nghệ sĩ</p>
                                            <span>{Math.floor(item?.totalFollow / 1000)}K quan tâm</span>{' '}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(AcountItem);
