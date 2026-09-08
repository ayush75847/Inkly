import React, { useEffect, useState } from "react";
import { Container, Button, ErrorMessage } from "../components/index";
import dbService from "../appwrite/database";
import storageService from "../appwrite/storage";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

function Post() {
  const [error, setError] = useState("");
  const { id } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currUser = useSelector((state) => state.auth.userData);
  const isAuthor = post && currUser ? post.userId === currUser.$id : false;

  useEffect(() => {
    async function getPost() {
      try {
        const post = await dbService.getPost(id);
        setPost(post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async (post) => {
    try {
      await dbService.deletePost(post.$id);
      if (post.featuredImage) {
        try {
          await storageService.deleteFile(post.featuredImage);
        } catch (error) {
          setError("Unable to delete the featured Image of the Post");
        }
      }
      navigate("/all-posts");
    } catch (error) {
      setError("unable to delete the Post");
    }
  };

  return (
    <Container>
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      <div className="min-h-[75vh] px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-orange-500"></div>
              <p className="text-sm text-gray-400">Loading post...</p>
            </div>
          </div>
        ) : error ? null : (
          <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-xl shadow-black/30">
            {/* Header */}
            <div className="px-6 pb-6 pt-7 sm:px-8 sm:pt-8">
              {/* Brand */}
             
              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {post.title}
              </h1>
              {/* Metadata */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 font-medium text-orange-400">
                  {post.status}
                </span>
                
              </div>
            </div>
            {/* Image */}
            {post.featuredImage && (
              <div className="px-4 sm:px-6">
                <div className="group overflow-hidden rounded-xl border border-gray-800 bg-black">
                  <img
                    src={storageService.getFileView(post.featuredImage)}
                    alt={post.title}
                    className="max-h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            )}
            {/* Content */}
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <div className="prose prose-invert max-w-none text-gray-300">
                {parse(post.content)}
              </div>
            </div>
            {/* Author Actions */}
            {isAuthor && (
              <div className="mx-6 mb-6 border-t border-gray-800 pt-5 sm:mx-8">
                <div className="flex flex-col gap-4 rounded-xl bg-black/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Manage your post
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Update or remove this post.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleUpdate}
                      className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-black"
                    >
                      Update
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleDelete(post)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </article>
        )}
      </div>
    </Container>
  );
}

export default Post;
