import {useTranslations} from "next-intl";
import Head from "next/head";

const TitlePage = ({text}) => {
    const t = useTranslations();
    return (
        <Head>
            <title>
                {text ? `${t("app_short_name")} | ${t(text)}` : t("app_short_name")}
            </title>
        </Head>
    );
};

export default TitlePage;
