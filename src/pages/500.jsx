import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {NextIntlProvider} from "next-intl";
import ServerErrorComponent from "@/components/errors/500";

export default function Custom500() {
    const router = useRouter()
    const [messages, setMessages] = useState(null)
    useEffect(() => {
        const fetch = async () => {
            const tempMessages = (await import(`&/locales/${router.locale}/app.json`)).default
            setMessages(tempMessages)
        }
        fetch()
    }, []);

    if (!messages) return

    return (
        <NextIntlProvider messages={messages}>
            <ServerErrorComponent/>
        </NextIntlProvider>
    );
}
