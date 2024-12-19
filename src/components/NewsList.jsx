import { Heading1, Heading3, Heading4, Heading5, Link, Span } from "./Text";
import { Button } from "./Button";
import { getData } from "../utils/fetchData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NewsItem = ({ newsItem, className }) => {
    return (
        <Link href={newsItem.link}>
            <div className={`bg-white rounded-md p-4 h-full flex flex-col justify-between  ${className ? className : ""} `}>
                <div className="h-full w-full flex items-center">
                    <img src={newsItem.image_url} alt={newsItem.title} className="rounded" />
                </div>
                <div>
                    <Heading5>{newsItem.title}</Heading5>
                    <Span className="text-gray-600">{newsItem.description}</Span>
                </div>
            </div>
        </Link>
    );
};

const NewsList = () => {
    const [topNews, setTopNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData("/get-top-news?limit=6");
                if (!response.isSuccess) {
                    throw new Error(response.message);
                }
                //set the first news
                setTopNews(response.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="px-32 flex flex-col items-center gap-8 mb-8">
            <Heading1 className="text-center text-primary font-extrabold">Tin tức y khoa</Heading1>
            <div className="grid grid-cols-3 grid-rows-2 gap-8 ">
                {topNews.map((newsItem, index) => (
                    <NewsItem key={index} newsItem={newsItem} />
                ))}
            </div>
            <Button onClick={()=> navigate("/tin-tuc/tin-dich-vu")} size="md" className="bg-orange-100 px-16 rounded-full font-semibold text-white hover:bg-orange-200 transition-all">
                Xem thêm
            </Button>
        </div>
    );
};

export default NewsList;
