import React, { useState } from "react";
import { Input, Button, Select, RTE, ErrorMessage } from "../index";
import { useForm } from "react-hook-form";
import dbService from "../../appwrite/database";
import storageService from "../../appwrite/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      status: post?.status || "active",
      content: post?.content || "",
    },
  });

  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");

  const submit = async (data) => {
    setError("");
    if (post) {
      let file = null;
      try {
        if (data?.image?.[0]) {
          file = await storageService.uploadFile(data.image[0]);
        }
        const updatePost = await dbService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (file && post.featuredImage) {
          try {
            await storageService.deleteFile(post.featuredImage);
          } catch (error) {
            setError(error.message);
          }
        }
        if (updatePost) {
          navigate(`/post/${post.$id}`);
        }
      } catch (error) {
        if (file) {
          try {
            await storageService.deleteFile(file.$id);
          } catch (error) {
            setError(error.message);
          }
        }

        setError(error.message);
      }
    } else {
      let file = null;
      try {
        if (data?.image?.[0]) {
          file = await storageService.uploadFile(data.image[0]);
        }

        const newPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file ? file.$id : null,
        });

        navigate(`/post/${newPost.$id}`);
      } catch (error) {
        if (file) {
          try {
            await storageService.deleteFile(file.$id);
          } catch (error) {
            setError(error.message);
          }
        }
        setError(error.message);
      }
    }
  };

  const handleClearImage = () => {
    setValue("image", null);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
          Inkly
        </p>

        <h1 className="text-3xl font-bold text-white">
          {post ? "Edit Your Post" : "Create a New Post"}
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          {post
            ? "Update your post and keep your content fresh."
            : "Share your thoughts with the Inkly community."}
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl sm:p-8">
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          {/* Title */}
          <Input
            label="Title"
            placeholder="Enter your post title"
            type="text"
            {...register("title", {
              required: "title is required",
            })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}

          {/* Content */}
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={post?.content || ""}
          />

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Featured Image
            </label>

            <div className="flex w-full items-center gap-3">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  {...register("image")}
                  className="w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-900 text-sm text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-orange-500 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-black hover:file:bg-orange-400"
                />
              </div>

              <Button
                type="button"
                onClick={handleClearImage}
                className="shrink-0"
              >
                Clear
              </Button>
            </div>

            <p className="mt-2 text-xs text-gray-500">PNG, JPG or JPEG</p>
          </div>

          {/* Status */}
          <Select
            label="Status"
            options={["active", "inactive"]}
            {...register("status")}
          />

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400 active:scale-[0.99]"
            >
              {post ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
