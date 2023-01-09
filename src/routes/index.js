import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Album from '~/pages/Album';
import Artist from '~/pages/Artist';
import NewChart from '~/pages/NewChart';
import Top100 from '~/pages/Top100';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/follow', component: Following },
    { path: '/album/:title/:pid' || '/playlist/:title/:pid', component: Album },
    { path: '/playlist/:title/:pid', component: Album },
    { path: '/:name', component: Artist },
    { path: '/:nghe-si/:name', component: Artist },
    { path: '/moi-phat-hanh', component: NewChart },
    { path: '/top100', component: Top100 },
];

export const privateRoutes = [];
