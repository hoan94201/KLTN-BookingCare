'use client';
import { Fragment, ReactNode, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    IdentificationIcon,
    CalendarDaysIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    ClipboardIcon ,
    ClipboardDocumentIcon

,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import NoImg from '@/components/images/no-user-image.gif';
import { pageRouters } from '@/components/constants/router';
import { StatusComponent } from '@/components/constants/enum';

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];
type Props = {
    children: ReactNode;
};

export default function Header({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();

    const ADMIN_ROLE = [
        {
            name: 'Trang chủ',
            href: pageRouters.DASHBOARD,
            icon: HomeIcon,
            current: pageRouters.DASHBOARD === pathname,
        },
        {
            name: 'Người dùng',
            icon: UsersIcon,
            current: pathname.startsWith('/system') && pathname !== pageRouters.DASHBOARD,
            children: [
                {
                    name: 'Quản lí người dùng',
                    href: pageRouters.MANAGER_USER,
                    current: pageRouters.MANAGER_USER === pathname,
                },
                {
                    name: 'Quản lí tài khoản',
                    href: pageRouters.MANAGER_ACCOUNT,
                    current: pageRouters.MANAGER_ACCOUNT === pathname,
                },
                {
                    name: 'Quản lí bác sĩ',
                    href: pageRouters.MANAGER_DOCTOR,
                    current: pageRouters.MANAGER_DOCTOR === pathname,
                },
                {
                    name: 'Quản lí kế hoạch khám bệnh',
                    href: pageRouters.MANAGER_SCHEDULE,
                    current: pageRouters.MANAGER_SCHEDULE === pathname,
                },
                { name: 'Quản lí lịch khám bệnh', href: pageRouters.MANAGER_CALENDAR },
            ],
        },
        {
            name: 'Phòng khám',
            icon: FolderIcon,
            current: pageRouters.MANAGER_CLINIC === pathname,
            children: [{ name: 'Quản lí phòng khám', href: pageRouters.MANAGER_CLINIC }],
        },
        {
            name: 'Chuyên khoa',
            href: '#',
            icon: CalendarIcon,
            current: pageRouters.MANAGER_SPECIAL === pathname,
            children: [{ name: 'Quản lí Chuyên khoa', href: pageRouters.MANAGER_SPECIAL }],
        },
        {
            name: 'Cẩm nang',
            href: '#',
            icon: DocumentDuplicateIcon,
            current: pageRouters.MANAGER_BLOG === pathname,
            children: [{ name: 'Quản lí Cẩm nang', href: pageRouters.MANAGER_BLOG }],
        },
        { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
    ];

    const DOCTOR_ROLE = [
        {
            name: 'Trang chủ',
            href: pageRouters.MY_DASHBOAD,
            icon: HomeIcon,
            current: pageRouters.MY_DASHBOAD === pathname,
        },
        {
            name: 'Thông Tin',
            href: '#',
            icon: IdentificationIcon,
            current: false,
            children: [
                {
                    name: 'Lý lịch bác sĩ',
                    href: pageRouters.MY_DOCTOR,
                    current: pageRouters.MY_DOCTOR === pathname,
                },
            ],
        },
        {
            name: 'Kế hoạch khám',
            href: pageRouters.MY_SCHEDULE,
            icon: CalendarDaysIcon,
            current: pageRouters.MY_SCHEDULE === pathname,
        },
        {
            name: 'Danh sách khám',
            href: pageRouters.MY_PATIENT,
            icon: ClipboardIcon,
            current: pageRouters.MY_PATIENT === pathname,
        },
        {
            name: 'Lịch sử khám',
            href: pageRouters.MANAGER_HISTORY,
            icon: ClipboardDocumentIcon,
            current: pageRouters.MANAGER_HISTORY === pathname,
        },
    ];

    const navigation = session?.user.roleId === StatusComponent.ADMIN ? ADMIN_ROLE : DOCTOR_ROLE;
    const userNavigation = [
        { name: 'Your profile', href: `${pageRouters.PROFILE}` },
        { name: 'Your Blogs', href: `${pageRouters.BLOGS}` },
    ];
    const handleLogout = async () => {
        const data = await signOut();
    };
    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-14 w-auto"
                                                src="https://res.cloudinary.com/dl0wt2mgx/image/upload/v1700109307/Screen_Shot_2023-11-16_at_11.28.22_rmtjxe.png"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="!list-none" className="flex flex-1 flex-col gap-y-7">
                                                <li className="lis">
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li className="!list-none" key={item.name}>
                                                                {!item.children ? (
                                                                    <Link
                                                                        href={item.href}
                                                                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 ${
                                                                            item.current
                                                                                ? 'bg-gray-50'
                                                                                : 'hover:bg-gray-50'
                                                                        }`}
                                                                    >
                                                                        <item.icon
                                                                            className="h-6 w-6 shrink-0 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                        {item.name}
                                                                    </Link>
                                                                ) : (
                                                                    <Disclosure as="div">
                                                                        {({ open }) => (
                                                                            <>
                                                                                <Disclosure.Button
                                                                                    className={`
                                                                                            flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700 ${
                                                                                                item.current
                                                                                                    ? 'bg-gray-50'
                                                                                                    : 'hover:bg-gray-50'
                                                                                            }`}
                                                                                >
                                                                                    <item.icon
                                                                                        className="h-6 w-6 shrink-0 text-gray-400"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    {item.name}
                                                                                    <ChevronRightIcon
                                                                                        className={`
                                                                                                ml-auto h-5 w-5 shrink-0 ${
                                                                                                    open
                                                                                                        ? 'rotate-90 text-gray-500'
                                                                                                        : 'text-gray-400'
                                                                                                }`}
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </Disclosure.Button>
                                                                                <Disclosure.Panel
                                                                                    as="ul"
                                                                                    className="mt-1 px-2"
                                                                                >
                                                                                    {item.children.map(
                                                                                        (subItem: any) => (
                                                                                            <li key={subItem.name}>
                                                                                                {/* 44px */}
                                                                                                <Link
                                                                                                    href={subItem.href}
                                                                                                    className={`
                                                                                                            block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 ${
                                                                                                                subItem.current
                                                                                                                    ? 'bg-gray-50'
                                                                                                                    : 'hover:bg-gray-50'
                                                                                                            }`}
                                                                                                >
                                                                                                    {subItem.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ),
                                                                                    )}
                                                                                </Disclosure.Panel>
                                                                            </>
                                                                        )}
                                                                    </Disclosure>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className="text-xs font-semibold leading-6 text-gray-400">
                                                        Your teams
                                                    </div>
                                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                        {teams.map((team) => (
                                                            <li key={team.name}>
                                                                <Link
                                                                    href={team.href}
                                                                    className={`
                                                                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                                                            team.current
                                                                                ? 'bg-gray-800 text-white'
                                                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                        }`}
                                                                >
                                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                        {team.initial}
                                                                    </span>
                                                                    <span className="truncate">{team.name}</span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    <Link
                                                        href="#"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    >
                                                        <Cog6ToothIcon
                                                            className="h-6 w-6 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        Settings
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-14 w-auto"
                                src="https://res.cloudinary.com/dl0wt2mgx/image/upload/v1700109307/Screen_Shot_2023-11-16_at_11.28.22_rmtjxe.png"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li className="!list-none">
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li className="!list-none" key={item.name}>
                                                    {!item.children ? (
                                                        <Link
                                                            href={item.href}
                                                            className={`
                                                                group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-300 ${
                                                                    item.current
                                                                        ? 'bg-gray-600 !text-white'
                                                                        : 'hover:bg-gray-600 hover:text-white'
                                                                }`}
                                                        >
                                                            <item.icon
                                                                className="h-6 w-6 shrink-0"
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    ) : (
                                                        <Disclosure as="div">
                                                            {({ open }) => (
                                                                <>
                                                                    <Disclosure.Button
                                                                        className={`flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-300 ${
                                                                            item.current
                                                                                ? 'bg-gray-600 !text-white'
                                                                                : 'hover:bg-gray-600 hover:text-white'
                                                                        }`}
                                                                    >
                                                                        <item.icon
                                                                            className="h-6 w-6 shrink-0 "
                                                                            aria-hidden="true"
                                                                        />
                                                                        {item.name}
                                                                        <ChevronRightIcon
                                                                            className={` ml-auto h-5 w-5 shrink-0 ${
                                                                                open
                                                                                    ? 'rotate-90 text-gray-300'
                                                                                    : 'text-gray-300'
                                                                            }`}
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Disclosure.Button>
                                                                    <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                        {item.children.map((subItem: any) => (
                                                                            <li
                                                                                className="!list-none"
                                                                                key={subItem.name}
                                                                            >
                                                                                {/* 44px */}
                                                                                <Link
                                                                                    href={subItem.href}
                                                                                    className={`block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-300 ${
                                                                                        subItem?.current
                                                                                            ? 'bg-gray-600 !text-white'
                                                                                            : 'hover:bg-gray-600 hover:text-white'
                                                                                    }`}
                                                                                >
                                                                                    {subItem.name}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <Link
                                            href="#"
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                        >
                                            <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            Settings
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form className="relative flex flex-1" action="#" method="GET">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Separator */}
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src={session?.user.image ? session?.user.image : NoImg}
                                            alt=""
                                            width={500}
                                            height={500}
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                                aria-hidden="true"
                                            >
                                                {session?.user.firstName} {session?.user.lastName}
                                            </span>
                                            <ChevronDownIcon
                                                className="ml-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <Link
                                                            href={item.href}
                                                            className={` hover:bg-slate-400
                                                                block px-3 py-1 text-sm leading-6 text-gray-900 ${
                                                                    active ? 'bg-gray-50' : ''
                                                                }`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            <button
                                                onClick={() => handleLogout()}
                                                className={` hover:bg-slate-400 w-full text-start
                                                                block px-3 py-1 text-sm leading-6 text-gray-900`}
                                            >
                                                Sign Out
                                            </button>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-2 sm:px-2 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
