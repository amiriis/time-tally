import Head from "next/head";

const GlobalHead = () => {
    return (
        <Head>
            <meta
                name="application-name"
                content={process.env.NEXT_PUBLIC_API_NAME}
            />
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta
                name="apple-mobile-web-app-title"
                content={process.env.NEXT_PUBLIC_API_NAME}
            />
            <meta name="description" content="Marhaba does it for you"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta name="format-detection" content="date=no"/>
            <meta name="format-detection" content="address=no"/>
            <meta name="format-detection" content="email=no"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <link rel="apple-touch-icon" href="/icons/maskable_icon_x512.png"/>
            <link
                rel="apple-touch-icon"
                sizes="120x120"
                href="/icons/maskable_icon_x128.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/icons/maskable_icon_x192.png"
            />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
            <link
                rel="icon"
                type="image/svg"
                sizes="32x32"
                href="/icons/favicon.png"
            />
            <link
                rel="icon"
                type="image/svg"
                sizes="16x16"
                href="/icons/favicon.png"
            />
        </Head>
    )
}

export default GlobalHead