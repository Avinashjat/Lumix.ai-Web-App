// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          <motion.div
            className="sm:col-span-2 lg:col-span-1"
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="flex cursor-pointer">
              <img className="w-12 sm:w-16 " src={assets.logo} alt="logo" />
              <span className="pt-5 text-2xl font-bold bg-gradient-to-r from-[#3C81F6] to-[#9234EA] bg-clip-text text-transparent">
                MIX
              </span>
            </div>
            <p className="text-sm/7 mt-6">
              PrebuiltUI is a free and open-source UI component library with
              over 300+ beautifully crafted, customizable components built with
              Tailwind CSS.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {/* Instagram */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
              </svg>
              {/* Facebook */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8v3h2.5V21h3v-7.5H16l.5-3h-3z" />
              </svg>
              {/* Twitter */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 5.92a8.2 8.2 0 01-2.36.65A4.1 4.1 0 0021.4 4a8.27 8.27 0 01-2.6 1A4.14 4.14 0 0016 4a4.15 4.15 0 00-4.15 4.15c0 .32.04.64.1.94a11.75 11.75 0 01-8.52-4.32 4.14 4.14 0 001.29 5.54A4.1 4.1 0 013 10v.05a4.15 4.15 0 003.33 4.07 4.12 4.12 0 01-1.87.07 4.16 4.16 0 003.88 2.89A8.33 8.33 0 012 19.56a11.72 11.72 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.18 8.18 0 0022 5.92z" />
              </svg>
              {/* LinkedIn */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
              </svg>
            </div>
          </motion.div>
          <div className="flex flex-col lg:items-center lg:justify-center">
            <div className="flex flex-col text-sm space-y-2.5">
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <a className="hover:text-slate-600 transition" href="#">
                About us
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Careers
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Contact us
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Privacy policy
              </a>
            </div>
          </div>
          <motion.div
            initial={{ x: 150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 70,
              mass: 1,
            }}
          >
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-6 max-w-sm">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-50">
                <input
                  className="focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 py-2 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-indigo-600 px-4 py-2 text-white rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        <p className="py-4 text-center border-t mt-6 border-slate-200">
          Copyright 2025 © <a href="https://prebuiltui.com">PrebuiltUI</a> All
          Right Reserved.
        </p>
      </footer>
    </>
  );
};
export default Footer;
