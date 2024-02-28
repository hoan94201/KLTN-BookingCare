import * as React from 'react';
import PrimaryButton from '../Button/PrimaryButton';

export interface IFillterProps {
    setOption: React.Dispatch<React.SetStateAction<string>>;
    setKeySearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
}

export function Fillter({ setOption, setKeySearch, handleSearch }: IFillterProps) {
    const listSearch = [
        { id: 1, value: 'DOCTOR', name: 'Bác sĩ' },
        { id: 2, value: 'ADMIN', name: 'Quản trị viên' },
        { id: 3, value: 'PATIENT', name: 'Bệnh nhân' },
        { id: 4, value: 'ALL', name: 'Tất cả' },
    ];
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div className="flex gap-2 mt-4">
            <div className="w-full max-w-[150px]">
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                    Location
                </label>
                <select
                    id="location"
                    name="location"
                    onChange={(e) => setOption(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:ring-blue-500 focus-visible:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
                    defaultValue="ALL"
                >
                    {listSearch.map((item) => {
                        return (
                            <option key={item.id} value={item.value}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="flex-grow max-w-md">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Tìm kiếm</label>
                <input
                    type="text"
                    onChange={(e) => setKeySearch(e.target.value)}
                    className="block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
                />
            </div>
            <div className="flex items-end">
                <PrimaryButton
                    onKeyDown={(e) => handleKeyDown(e)}
                    onClick={handleSearch}
                    className="!my-0 !h-10 font-bold w-20 hover:opacity-70"
                >
                    {' '}
                    Tìm kiếm{' '}
                </PrimaryButton>
            </div>
        </div>
    );
}
