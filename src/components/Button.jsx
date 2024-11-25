const Button = ({ children, onClick, size = "sm", className, disable = false }) => {
    let sizeClass;
    switch (size) {
        case "sm":
            sizeClass = "p-2 ";
            break;
        case "2sm":
            sizeClass = "p-3";
            break;
        case "md":
            sizeClass = "p-4";
            break;
        case "lg":
            sizeClass = "p-6";
            break;
        default:
            sizeClass = "p-4";
            break;
    }

    return (
        <button
            disabled={disable}
            onClick={onClick}
            className={`${sizeClass} flex items-center justify-center text-gray-700 h-fit font-semibold rounded border border-solid border-gray-400 ${className}`}>
            {children}
        </button>
    );
};

const GroupButton = ({ children, className }) => {
    return <div className={`flex gap-4 my-auto ${className}`}>{children}</div>;
};

export { GroupButton, Button };
