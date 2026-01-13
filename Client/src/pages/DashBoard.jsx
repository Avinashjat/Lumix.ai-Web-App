import React, { useEffect, useState } from "react";
import axios from "axios";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import Creation from "../components/Creation";

// ✅ Use base URL from env
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function DashBoard() {
  const { getToken } = useAuth();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const token = await getToken();

        const res = await axios.get(
          "/api/user/get-user-creations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setCreations(res.data.creations);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCreations();
  }, [creations.length, getToken]);

  return (
    <div className=" p-6 ">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6">

        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">
              {creations.length}
            </h2>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-[#3588F2] to-[#0BB0D7] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-lg font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-[#FF61C5] to-[#9E53EE] rounded-lg flex items-center justify-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>

      </div>

    <div>

   <h2 className="mb-4 font-semibold text-lg">
        Recent Creations
      </h2>

      {! loading && creations.length === 0 && (
        <p className="text-sm text-gray-500">
          No creations found
        </p>
      )}

      {loading && creations.map((item, index) => (
        <Creation
          key={item.id ?? index}   // ✅ SAFE KEY
          item={item}
        />
      ))}




      </div>
    </div>
  );
}

export default DashBoard;
