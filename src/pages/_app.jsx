import "&/global.scss";
import "moment/locale/fa";
import {
    AppLayout,
    LanguageProvider,
    LoadingProvider,
    MuiLayout,
    NetworkProvider,
    ToastProvider,
    UserProvider
} from "@witel/webapp-builder";
import {GET_USER} from "@/core/data/apiRoutes";
import languageList from "@/core/data/languageList";
import {NextIntlProvider} from "next-intl";
import themeRtl from "@/core/utils/theme-rtl";
import TitlePage from "@/core/components/TitlePage";
import GlobalHead from "@/core/components/GlobalHead";
import Layout from "@/layouts";

const App = ({Component, pageProps}) => {
    return (
        <>
            <UserProvider urlGetUser={GET_USER} schemaGetUser={(data) => data}>
                <LanguageProvider defaultLanguage={process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE}
                                  languageList={languageList}>
                    <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages || {}}>
                        <MuiLayout themes={{rtl: themeRtl}} isBot={pageProps.isBot}>
                            {pageProps.messages ? <TitlePage text={pageProps.title}/> : ''}
                            <LoadingProvider>
                                <ToastProvider>
                                    <AppLayout headComponent={GlobalHead} isBot={pageProps.isBot}>
                                        <NetworkProvider>
                                            <Layout layout={pageProps.layout}>
                                                <Component {...pageProps} />
                                            </Layout>
                                        </NetworkProvider>
                                    </AppLayout>
                                </ToastProvider>
                            </LoadingProvider>
                        </MuiLayout>
                    </NextIntlProvider>
                </LanguageProvider>
            </UserProvider>
        </>
    );
};

export default App;
