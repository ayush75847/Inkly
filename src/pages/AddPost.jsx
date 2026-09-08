import React from "react";
import { PostForm as PostFormComp, Container } from "../components/index";

function AddPost() {
  return (
    <Container>
      <div className="min-h-[75vh] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 shadow-xl shadow-black/20 sm:p-8">
            <PostFormComp />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AddPost;
