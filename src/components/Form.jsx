import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ value, onChange, className, name, placeholder, size = "xl", rounded = "full" }) => {
    const [message, setMessage] = useState("");
    const [text, setText] = useState(placeholder || "Tìm kiếm cơ sở y tế");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [adding, setAdding] = useState(true);

    switch (size) {
        case "sm":
            className += " p-2 text-sm";
            break;
        case "md":
            className += " p-3 text-base";
            break;
        case "lg":
            className += " p-4 text-lg";
            break;
        case "xl":
            className += " p-5 text-xl";
            break;
        default:
            className += " p-3 text-base";
            break;
    }

    const listPlaceholders = placeholder ? [placeholder] : ["Tìm kiếm cơ sở y tế", "Tìm kiếm chuyên khoa", "Tìm kiếm bác sĩ", "Tìm kiếm gói khám"];

    useEffect(() => {
        const interval = setInterval(() => {
            setText((prev) => {
                if (adding) {
                    const newPlaceholder = listPlaceholders[index].substring(0, charIndex + 1);
                    setCharIndex(charIndex + 1);
                    if (charIndex + 1 === listPlaceholders[index].length) {
                        setTimeout(() => setAdding(false), 100);
                    }
                    return newPlaceholder;
                } else {
                    const newPlaceholder = listPlaceholders[index].substring(0, charIndex - 1);
                    setCharIndex(charIndex - 1);
                    if (charIndex - 1 === 0) {
                        setAdding(true);
                        setIndex((index + 1) % listPlaceholders.length);
                    }
                    return newPlaceholder;
                }
            });
        }, 100);

        return () => clearInterval(interval);
    }, [index, charIndex, adding]);

    return (
        <div className="relative flex pt-4 pb-1">
            <IoSearch className={`bg-white fill-gray-500 ${"rounded-l-lg " + rounded} size-auto pr-0 ${className}`} />
            <input className={`outline-none ${"rounded-r-lg " + rounded} w-full  ${className} `} type="search" name={name} placeholder={text} value={value} onChange={(e)=> onChange(e)} />
        </div>
    );
};

const Form = ({ onSubmit, children, className }) => {
    return (
        <form onSubmit={onSubmit} className={`flex flex-col gap-7 ${className}`}>
            {children}
        </form>
    );
};

const GroupInput = ({ children, className }) => {
    return <div className={`flex gap-2 flex-wrap ${className}`}>{children}</div>;
};

const GroupItem = ({ children, className }) => {
    return <div className={`flex flex-col gap-2 relative  ${className}`}>{children}</div>;
};

const Label = ({ children, className, forID }) => {
    return (
        <label htmlFor={forID} className={`text-base text-gray-700 font-medium ${className}`}>
            {children}
        </label>
    );
};

const Input = ({ id, value, onChange, onInput, onFocus, onAbort, type = "text", className, name, placeholder, maxLength, size = "md" }) => {
    switch (size) {
        case "sm":
            className += " py-2 ";
            break;
        case "md":
            className += " py-3 ";
            break;
        case "lg":
            className += " py-4 ";
            break;
        case "xl":
            className += " py-5 ";
            break;
        default:
            className += " py-3 ";
            break;
    }
    return (
        <input
            id={id}
            className={`outline-none px-4 rounded-md border border-gray-400 border-solid w-full ${className}`}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onInput={onInput}
            onFocus={onFocus}
            onAbort={onAbort}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    );
};

export { SearchInput, Input, Form, GroupInput, GroupItem, Label };
