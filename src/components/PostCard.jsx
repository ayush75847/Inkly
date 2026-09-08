import React from "react";
import storageService from "../appwrite/storage";
import { NavLink } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <NavLink to={`/post/${$id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-md transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg">
        {featuredImage ? (
          <img
            src={storageService.getFileView(featuredImage)}
            alt={title}
            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-52 items-center justify-center bg-gray-950">
            <span className="text-2xl font-bold text-orange-500">Inkly</span>
          </div>
        )}

        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-white transition group-hover:text-orange-400">
            {title}
          </h3>
        </div>
      </div>
    </NavLink>
  );
}

export default PostCard;
