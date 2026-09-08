import React, { useEffect, useState } from "react";
import {
  PostForm as PostFormComp,
  Container,
  ErrorMessage,
} from "../components/index";
import dbService from "../appwrite/database";
import { useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState();
  const [error, setError] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPost() {
      try {
        const post = await dbService.getPost(id);
        setPost(post);
      } catch (error) {
        setError("Unable to fetch Post");
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, [id]);
  return (
    <Container>
      {loading ? (
        <div className="flex min-h-[75vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-5 h-11 w-11 animate-spin rounded-full border-2 border-gray-800 border-t-orange-500" />
            <h2 className="text-lg font-semibold text-white">Loading post</h2>
            <p className="mt-2 text-sm text-gray-500">
              Preparing your post for editing...
            </p>
          </div>
        </div>
      ) : error ? (
        <ErrorMessage message={error} onClose={() => setError("")} />
      ) : (
        <div className="min-h-[75vh] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 shadow-xl shadow-black/20 sm:p-8">
              <PostFormComp post={post} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default EditPost;
