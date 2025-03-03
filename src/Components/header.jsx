import { removeAuthToken } from "@/utils/auth";
import { useRouter } from "next/router";
import React from "react";
import { MdLogout, MdSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from "@/Context/SidebarContext";

function Header() {
  const router = useRouter();

  const { toggleSidebar } = useSidebar();
  console.log({ toggleSidebar });
  const handleLogout = () => {
    console.log("handle logout");
    removeAuthToken();
    router.push("/Login");
  };
  return (
    <header className="bg-black w-full left-0 lg:left-[256px] lg:w-[calc(100%-256px)]  shadow py-3 px-3 lg:px-6 flex justify-between items-center fixed   z-10">
      <button onClick={toggleSidebar} className="  lg:!hidden">
        <GiHamburgerMenu />
      </button>

      {/* Search Bar */}
      <div className="relative  w-40 lg:w-80">
        <MdSearch
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
        />
        <input
          type="text"
          placeholder="Search..."
          className="bg-black text-white border border-blue-800 rounded-lg pl-10 pr-3 py-2 text-sm w-full focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* User Profile */}
        <div className="flex items-center space-x-3 mr-4 ">
          <img
            src="/Assets/user.jpeg"
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-white font-medium text-sm mr-4">John</span>
        </div>
        <div>
          <button onClick={handleLogout} className="text-white">
            {<MdLogout />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
