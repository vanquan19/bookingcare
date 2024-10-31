import { CiCalendar, CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { Heading3, Heading5, Heading6, Paragraph } from "./Text";
import { LuMoveRight } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";

const ListTopNewsCard = ({ top3News, url, firstNews }) => {
    return (
        <div className="grid grid-cols-2 w-3/5 gap-x-4 gap-y-8">
            <MainNewsCard news={firstNews} url={url} />
            {top3News && top3News.map((news, index) => <SecondNewsCard key={index} news={news} url={url} index={index} />)}
        </div>
    );
};

const MainNewsCard = ({ news, url }) => {
    return (
        <a href={`${url[news.from]}?id=${news.id}`} className="col-span-2">
            <section className="flex gap-2 flex-col group">
                <img src={news.image} alt={news.title} className="w-full rounded-md max-h-96 h-full" />
                <Heading3 className="group-hover:text-primary transotion-all">{news.title}</Heading3>
                <Paragraph className="text-justify line-clamp-4">{news.shortDescription}</Paragraph>
                <div className="flex items-center gap-1">
                    <CiCalendar className="size-5" />
                    <span className="font-semibold">
                        {news.timestamp} - {news.author}
                    </span>
                </div>
            </section>
        </a>
    );
};

const SecondNewsCard = ({ news, url, index }) => {
    return (
        <section key={index} className=" col-span-1 relative w-full rounded-md overflow-hidden">
            <a href={`${url[news.from]}?id=${news.id}`}>
                <img src={news.image} alt={news.title} className="w-full" />
                <div className="absolute bottom-0 p-2">
                    <div className="flex gap-1 items-center">
                        <GoDotFill className="fill-yellow-500" />
                        <span className="text-white font-semibold text-sm">{news.from}</span>
                    </div>
                    <Heading6 className="text-white line-clamp-2">{news.title}</Heading6>
                    <Paragraph className="text-white line-clamp-2 text-sm">{news.shortDescription}</Paragraph>
                    <button className=" flex items-center gap-2 ">
                        <span className="text-primary text-base">Xem thêm</span> <LuMoveRight className="stroke-primary size-6 mt-1" />
                    </button>
                </div>
            </a>
        </section>
    );
};

const TopNewsCard = ({ news, key, index, url }) => {
    return (
        <div className="flex gap-4 group md:cursor-pointer">
            <img src={news.image} alt={news.title} className="rounded-md w-2/5" />
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <GoDotFill className="fill-yellow-500" />
                    <span>{news.from}</span>
                </div>
                <Heading6 className="line-clamp-2 group-hover:text-primary transition-all">{news.title}</Heading6>
                <div className="flex items-center gap-1">
                    <CiCalendar className="fill-gray-900" />
                    <span className="font-medium text-gray-600">{news.timestamp}</span>
                </div>
            </div>
        </div>
    );
};

const OtherNewsCard = ({ news, url, key, index, handleScroll }) => {
    return (
        <section key={index} className="relative w-full rounded-md overflow-hidden border-2 border-transparent bg-white min-w-60  hover:border-primary transition-all group">
            <a href={`${url[news.from]}?id=${news.id}`}>
                <img src={news.image} alt={news.title} className="w-full" />
                <div className="bottom-0 p-2">
                    <div className="flex gap-1 items-center">
                        <GoDotFill className="fill-yellow-500" />
                        <span className=" font-semibold text-gray-600 text-sm">{news.from}</span>
                    </div>
                    <Heading6 className=" line-clamp-2 group-hover:text-primary transition-all">{news.title}</Heading6>
                    <Paragraph className=" line-clamp-2 text-sm">{news.shortDescription}</Paragraph>
                    <button className=" flex items-center gap-2 ">
                        <span className="text-primary text-base">Xem thêm</span> <LuMoveRight className="stroke-primary size-6 mt-1" />
                    </button>
                </div>
            </a>
        </section>
    );
};

const ListOtherNewsCard = ({ listNewsService, url }) => {
    const handleScroll = (e) => {
        const container = document.getElementById("scroll-container");
        const scroll = container.scrollLeft;
        const width = container.clientWidth;
        if (e.currentTarget.ariaLabel === "scroll_left") {
            container.scrollTo({ left: scroll - width, behavior: "smooth" });
        } else {
            container.scrollTo({ left: scroll + width, behavior: "smooth" });
        }
    };
    useEffect(() => {
        const scrollContainer = document.getElementById("scroll-container");
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }, []);

    return (
        <>
            <button onClick={handleScroll} aria-label="scroll_left" className="absolute -left-6 flex justify-between z-20 top-1/2 -translate-y-1/2">
                <CiCircleChevLeft className="size-12 fill-gray-400 hover:fill-primary transition-all" />
            </button>
            <button onClick={handleScroll} aria-label="scroll_right" className="absolute -right-6 flex justify-between z-20 top-1/2 -translate-y-1/2">
                <CiCircleChevRight className="size-12 fill-gray-400 hover:fill-primary transition-all" />
            </button>
            <div id="scroll-container" className="flex gap-4 overflow-x-scroll relative no-scrollbar scroll-smooth">
                {listNewsService.map((news, index) => (
                    <OtherNewsCard key={index} index={index} news={news} url={url} />
                ))}
            </div>
        </>
    );
};

export { MainNewsCard, SecondNewsCard, TopNewsCard, OtherNewsCard, ListOtherNewsCard, ListTopNewsCard };
