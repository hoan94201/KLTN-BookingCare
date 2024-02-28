import React from "react";

type Props = {};

export default function Dashboard({}: Props) {
    return (
        <div>
            <div className="w-full md:p-[1rem]">
                <div className="grid xl:grid-rows-2  gap-20">
                    <div className="min-h-[40rem] grid xl:grid-cols-3 gap-4">
                        <div className="text-center p-1 md:p-8 bg-white rounded-lg border border-gray-300 shadow-md ">
                            <div className="flex items-center justify-center">
                                <h5 className="text-2.5xl font-light">Weekly Overview</h5>
                                <div className="relative cursor-pointer rounded-full transition-all duration-500 ease-linear p-1 xl:p-8 flex items-center justify-center"></div>
                            </div>
                            <div className="flex  justify-center flex-col items-stretch pt-12 relative">
                                <div>
                                    <div className="flex items-center justify-between gap-4 w-full pb-16">
                                        <span>90k</span>
                                        <div className="w-full border-2 border-dashed border-gray-300"></div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 w-full pb-16">
                                        <span>60k</span>
                                        <div className="w-full border-2 border-dashed border-gray-300"></div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 w-full pb-16">
                                        <span>30k</span>
                                        <div className="w-full border-2 border-dashed border-gray-300"></div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <span>0k</span>
                                        <div className="w-full border-2 border-dashed border-gray-300"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-around absolute top-0 left-12 right-0 bottom-0">
                                    <div className="h-[50%] relative self-end w-8  text-white text-center bg-purple-600 bg-opacity-85 rounded-2xl cursor-pointer">
                                        <span className="hidden absolute top-0 left-0 w-max bg-gray-100 text-gray-700 p-4 rounded-lg z-10">
                                            Sun / 50k
                                        </span>
                                    </div>
                                    <div className="h-[80%] relative self-end w-8  text-white text-center bg-purple-600 bg-opacity-85 rounded-2xl cursor-pointer">
                                        <span className="hidden absolute top-0 left-0 w-max bg-gray-100 text-gray-700 p-4 rounded-lg z-10">
                                            {' '}
                                            Mon / 79k
                                        </span>
                                    </div>
                                    <div className="h-[30%] relative self-end w-8  text-white text-center bg-purple-600 bg-opacity-85 rounded-2xl cursor-pointer">
                                        <span className="hidden absolute top-0 left-0 w-max bg-gray-100 text-gray-700 p-4 rounded-lg z-10">
                                            Tue / 33k
                                        </span>
                                    </div>
                                    <div className="h-[50%] relative self-end w-8  text-white text-center bg-purple-600 bg-opacity-85 rounded-2xl cursor-pointer">
                                        <span className="hidden absolute top-0 left-0 w-max bg-gray-100 text-gray-700 p-4 rounded-lg z-10">
                                            Wed / 49k
                                        </span>
                                    </div>
                                    <div className="h-[80%] relative self-end w-8  text-white text-center bg-purple-600 bg-opacity-85 rounded-2xl cursor-pointer">
                                        <span className="hidden absolute top-0 left-0 w-max bg-gray-100 text-gray-700 p-4 rounded-lg z-10">
                                            Thur / 77k
                                        </span>
                                    </div>
                                    <div className="h-[30%] relative self-end w-8  text-white text-center bg-purple-600 bg-opacity-85 rounded-2xl cursor-pointer">
                                        <span className="hidden absolute top-0 left-0 w-max bg-gray-100 text-gray-700 p-4 rounded-lg z-10">
                                            Fri / 30k
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="py-8 flex items-center justify-between gap-4">
                                <span>33%</span>
                                <p>Your sales performance is 33% 😎 better compared to last month</p>
                            </div>
                            <button className="button">Details</button>
                        </div>
                        <div className="item2 p-8 bg-white rounded-lg border border-gray-300 shadow-md text-center">
                            <div className="flex items-center justify-center">
                                <h5 className="text-2.5xl font-light">Total Earning</h5>
                                <div className="relative cursor-pointer rounded-full transition-all duration-500 ease-linear p-8 flex items-center justify-center"></div>
                            </div>
                            <div className="py-8 pb-4 flex items-center justify-between gap-4">
                                <h3 className="text-3xl font-semibold text-gray-700">$24,895</h3>

                                <span>10%</span>
                            </div>
                            <p>Compared to $84,325 last year</p>
                            <div>
                                <div className="flex items-center justify-start gap-8 pt-8">
                                    <div className="h-20 w-20 flex items-center bg-gray-100 border rounded-lg">
                                        <img
                                            className="object-contain "
                                            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/cards/logo-zipcar.png"
                                            alt="img"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h5 className="font-bold text-sm">Sum of the most recent months</h5>
                                        <span>9 , 10 , 11</span>
                                    </div>
                                    <div>
                                        <span>$24,895.65</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-8 pt-8">
                                    <div className="h-20 flex items-center w-20 bg-gray-100 border rounded-lg">
                                        <img
                                            className="object-contain"
                                            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/cards/logo-aviato.png"
                                            alt="img"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h5>Highest month</h5>
                                        <span>5 - 2023</span>
                                    </div>
                                    <div>
                                        <span>$4,895.65</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-8 pt-8">
                                    <div className="h-20 flex justify-center  w-20 bg-gray-100 border rounded-lg">
                                        <img
                                            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/cards/logo-bitbank.png"
                                            alt="img"
                                        />
                                    </div>
                                    <div className="info">
                                        <h5>From the start month </h5>
                                        <span> 19</span>
                                    </div>
                                    <div>
                                        <span>$24,895.65</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-2 gap-8">
                            <div className="p-8 bg-white rounded-lg border border-gray-300 shadow-md text-center">
                                <div className="relative cursor-pointer rounded-full transition-all duration-500 ease-linear p-8 flex items-center justify-center"></div>
                                <h5>Total Profit</h5>
                                <div className="relative">
                                    $25.6k
                                    <span>+42%</span>
                                </div>
                                <span>Weekly Profit</span>
                            </div>
                            <div className="p-8 bg-white rounded-lg border border-gray-300 shadow-md text-center">
                                <div className="relative cursor-pointer rounded-full transition-all duration-500 ease-linear p-8 flex items-center justify-center"></div>
                                <h5>Refunds</h5>
                                <div className="relative">
                                    $78
                                    <span>-15%</span>
                                </div>
                                <span>Past Month</span>
                            </div>
                            <div className="p-8 bg-white rounded-lg border border-gray-300 shadow-md text-center">
                                <div className="relative cursor-pointer rounded-full transition-all duration-500 ease-linear p-8 flex items-center justify-center"></div>
                                <h5>New Project</h5>
                                <div className="relative">
                                    $25.6k
                                    <span>+42%</span>
                                </div>
                                <span>Yearly Project</span>
                            </div>
                            <div className="p-8 bg-white rounded-lg border border-gray-300 shadow-md text-center">
                                <div className="relative cursor-pointer rounded-full transition-all duration-500 ease-linear p-8 flex items-center justify-center"></div>
                                <h5>Total Profit</h5>
                                <div className="relative">
                                    $25.6k
                                    <span>+42%</span>
                                </div>
                                <span>Last Week</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-lg border border-gray-300 shadow-md text-center h-[40rem]">
                        <table>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                    <th>ADDRESS</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr v-for="item in listData" :key="item.id">
                                <td>
                                    <div className="name">{{ item.lastName }} {{ item.firstName }}</div>
                                    <span>{{ item.email }}</span>
                                </td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.phoneNumber }}</td>
                                <td>{{ item.address }}</td>
                                <td className="status">
                                    <span> Chi tiết </span>
                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
