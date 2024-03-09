import {Helmet} from "react-helmet";
import React from "react";

function DashboardPage() {
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <h1 className="text-center text-2xl font-bold mb-4">Welcome Admin!</h1>
            <h2 className="text-center text-xl mb-4">Here you can manage your own posts</h2>
        </>
    );
}

export default DashboardPage
