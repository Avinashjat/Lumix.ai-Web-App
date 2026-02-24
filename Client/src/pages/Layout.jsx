import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { X, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

function Layout() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full h-16 px-10 flex justify-between border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex cursor-pointer" onClick={() => navigate("/")}>
          <img className="w-12 sm:w-20 " src={assets.logo} alt="logo" />
          <span className="pt-5 text-4xl font-bold bg-gradient-to-r from-[#3C81F6] to-[#9234EA] bg-clip-text text-transparent">
            MIX
          </span>
        </div>

        {sidebar ? (
          <X
            className="w-7 h-7 mt-5 text-gray-600 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-7 h-7 mt-5 text-gray-600 sm:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      <div className="flex flex-1">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}

export default Layout;
