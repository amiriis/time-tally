import {Button, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import TitlePage from "@/core/components/TitlePage";
import Svg403 from "@/core/components/svgs/Svg403";
import {CenterLayout, FullPageLayout, NextLinkComposed} from "@witel/webapp-builder";

const UnAuthorizedComponent = () => {
    const t = useTranslations();

    return (
        <>
            <TitlePage text="Titles.title_custom_403"/>
            <FullPageLayout sx={{p: 1}}>
                <CenterLayout spacing={3}>
                    <Svg403 width={300} height={200}/>
                    <Typography margin={2} variant="h6" textAlign="center">
                        {t("ErrorPage.custom_403")}
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

export default UnAuthorizedComponent;
