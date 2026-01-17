
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Hero() {
  const companies = [
    "Instagram",
    "Facebook",
    "Slack",
    "Framer",
    "Netflix",
    "Google",
    "LinkedIn",
  ];

  const Navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-4 pb-14 sm:px-20 xl:px-32">
      {/* Inline SVG Background */}
      <svg
        className="absolute inset-0 -z-10 w-full h-full"
        viewBox="0 0 1440 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="#A0AEC0" strokeOpacity="1" d="M-15.227 702.342H1439.7" />
        <circle
          cx="711.819"
          cy="372.562"
          r="308.334"
          stroke="#A0AEC0"
          strokeOpacity="1"
        />
        <circle
          cx="16.942"
          cy="20.834"
          r="308.334"
          stroke="#A0AEC0"
          strokeOpacity="1"
        />
        <path
          stroke="#A0AEC0"
          strokeOpacity="1"
          d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7"
        />
        <circle
          cx="782.595"
          cy="411.166"
          r="308.334"
          stroke="#A0AEC0"
          strokeOpacity="1"
        />
      </svg>

      {/* Hero content */}
      <div className="text-center mt-40 mb-6">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl 2xl:text-[75px] font-semibold mb-6 leading-[1.2]"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          Create amazing content <br /> with{" "}
          <span className="text-blue-600">AI tools</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 320,
            damping: 70,
            mass: 1,
          }}
        >
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        <button
          onClick={() => Navigate("/ai")}
          className="bg-blue-600 rounded-lg text-white px-10 py-3 hover:scale-105 active:scale-95 transition"
        >
          Start creating now
        </button>
        <button className="bg-white px-10 py-3 border border-gray-300 rounded-lg text-black hover:scale-105 active:scale-95 transition">
          Watch demo
        </button>
      </motion.div>

      <motion.div
        className="flex justify-center items-center gap-4 mt-8 text-gray-600"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        <img className="h-8" src={assets.user_group} alt="" /> Trusted by 10k+
        people
      </motion.div>

      <div className="relative w-full py-6 mt-20 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-[30%] bg-gradient-to-r from-white to-transparent z-10 rounded-full"></div>
        <div className="absolute right-0 top-0 h-full w-[30%] bg-gradient-to-l from-white to-transparent z-10 rounded-full"></div>
        <div className="mx-auto w-[70%] overflow-hidden">
          <div className="flex animate-marquee">
            {companies.map((c, i) => (
              <span
                key={i}
                className="flex-shrink-0 mx-6 text-base sm:text-xl md:text-2xl font-semibold text-blue-600"
              >
                {c}
              </span>
            ))}
            {companies.map((c, i) => (
              <span
                key={`dup-${i}`}
                className="flex-shrink-0 mx-6 text-base sm:text-xl md:text-2xl font-semibold text-blue-600"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;