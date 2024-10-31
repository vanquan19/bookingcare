import { useState } from "react";
import { Outlet } from "react-router-dom";

const News = () => {
    const [indexPage, setIndexPage] = useState(0);
    const pages = ["Tin tức y khoa", "Tin dịch vụ", "Tin y tế", "Y học thường thức"];
    return (
        <section className="mt-32 border-b-2 border-gray-300 px-56 bg-white">
            <header>
                <ul className="flex gap-4 py-6 ">
                    {pages.map((page, index) => (
                        <li
                            key={index}
                            onClick={() => setIndexPage(index)}
                            className={`font-bold md:cursor-pointer transition-all ${index === indexPage && index !== 0 ? "text-primary" : `${index ? "text-gray-600" : "text-gray-800"}`} ${
                                index === 0 ? "text-2xl  uppercase" : "text-xl  pt-1"
                            }`}>
                            {page}
                        </li>
                    ))}
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
        </section>
    );
};
export default News;
