const List = ({ children, className }) => {
    return <ul className={`p-4 shadow-md absolute top-full w-fit translate-y-1 left-0 bg-white rounded min-w-52 transition-all ${className}`}>{children}</ul>;
};

const Item = ({ children, className }) => {
    return <li className={`p-2 rounded-md hover:bg-gray-200/90 md:cursor-pointer transition-all whitespace-nowrap ${className}`}>{children}</li>;
};

export { List, Item };
