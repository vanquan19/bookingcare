import { FaStar, FaStarHalf } from "react-icons/fa";

export const Star = ({ star }) => {
    return (
        <div className="my-2 relative max-w-fit">
            <div className="flex gap-1 max-w-fit">
                <FaStar className="size-5 fill-gray-200" />
                <FaStar className="size-5 fill-gray-200" />
                <FaStar className="size-5 fill-gray-200" />
                <FaStar className="size-5 fill-gray-200" />
                <FaStar className="size-5 fill-gray-200" />
            </div>
            {star ? (
                <div className="flex gap-1 max-w-fit overflow-hidden absolute top-0 left-0">
                    {Array(Math.floor(star))
                        .fill()
                        .map((_, index) => (
                            <FaStar key={index} className="size-5 fill-yellow-500" />
                        ))}
                    {star - Math.floor(star) >= 0.5 && <FaStarHalf className="size-5 fill-yellow-500" />}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
