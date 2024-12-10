import { useState } from "react";
import { Outlet } from "react-router-dom";

const News = () => {
    return (
        <section className="mt-32 border-b-2 border-gray-300 px-56 pt-12 bg-white">
            <main>
                <Outlet />
            </main>
        </section>
    );
};
export default News;
