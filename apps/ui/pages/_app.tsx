import type { AppProps } from 'next/app';
import React from 'react';
import { Workbox } from 'workbox-window';

export default function MyApp({ Component, pageProps }: AppProps) {
    const isProduction = process.env.NODE_ENV === 'production';
    React.useEffect(() => {
        if (isProduction && 'serviceWorker' in navigator) {
            // check your path, this is just an example
            const wb = new Workbox('../../../../service-worker.js');
            wb.register();
        }
    }, []);
    return <Component {...pageProps} />;
}
