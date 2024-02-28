import React from "react";
import Image from "next/image";

import Status from "../Status";
import { UserList } from "@/interfaces/common";
import NoImg from "@/components/images/no-user-image.gif";
import Position from "../Position";
import { formatDateTime } from "@/utils";
import { pageRouters } from "@/components/constants/router";
import Link from "next/link";


type Props = {
    listUsers: UserList[];
    handleDeleteUser: (id: number) => void;
};

export default function Table({ listUsers, handleDeleteUser }: Props) {
    return (
        <div className="">
            <div className="mt-3 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Địa chỉ
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Create at
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {listUsers.map((person) => (
                                    <tr key={person.email}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <Image
                                                        className="h-11 w-11 rounded-full"
                                                        src={person && person.image ? person.image : NoImg}
                                                        alt=""
                                                        height={500}
                                                        width={500}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">
                                                        {person.lastName} {person.firstName}
                                                    </div>
                                                    <div className="mt-1 text-gray-500">{person.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <Status variant={person.roleId} />
                                        </td>
                                        <td className="max-w-[300px] truncate  px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">{person.address}</div>
                                            <div className="mt-1 text-gray-500">
                                                <Position variant={person.positionId} />
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {formatDateTime(person.createdAt)}
                                        </td>
                                        <td className="h-full pt-9 flex gap-2  whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link
                                                href={pageRouters.EDIT_ACCOUNT(person.id)}
                                                className="text-indigo-600 hover:opacity-60 hover:text-indigo-900"
                                            >
                                                Edit
                                                <span className="sr-only">, {person.firstName}</span>
                                            </Link>
                                            <span
                                                onClick={() => handleDeleteUser(person.id)}
                                                className="text-red-600 cursor-pointer hover:opacity-60 hover:text-red-900"
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
