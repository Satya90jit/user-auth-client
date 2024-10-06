import { BadgeOutlined, PeopleOutline } from "@mui/icons-material";

const useAdminSidebarItems = () => {
  return [
    {
      _id: "1",
      title: "All User List",
      route: "/admin",
      icon: <PeopleOutline />,
    },
  ];
};

export default useAdminSidebarItems;
