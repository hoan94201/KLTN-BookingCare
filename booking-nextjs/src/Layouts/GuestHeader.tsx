import React from 'react';
import Image from 'next/image';

type Props = {};

export default function GuestHeader({}: Props) {
    return (
        <>
            <div className="bg-[#EDFFFA] pb-5 w-full flex justify-center">
                <div className="z-10  max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
                    <div className="fixed left-0 top-0 flex gap-6 lg:static lg:w-auto  lg:rounded-xl   lg:p-4 ">
                        <span className="lg:border lg:bg-gray-200 px-4 py-2 rounded-md">Chuyên Khoa</span>
                        <span className="lg:border lg:bg-gray-200 px-4 py-2 rounded-md">Cơ sở y tế</span>
                        <span className="lg:border lg:bg-gray-200 px-4 py-2 rounded-md">Sống khoẻ</span>
                        <span className="lg:border lg:bg-gray-200 px-4 py-2 rounded-md">Top bác sĩ</span>
                    </div>
                    <div className="fixed gap-4 items-center bottom-0 left-0 flex h-48 w-full  justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                        <a
                            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="https://res.cloudinary.com/dl0wt2mgx/image/upload/v1700109307/Screen_Shot_2023-11-16_at_11.28.22_rmtjxe.png"
                                alt="Vercel Logo"
                                className="dark:invert"
                                width={100}
                                height={54}
                                priority
                            />
                        </a>
                        <div className="flex items-center justify-center flex-col">
                            <div className="w-[26px] h-[26px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#45C3D3"
                                        d="M12 24c-3.067 0-5.739-1.017-8.017-3.05C1.706 18.917.4 16.378.067 13.333H2.8c.311 2.311 1.339 4.223 3.083 5.734 1.745 1.51 3.784 2.266 6.117 2.266 2.6 0 4.806-.905 6.617-2.716 1.81-1.811 2.716-4.017 2.716-6.617 0-2.6-.905-4.806-2.716-6.617C16.806 3.573 14.6 2.667 12 2.667a9 9 0 0 0-4.3 1.066 9.909 9.909 0 0 0-3.367 2.934H8v2.666H0v-8h2.667v3.134a11.642 11.642 0 0 1 4.15-3.3A11.908 11.908 0 0 1 12 0c1.667 0 3.228.317 4.683.95a12.196 12.196 0 0 1 3.8 2.567 12.196 12.196 0 0 1 2.567 3.8c.633 1.455.95 3.016.95 4.683 0 1.667-.317 3.228-.95 4.683a12.195 12.195 0 0 1-2.567 3.8 12.195 12.195 0 0 1-3.8 2.567c-1.455.633-3.016.95-4.683.95Zm3.733-6.4-5.066-5.067v-7.2h2.666v6.134l4.267 4.266-1.867 1.867Z"
                                    ></path>
                                </svg>
                            </div>
                            <span>Lịch hẹn</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <div className="w-[26px] h-[26px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    fill="#969495"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 27 24"
                                >
                                    <path
                                        fill="#45C3D2"
                                        d="M12 24v-2.667h10.667v-9.466c0-2.6-.906-4.806-2.717-6.617s-4.017-2.717-6.617-2.717c-2.6 0-4.805.906-6.616 2.717S4 9.267 4 11.867V20H2.667a2.568 2.568 0 0 1-1.884-.783A2.568 2.568 0 0 1 0 17.333v-2.666c0-.467.117-.906.35-1.317a2.61 2.61 0 0 1 .983-.983l.1-1.767A11.54 11.54 0 0 1 2.75 6.4a12.635 12.635 0 0 1 2.633-3.367A11.698 11.698 0 0 1 9.017.8c1.366-.533 2.805-.8 4.316-.8 1.511 0 2.945.267 4.3.8a12.136 12.136 0 0 1 3.634 2.217 11.967 11.967 0 0 1 2.633 3.35 12.237 12.237 0 0 1 1.333 4.2l.1 1.733c.423.2.75.5.984.9.233.4.35.822.35 1.267v3.066c0 .445-.117.867-.35 1.267-.234.4-.561.7-.984.9v1.633c0 .734-.26 1.361-.783 1.884a2.568 2.568 0 0 1-1.883.783H12Zm-2.667-9.333a1.29 1.29 0 0 1-.95-.384 1.29 1.29 0 0 1-.383-.95c0-.377.128-.694.383-.95a1.29 1.29 0 0 1 .95-.383c.378 0 .695.128.95.383.256.256.384.573.384.95 0 .378-.128.695-.384.95a1.29 1.29 0 0 1-.95.384Zm8 0a1.29 1.29 0 0 1-.95-.384 1.29 1.29 0 0 1-.383-.95c0-.377.128-.694.383-.95a1.29 1.29 0 0 1 .95-.383c.378 0 .695.128.95.383.256.256.384.573.384.95 0 .378-.128.695-.384.95a1.29 1.29 0 0 1-.95.384ZM5.367 12.6c-.156-2.356.555-4.378 2.133-6.067C9.078 4.844 11.044 4 13.4 4c1.978 0 3.717.628 5.217 1.883 1.5 1.256 2.405 2.861 2.716 4.817a10.527 10.527 0 0 1-5.583-1.633C14.05 8 12.744 6.556 11.833 4.733a10.635 10.635 0 0 1-2.25 4.75A10.658 10.658 0 0 1 5.367 12.6Z"
                                    ></path>
                                </svg>
                            </div>
                            <span>Hổ trợ</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-full  pt-[10px] bg-[url(https://bookingcare.vn/assets/anh/bookingcare-cover-4.jpg)] h-[100vh] bg-no-repeat bg-cover bg-center">
                <div className="text-3xl items-center text-white drop-shadow-text mt-56"></div>

                <ul className=" absolute h-[50px] w-[70%] flex items-center text-center mx-auto bg-text bottom-[25%] left-0 right-0">
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Khám chuyên khoa </div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">khám từ xa</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Khám tổng quát</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Xét nghiệm y học</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Sức khoẻ tinh thần</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Khám nha khoa</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Gói phẩu thuật</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="mt-[14px] bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Sản phẩm y tế</div>
                    </li>
                    <li className="h-full w-full flex flex-col items-center ">
                        <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                            <img
                                className="h-[80%]"
                                src="https://cdn.bookingcare.vn/fo/2023/04/12/160542-icon-bai-test-suc-khoe.png"
                                alt=""
                            />
                        </div>
                        <div className="text-base font-bold hover:color-[#A7E4EE] ">Sức khoẻ doanh nghiệp</div>
                    </li>
                </ul>
            </div>
        </>
    );
}
