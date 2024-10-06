import useAuth from "@/hooks/useAuth";
import { AppRegistrationRounded, LogoutOutlined } from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import ResponsiveDrawer from "./ResponsiveDrawer";

const AdminNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logOut } = useAuth();
  const router = useRouter();

  const LogOut = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5B50A1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform logout operations
        await logOut(); // Call logOut from the hook to clear session/local storage

        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been successfully logged out.",
        }).then(() => {
          // Redirect to login page after the success alert
          router.push("/login");
        });
      }
    });
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openProfile = Boolean(profileAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    LogOut();
    setProfileAnchorEl(null);
  };

  return (
    <nav className="sticky top-5 z-[90] w-full h-16 flex items-center mb-5">
      <section className="w-full bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl py-1">
        <div className="px-4 w-full flex justify-between items-center  gap-4">
          <ResponsiveDrawer />
          <aside className="hidden md:block">
            <div className="flex items-center text-md">
              <AppRegistrationRounded className="pr-2 text-violet-600 !text-2xl" />
              <span className="pr-1">USER AUTH SYSTEM</span>
            </div>
          </aside>
          <aside className="w-1/4 flex gap-5 items-center justify-end">
            <div className="group">
              <Button
                id="basic-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleProfileClick}
              >
                <p className="pr-3 text-gray-900">ADMIN</p>
                <Avatar
                  src="/avtar.jpeg"
                  sx={{
                    height: "2.5rem",
                    width: "2.5rem",
                    backgroundColor: "#0e0e66",
                  }}
                ></Avatar>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={profileAnchorEl}
                open={openProfile}
                onClose={handleProfileClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <aside className="flex flex-col px-3 pb-2">
                    <p className="text-lg font-semibold capitalize">Admin</p>
                    <p className="text-lg font-medium">admin@gmail.com</p>
                  </aside>{" "}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleProfileClose}>
                  <div className="flex gap-2 items-center px-3 cursor-pointer py-2 text-base tracking-wider font-medium">
                    <LogoutOutlined className="!text-primary !text-3xl" />
                    <p className=""> LogOut</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </aside>
        </div>
      </section>
    </nav>
  );
};

export default AdminNavbar;
