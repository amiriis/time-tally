import {Button, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import TitlePage from "@/core/components/TitlePage";
import Svg500 from "@/core/components/svgs/Svg500";
import {CenterLayout, FullPageLayout, NextLinkComposed} from "@witel/webapp-builder";

const ServerErrorComponent = () => {
    const t = useTranslations();

    return (
        <>
            <TitlePage text="Titles.title_custom_500"/>
            <FullPageLayout sx={{p: 1}}>
                <CenterLayout spacing={3}>
                    <Svg500 width={300} height={200}/>
                    <Typography margin={2} variant="h6" textAlign="center">
                        {t("ErrorPage.custom_500")}
                    </Typography>
                    <Button
                        variant="contained"
                        component={NextLinkComposed}
                        to={{
                            pathname: "/",
                        }}
                    >
                        {t("ErrorPage.link_routing_back_to")}{" "}
                        {t("ErrorPage.link_routing_main_page")}
                    </Button>
                </CenterLayout>
            </FullPageLayout>
        </>
    );
};

export default ServerErrorComponent;
