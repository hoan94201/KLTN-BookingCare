import { User } from '@/components/types';
import type { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as any;
                const res = await fetch(`http://localhost:8080/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const user = await res.json();
                if (user.data) {
                    return user.data;
                } else return null;
            },
        }),
    ],
    callbacks: {
        async signIn() {
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                return true;
            } else {
                return false;
            }
        },
        async jwt(params) {
            const { token, account, trigger, session } = params;
            const user = params.user as unknown as any;
            if (trigger === 'update' && session && token) {
                // If user has changed email
                if (session.email) {
                    (token.profile as any).email = session.email;
                }
                if (session.firstName) {
                    (token.user as any).firstName = session.firstName;
                }
                if (session.lastName) {
                    (token.user as any).lastName = session.lastName;
                }
                if (session.role_id) {
                    (token.profile as any).role_id = session.role_id;
                }
            }
            // Update the token for normal login
            if (user) {
                token.user = user;
            }
            if (user?.accessToken) {
                token.user = user;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            if (user?.remember) {
                token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token.user as User;
            session.accessToken = token.accessToken as string;
            session.refreshToken = token.refreshToken as string;
            return Promise.resolve(session);
        },
    },

    theme: {
        colorScheme: 'light',
    },

    pages: {
        signIn: '/auth/login',
        error: '/auth/forgot-password',
    },
    session: {
        strategy: 'jwt',
    },
};
