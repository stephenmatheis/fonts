import type { Metadata } from 'next';
import { VersionModal } from '@/components/version-modal';
import { Libre_Baskerville } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.scss';

const serif = Libre_Baskerville({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
    weight: '400',
});

const retro = localFont({
    src: 'fonts/kreative-korp/PrintChar21.woff2',
    variable: '--font-retro',
    display: 'swap',
});

const windyCity = localFont({
    src: 'fonts/ChicagoFLF.woff2',
    variable: '--font-windy-city',
    display: 'swap',
});

const pixel = localFont({
    src: 'fonts/sysfont.woff2',
    variable: '--font-pixel',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        template: 'Stephen Matheis | %s',
        default: 'Stephen Matheis',
    },
    description: 'My blog, portfolio, and resume.',
    viewport: 'width=device-width, initial-scale=1,  viewport-fit=cover',
    icons: {
        shortcut: '/favicon.ico',
        icon: '/favicons/icon.png',
        apple: '/favicons/apple-icon.png',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={[
                serif.variable,
                retro.variable,
                windyCity.variable,
                pixel.variable,
            ].join(' ')}
            suppressHydrationWarning
        >
            <body suppressHydrationWarning>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="/set-theme.js" />
                {children}
                <VersionModal />
            </body>
        </html>
    );
}
