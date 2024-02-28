'use client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from "react-query";


type Props = {
    children: ReactNode
}

export default function TanstackProvider({ children }: Props) {
const [queryClient] = useState(() => new  QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}