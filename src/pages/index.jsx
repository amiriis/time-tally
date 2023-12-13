import { parse } from "next-useragent";

export default function Home() {
    return <>amir</>;
}

export async function getServerSideProps({ req, locale }) {
    const { isBot } = parse(req.headers["user-agent"]);
    return {
        props: {
            messages: (await import(`&/locales/${locale}/app.json`)).default,
            isBot,
        }, 
    };
}

