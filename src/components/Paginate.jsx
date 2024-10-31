import React from "react";

export default function Paginate({ total, currentPage, setPage }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="list-style-none flex">
                {total > 0 && (
                    <li className="bg-white mx-2 h-9 w-9 flex items-center justify-center rounded">
                        <button
                            className="relative block rounded bg-transparent text-base text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                            onClick={() => setPage(currentPage <= 1 ? 1 : currentPage - 1)}
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                )}
                {Array.from({ length: total }).map((_, index) => (
                    <li key={index} className="bg-white mx-2 h-9 w-9 flex items-center justify-center rounded">
                        <button
                            onClick={() => setPage(index + 1)}
                            className={`relative block rounded bg-transparent text-base text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${
                                currentPage === index + 1 ? "bg-neutral-100 dark:bg-neutral-700 font-semibold text-primary dark:text-white" : ""
                            }`}
                            aria-label="Page 1">
                            {index + 1}
                        </button>
                    </li>
                ))}
                {total > 0 && (
                    <li className="bg-white mx-2 h-9 w-9 flex items-center justify-center rounded">
                        <button
                            onClick={() => setPage(currentPage >= total ? total : currentPage + 1)}
                            className="relative block rounded bg-transparent text-base text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                            aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
