import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDebounced } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import AcountItem from '../AcountItem';
import * as apis from '~/apis';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const clearLoading = useRef();

    const debounced = useDebounced(searchValue, 500);

    useEffect(() => {
        const fetchSearchData = async () => {
            const res = await apis.getSearchData(debounced);
            setSearchResult(res.data.data);
        };
        fetchSearchData();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
    };

    const inputRef = useRef();

    const hideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('tippy')}>
            <Tippy
                interactive
                visible={showResult}
                render={(attrs) => (
                    <PopperWrapper>
                        <div className="search-result" tabIndex="-1" {...attrs}>
                            <header className={cx('artist-header')}>
                                <p>Bài hát</p>
                                <button className={cx('result-clear')}>Xóa</button>
                            </header>
                            <div className={cx('artist-body')}>
                                <AcountItem data={searchResult.songs} />
                            </div>
                        </div>
                        <div className="search-result" tabIndex="-1" {...attrs}>
                            <header className={cx('artist-header')}>
                                <p>Nghệ sĩ</p>
                                <button className={cx('result-clear')}>Xóa</button>
                            </header>
                            <div className={cx('artist-body')}>
                                <AcountItem data={searchResult.artists} />
                            </div>
                        </div>
                    </PopperWrapper>
                )}
                onClickOutside={hideResult}
            >
                <form className={cx('search')}>
                    <span className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className={cx('search-input')}
                        placeholder="Tìm kiếm bài hát và nghệ sĩ..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!debounced && !loading && (
                        <button onClick={handleClear} className={cx('clear')}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                </form>
            </Tippy>
        </div>
    );
}

export default Search;
