import React, { useState } from "react";
import {dummyPublishedCreationData } from "../assets/assets";

export default function Community() {
  // Simulating logged-in user
  const currentUserId = "user_2yMX02PRbyMtQK6PebpjnxvRNIA";

  // Local state to manage likes dynamically
  const [creations, setCreations] = useState(dummyPublishedCreationData);

  const toggleLike = (id) => {
    setCreations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const alreadyLiked = item.likes.includes(currentUserId);
          return {
            ...item,
            likes: alreadyLiked
              ? item.likes.filter((uid) => uid !== currentUserId)
              : [...item.likes, currentUserId],
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Creations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {creations.map((item) => {
          const alreadyLiked = item.likes.includes(currentUserId);
          return (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              {/* Image */}
              <img
                src={item.content}
                alt="creation"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover text */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm opacity-0 group-hover:opacity-100 p-2 transition-opacity duration-300">
                {item.prompt}
              </div>

              {/* Likes */}
              <button
                onClick={() => toggleLike(item.id)}
                className="absolute bottom-3 right-3 flex items-center space-x-1 text-white font-medium"
              >
                <span>{item.likes.length}</span>
                {alreadyLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    stroke="red"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.76 0-3.297.932-4 
                      2.318C11.297 4.682 9.76 3.75 
                      8 3.75c-2.761 0-5 2.015-5 
                      4.5 0 5.25 9 10.5 9 
                      10.5s9-5.25 9-10.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.76 
                      0-3.297.932-4 
                      2.318C11.297 4.682 9.76 3.75 
                      8 3.75c-2.761 0-5 2.015-5 
                      4.5 0 5.25 9 10.5 9 
                      10.5s9-5.25 9-10.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
