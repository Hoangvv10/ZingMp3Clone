import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './Top100.module.scss';
import * as actions from '~/store/actions';
import * as apis from '~/apis';
import Playlist from '~/components/Playlist';

const cx = classNames.bind(styles);

function Top100() {
    const dispatch = useDispatch();

    const [top100Data, setTop100Data] = useState();
    const [highlight, setHighlight] = useState();
    const [vPop, setVpop] = useState();
    const [aPop, setAPop] = useState();
    const [usUk, setUsUk] = useState();
    const [symphony, setSymphony] = useState();

    useEffect(() => {
        dispatch(actions.getTop100());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchGetTop100 = async () => {
            const res = await apis.getTop100();
            setTop100Data(res.data.data);
        };
        fetchGetTop100();
    }, []);

    useEffect(() => {
        setHighlight(top100Data?.find((item) => item?.title === 'Nổi bật'));
        setVpop(top100Data?.find((item) => item?.title === 'Nhạc Việt Nam'));
        setAPop(top100Data?.find((item) => item?.title === 'Nhạc Châu Á'));
        setUsUk(top100Data?.find((item) => item?.title === 'Nhạc Âu Mỹ'));
        setSymphony(top100Data?.find((item) => item?.title === 'Nhạc Hòa Tấu'));
    }, [top100Data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('bg-thumb')}></div>
                <div className={cx('bg-alpha')}></div>
                <div className={cx('bg-alpha-1')}></div>

                <div className={cx('list')}>
                    <Playlist songs={highlight} />
                    <Playlist songs={vPop} num={14} />
                    <Playlist songs={aPop} />
                    <Playlist songs={usUk} num={13} />
                    <Playlist songs={symphony} num={8} />
                </div>
            </div>

            <div style={{ minHeight: '100px' }}></div>
        </div>
    );
}

export default Top100;
