import React, { useEffect, useState } from "react";
import dbService from "../appwrite/database";
import {
  Container,
  PostCard as PostCardComp,
  ErrorMessage,
} from "../components/index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const allPosts = await dbService.getPosts();
        setPosts(allPosts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);
  return (
    <>
      <Container>
        {error && <ErrorMessage message={error} onClose={() => setError("")} />}
        <div className="min-h-[75vh] px-4 py-10 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mx-auto mb-10 max-w-6xl">
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  All Posts
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
                  Explore stories, ideas and thoughts shared by the Inkly
                  community.
                </p>
              </div>
              {posts.length > 0 && !loading && !error && (
                <span className="text-sm text-gray-600">
                  {posts.length} {posts.length === 1 ? "post" : "posts"}
                </span>
              )}
            </div>
          </div>
          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[45vh] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-orange-500"></div>
                <p className="text-sm text-gray-400"> Loading posts... </p>
              </div>
            </div>
          ) : posts.length === 0 && !error ? (
            /* Empty State */ <div className="mx-auto flex min-h-[40vh] max-w-xl items-center justify-center">
              <div className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-6 py-10 text-center shadow-lg">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-xl text-orange-500">
                  ✦
                </div>
                <h2 className="text-xl font-semibold text-white">
                  No posts yet
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  There are currently no published posts to explore.
                </p>
              </div>
            </div>
          ) : (
            /* Posts Grid */ <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCardComp key={post.$id} {...post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default AllPosts;
