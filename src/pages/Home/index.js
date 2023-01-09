import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Livestream from '~/components/Livestream';
import NewRelease from '~/components/NewRelease';
import Playlist from '~/components/Playlist';
import Slider from '~/components/Slider';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const { playlist } = useSelector((state) => state.app);
    const firstPlaylist = playlist[0];
    const secondPlaylist = playlist.find((item) => item?.title === 'Nghệ sĩ thịnh hành 🔥 ');
    const thirdPlaylist = playlist[2];
    const fourth = playlist.find((item) => item?.title === 'Top 100');
    const fifth = playlist.find((item) => item?.title === "XONE's CORNER");

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Slider />
                <Playlist songs={firstPlaylist} />
                <NewRelease />
                <Playlist songs={secondPlaylist} isArtistCollection={true} />
                <Livestream />
                <Playlist songs={thirdPlaylist} />
                <Livestream isArtistSlide={true} />
                <Playlist songs={fourth} />
                <Playlist songs={fifth} isArtistCollection={true} />

                <div style={{ minHeight: '100px' }}></div>
            </div>
        </div>
    );
}

export default Home;
