import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";

const sidebarMenu = [
    [
        {
            key: "sidebar.dashboard",
            name: "sidebar.dashboard",
            type: "page",
            route: "/dashboard",
            icon: <SpaceDashboardIcon sx={{width: 'inherit', height: 'inherit'}}/>,
            selected: false,
            permission: "all"
        },
    ],
];

export default sidebarMenu;
