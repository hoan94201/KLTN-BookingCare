export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    email_verified_at: string;
    image: string;
    roleId : string 
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
