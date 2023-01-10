import { useCallback, useEffect, useRef, useState } from 'react';
import Dashboard from '../Dashboard';
import Header from '../Header';
import Sidebar from '../Sidebar';
import SidePlayer from '../SidePlayer';

function DefaultLayout({ children }) {
    const [isScroll, setIsScroll] = useState(true);

    const handleScroll = useCallback((e) => {
        setIsScroll(e.currentTarget.scrollTop < 300);
    }, []);

    useEffect(() => {
        const container = document.querySelector('.container');
        container.addEventListener('scroll', handleScroll);
        // clean up code
        container.removeEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
            }}
        >
            <Header isScroll={isScroll} />
            <Sidebar />
            <Dashboard />
            <SidePlayer />

            <div
                className="container"
                style={{
                    marginBottom: '90px',
                    backgroundColor: '#170f23',
                    overflow: 'auto',
                    height: '100vh',
                    width: 'calc(100% - 570px)',
                }}
                onScroll={handleScroll}
            >
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
