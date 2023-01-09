import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { DefaultLayout } from './components/layouts';
import { publicRoutes } from './routes';
import * as actions from './store/actions';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getHome());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
