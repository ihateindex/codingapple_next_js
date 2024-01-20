import Link from 'next/link';
import './globals.css';

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <div className="navbar">
                    <Link href="/" className="logo">
                        Appleforum
                    </Link>
                    <Link href="/list">List</Link>
                    <Link href="/write">Write</Link>
                </div>
                {children}
            </body>
        </html>
    );
}
