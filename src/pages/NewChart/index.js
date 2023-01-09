import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './NewChart.module.scss';
import * as actions from '~/store/actions';
import * as apis from '~/apis';
import Lists from '~/components/Lists';

const cx = classNames.bind(styles);

function NewChart() {
    const dispatch = useDispatch();
    const [newChart, setNewChart] = useState(null);

    useEffect(() => {
        dispatch(actions.getNewChart());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchNewChart = async () => {
            const res = await apis.getNewChart();
            setNewChart(res.data.data.items);
        };

        fetchNewChart();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('bg-thumb')}></div>
                <div className={cx('bg-alpha')}></div>
                <div className={cx('bg-alpha-1')}></div>

                <div className={cx('header')}>
                    <div className={cx('header-title')}>
                        <p>Nhạc mới</p>
                        <span className={cx('header-play')}>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    </div>
                </div>

                <div className={cx('list')}>
                    <Lists data={newChart} isChart={true} />
                </div>
            </div>
            <div style={{ minHeight: '100px' }}></div>
        </div>
    );
}

export default NewChart;
