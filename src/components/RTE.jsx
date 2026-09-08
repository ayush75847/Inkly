import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "../config/config";

function RTE({ name, control, defaultValue = "", label }) {
  return (
    <>
      <div>
        {label && <label className="">{label}</label>}

        <Controller
      
          name={name || "editor"}
          control={control}
          render={({ field }) => (
            <Editor
            apiKey={config.tinymceApiKey}
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist | link image media | " +
                  "removeformat | code fullscreen | help",
              }}
              onEditorChange={(content) => field.onChange(content)}
            />
          )}
        />
      </div>
    </>
  );
}

export default RTE;
