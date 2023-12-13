import theme from "@/core/utils/theme";
import createEmotionServer from "@emotion/server/create-instance";
import Document, {Head, Html, Main, NextScript} from "next/document";
import {createEmotionCacheLtr, createEmotionCacheRtl} from "@witel/webapp-builder";
import languageList from "@/core/data/languageList";

export default function MyDocument(props) {
    const {emotionStyleTags} = props;

    return (
        <Html>
            <Head>
                <meta name="theme-color" content={theme.palette.primary.main}/>
                <meta name="emotion-insertion-point" content=""/>
                <link rel="manifest" href="/manifest.json"/>
                {emotionStyleTags}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    let cache;
    for (const lang of languageList) {
        if (ctx.locale !== lang.key) continue;
        if (lang.dir === 'rtl') {
            cache = createEmotionCacheRtl();
        } else {
            cache = createEmotionCacheLtr();
        }
    }

    const {extractCriticalToChunks} = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
