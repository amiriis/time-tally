import { SpeedInsights } from "@vercel/speed-insights/next";

const APP_NAME = "Time Tally";
const APP_DEFAULT_TITLE = "Time Tally";
const APP_TITLE_TEMPLATE = "%s - Time Tally";

export const metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
    },
    icons: {
        icon: "/icons/timtally-logo192x192.png",
        shortcut: "/icons/timtally-logo192x192.png",
        apple: "/icons/timtally-logo192x192.png",
        other: {
            rel: "apple-touch-icon-precomposed",
            url: "/icons/timtally-logo192x192.png",
        },
    },
};

export const viewport = {
    themeColor: "#0fa3b1",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
