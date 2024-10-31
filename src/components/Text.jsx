const Heading1 = ({ children, className }) => <h1 className={`text-4xl py-1 text-gray-700 font-semibold ${className}`}>{children}</h1>;
const Heading2 = ({ children, className }) => <h2 className={`text-3xl py-1 text-gray-700 font-semibold ${className}`}>{children}</h2>;
const Heading3 = ({ children, className }) => <h3 className={`text-2xl py-1 text-gray-700 font-semibold ${className}`}>{children}</h3>;
const Heading4 = ({ children, className }) => <h4 className={`text-xl py-1 text-gray-700 font-semibold ${className}`}>{children}</h4>;
const Heading5 = ({ children, className }) => <h5 className={`text-lg py-1 text-gray-700 font-semibold ${className}`}>{children}</h5>;
const Heading6 = ({ children, className }) => <h6 className={`text-base py-1 text-gray-700 font-semibold ${className}`}>{children}</h6>;
const Heading7 = ({ children, className }) => <h6 className={`text-sm py-1 text-gray-700 font-semibold ${className}`}>{children}</h6>;
const Heading8 = ({ children, className }) => <h6 className={`text-xs py-1 text-gray-700 font-semibold ${className}`}>{children}</h6>;
const Paragraph = ({ children, className }) => <p className={`text-base font-normal ${className}`}>{children}</p>;
const Span = ({ children, className }) => <span className={`size-auto ${className}`}>{children}</span>;
const Link = ({ children, className, href }) => (
    <a href={href} className={`size-auto md:cursor-pointer ${className}`}>
        {children}
    </a>
);
export { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Heading7, Heading8, Paragraph, Span, Link };
