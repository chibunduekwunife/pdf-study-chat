import './globals.css'
import type {Metadata} from 'next'
import {Analytics} from '@vercel/analytics/react';
import {ClerkProvider} from '@clerk/nextjs'
import {dark} from '@clerk/themes';

export const metadata: Metadata = {
    title: 'Study Sage',
    description: 'Chat with your PDFs and quizzes!',
}

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark
            }}
        >
            <html lang="en">
                <body>
                    {children}
                    <Analytics/>
                </body>
            </html>
        </ClerkProvider>
    )
}