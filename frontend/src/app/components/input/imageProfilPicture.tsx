"use client";
import React, { useState } from "react";

export default function ImageProfilInput() {
  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(
    null
  );

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <div className="shrink-0">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src={
            previewSrc instanceof ArrayBuffer
              ? undefined
              : previewSrc ||
                "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
          }
          alt="Profile photo"
        />
      </div>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="block w-full text-sm text-slate-500 rounded-xl dark:text-gray-300"
          onChange={handleImageChange}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PNG, JPG, JPEG (MAX. 2MB).
        </p>
      </label>
    </>
  );
}
