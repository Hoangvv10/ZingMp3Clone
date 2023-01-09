import { Fragment } from 'react';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './Action.module.scss';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Action({ title, body, style }) {
    return (
        <Fragment>
            <Tippy content={title} delay={[0, 50]} className={cx('tippy')}>
                <button style={style} className={cx('btn')}>
                    {body}
                </button>
            </Tippy>
        </Fragment>
    );
}

export default Action;
