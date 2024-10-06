import { Tooltip } from "@mui/material";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";

const PublicNavbar = () => {
  return (
    <nav className="w-full bg-white shadow sticky top-0 z-[999] py-2">
      <section className="mx-auto lg:px-[12rem] px-4 flex items-center justify-between gap-4">
        <Link href={"/"} className="text-gray-800 font-semibold">
          USER AUTH SYSTEM
        </Link>
        <Tooltip title="Login" placement="right" arrow>
          <a href="/login">
            <button className="bg-secondary/20 text-[#0000ff] rounded-full p-2 flex items-center justify-center gap-1.5">
              <IoMdLogIn className="!text-xl" />
            </button>
          </a>
        </Tooltip>
      </section>
    </nav>
  );
};

export default PublicNavbar;
