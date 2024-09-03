import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Tekathon',
    description: 'Tekathon'
};


interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                {children}
            </body>
        </html >
    );
}
