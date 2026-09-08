import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dbService from "../appwrite/database";
import { PostCard as PostCardComp, ErrorMessage } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      try {
        const allPosts = await dbService.getPosts();
        setPosts(allPosts);
      } catch (error) {
        setError("Unable To Fetch Posts");
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-white">
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#242424]">
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                Welcome to Inkly
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Write what
              <br />
              <span className="text-orange-500">matters to you.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
              A simple space to turn your thoughts into stories, share your
              ideas, and discover perspectives from other writers.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/add-post")}
                className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
              >
                Start Writing
              </button>

              <button
                type="button"
                onClick={() => navigate("/all-posts")}
                className="rounded-lg border border-[#242424] bg-[#111111] px-6 py-3 font-semibold text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-orange-500/50 hover:text-orange-400"
              >
                Explore Stories
              </button>
            </div>
          </div>

          {/* Simple stats */}
          <div className="mt-20 flex max-w-lg divide-x divide-[#242424] border-t border-[#242424] pt-7">
            <div className="flex-1">
              <p className="text-2xl font-semibold text-white">
                {posts.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-600">
                Stories
              </p>
            </div>

            <div className="flex-1 pl-6">
              <p className="text-2xl font-semibold text-white">✦</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-600">
                Ideas
              </p>
            </div>

            <div className="flex-1 pl-6">
              <p className="text-2xl font-semibold text-white">∞</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-600">
                Possibilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-10 flex items-end justify-between border-b border-[#242424] pb-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                Discover
              </span>
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">Latest stories</h2>

            <p className="mt-1 text-sm text-gray-500">
              See what people are writing about.
            </p>
          </div>

          {posts.length > 0 && (
            <button
              type="button"
              onClick={() => navigate("/all-posts")}
              className="hidden text-sm font-medium text-gray-500 transition hover:text-orange-500 sm:block"
            >
              View all →
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#242424] border-t-orange-500" />

              <p className="text-sm text-gray-500">Loading stories...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center">
            <h3 className="font-semibold text-red-400">
              Unable to load stories
            </h3>

            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-[#242424] bg-[#111111] px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-xl text-orange-500">
              ✦
            </div>

            <h3 className="mt-5 text-xl font-semibold">Nothing here yet.</h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Be the first to share an idea with the Inkly community.
            </p>

            <button
              type="button"
              onClick={() => navigate("/add-post")}
              className="mt-6 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              Write the first story
            </button>
          </div>
        )}

        {/* Posts */}
        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 6).map((post) => (
                <PostCardComp key={post.$id} {...post} />
              ))}
            </div>

            {posts.length > 6 && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => navigate("/all-posts")}
                  className="rounded-lg border border-[#242424] px-6 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-orange-500 hover:text-orange-500"
                >
                  Explore all stories →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-[#242424] bg-[#111111] px-6 py-14 text-center sm:px-10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <span className="text-2xl text-orange-500">✦</span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Your next story starts here.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
              Don't keep your ideas in your head. Put them into words and give
              them a place to live.
            </p>

            <button
              type="button"
              onClick={() => navigate("/add-post")}
              className="mt-7 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
            >
              Create a Post
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
