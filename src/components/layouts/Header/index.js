import React, { memo } from 'react';

import { faPalette, faArrowUpFromBracket, faGear, faGem, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Action from '~/components/Action';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

function Header({ isScroll }) {
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
                    <Action title="Chức năng đang phát triển" body={<FontAwesomeIcon icon={faPalette} />} />
                    <Action title="Chức năng đang phát triển" body={<FontAwesomeIcon icon={faGem} />} />
                    <Action title="Chức năng đang phát triển" body={<FontAwesomeIcon icon={faArrowUpFromBracket} />} />
                    <Action title="Chức năng đang phát triển" body={<FontAwesomeIcon icon={faGear} />} />
                    <Action title="Chức năng đang phát triển" body={<FontAwesomeIcon icon={faUser} />} />
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
