import React from 'react';
import {Helmet} from "react-helmet";

function NotFound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl">Page Not Found</p>
            </div>
        </>
    );
}

export default NotFound;
