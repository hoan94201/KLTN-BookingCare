import React from 'react';

type Props = {
    totalPage: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    isPage: number;
};

export default function Pagination({ totalPage, handleNextPage, handlePrevPage, isPage }: Props) {
    return (
        <div>
            {' '}
            <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white  py-3 "
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{isPage * 10 + 1}</span> to{' '}
                        <span className="font-medium">{(isPage + 1) * 10}</span> of{' '}
                        <span className="font-medium">{10 * totalPage}</span> results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <button
                        disabled={isPage === 0}
                        onClick={handlePrevPage}
                        className="relative disabled:opacity-40 hover:opacity-70 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Previous
                    </button>
                    <button
                        disabled={totalPage === isPage + 1 || totalPage === 0 }
                        onClick={handleNextPage}
                        className="relative disabled:opacity-40 hover:opacity-70 ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Next
                    </button>
                </div>
            </nav>
        </div>
    );
}
