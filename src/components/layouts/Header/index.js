import React, { memo } from 'react';

import { faPalette, faArrowUpFromBracket, faGear, faGem, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Action from '~/components/Action';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

function Header({ isScroll }) {
    console.log('header-render');
    return (
        <header
            className={cx({
                wrapper: true,
                'is-sticky': !isScroll,
            })}
        >
            <div className={cx('inner')}>
                <Search />

                <div className={cx('action')}>
                    <Action title="Chủ đề" body={<FontAwesomeIcon icon={faPalette} />} />
                    <Action title="Nâng cấp VIP" body={<FontAwesomeIcon icon={faGem} />} />
                    <Action title="Tải lên" body={<FontAwesomeIcon icon={faArrowUpFromBracket} />} />
                    <Action title="Cài đặt" body={<FontAwesomeIcon icon={faGear} />} />
                    <Action title="Đăng nhập" body={<FontAwesomeIcon icon={faUser} />} />
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
