import { useEffect, useState } from "react";
import { ListTopNewsCard, OtherNewsCard, TopNewsCard } from "../components/NewsComponents";
import { getData } from "../utils/fetchData";
import Paginate from "../components/Paginate";
const LIMIT = 18;
const NewsServicePage = () => {
    const [page, setPage] = useState(1);

    const [topNews, setTopNews] = useState([]);
    const [firstNews, setFirstNews] = useState({});
    const [news, setNews] = useState([]);
    const [totalPage, setToltalPage] = useState(0);

    const url = {
        "Tin dịch vụ": "tin-tuc",
        "Tin Y tế": "tin-tuc/tin-y-te",
        "Y học thường thức": "tin-tuc/y-hoc-thuong-thuc",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData("/get-top-news");
                if (!response.isSuccess) {
                    throw new Error(response.message);
                }
                //set the first news
                setFirstNews(response.results[0]);
                //set from the second news
                setTopNews(response.results.slice(1));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData(`/get-news?page=${page}&limit=${LIMIT}`);
                if (!response.isSuccess) {
                    throw new Error(response.message);
                }
                setToltalPage(response.totalPage);
                setNews(response.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [page]);

    console.log(news);

    return (
        <div className="flex flex-col gap-8 mb-16">
            <div className="flex gap-4 mb-8">
                <ListTopNewsCard url={url} firstNews={firstNews} />
                <div className="w-2/5">
                    <div className="flex flex-col gap-4">
                        {topNews.map((news, index) => (
                            <>
                                <TopNewsCard key={index} index={index} news={news} />
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
                {news.map((news, index) => (
                    <OtherNewsCard key={index} news={news} url={url} />
                ))}
            </div>

            <Paginate total={totalPage} currentPage={page} setPage={setPage} />
        </div>
    );
};
export default NewsServicePage;
