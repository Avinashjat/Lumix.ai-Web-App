import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function Community() {
  const { user } = useUser();
  const [creations, setCreations] = useState([]);

  // fetch published creations from DB
  const fetchCreations = async () => {
    try {
      const res = await axios.get("/api/user/get-published-creations");
      if (res.data.success) {
        setCreations(res.data.creations);
      }
    } catch (err) {
      console.error("Fetch community error:", err);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  // toggle like (DB + UI)
  const toggleLike = async (id) => {
    try {
      await axios.post("/api/user/toggle-likes-creations", { id });

      // optimistic UI update
      setCreations((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                likes: c.likes.includes(user.id)
                  ? c.likes.filter((uid) => uid !== user.id)
                  : [...c.likes, user.id],
              }
            : c
        )
      );
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 font-semibold text-lg">Community Creations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creations.map((creation) => (
          <div
            key={creation.id}
            className="relative group rounded-xl overflow-hidden bg-black"
          >
            <img
              src={creation.content}
              alt="creation"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-end justify-between p-3 
                            bg-gradient-to-b from-transparent to-black/80">
              
              {/* Prompt (hidden until hover) */}
              <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition">
                {creation.prompt}
              </p>

              {/* Like */}
              <div className="flex items-center gap-1 text-white">
                <span>{creation.likes.length}</span>
                <Heart
                  onClick={() => toggleLike(creation.id)}
                  className={`w-5 h-5 cursor-pointer transition ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
