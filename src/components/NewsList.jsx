import { Heading1, Heading3, Heading4, Heading5, Link, Span } from "./Text";
import { Button } from "./Button";
const NewsItem = ({ newsItem, itemIndex, className }) => {
    console.log(itemIndex);
    return (
        <Link href={newsItem.link} className={`${!itemIndex && "row-span-2"}`}>
            <div className={`bg-white rounded-md p-4 h-full flex flex-col justify-between  ${className ? className : ""} `}>
                <div className="h-full w-full flex items-center">
                    <img src={newsItem.image} alt={newsItem.title} className="rounded" />
                </div>
                <div>
                    <Heading5>{newsItem.title}</Heading5>
                    <Span className="text-gray-600">{newsItem.description}</Span>
                </div>
            </div>
        </Link>
    );
};

const NewsList = ({ news }) => {
    console.log(news);
    return (
        <div className="px-32 flex flex-col items-center gap-8 mb-8">
            <Heading1 className="text-center text-primary font-extrabold">Tin tức y khoa</Heading1>
            <div className="grid grid-cols-3 grid-rows-2 gap-8 first:row-span-2">
                {news.map((newsItem, index) => (
                    <NewsItem key={index} itemIndex={index} newsItem={newsItem} />
                ))}
            </div>
            <Button size="md" className="bg-orange-100 px-16 rounded-full font-semibold text-white hover:bg-orange-200 transition-all">
                Xem Thêm
            </Button>
        </div>
    );
};

export default NewsList;
