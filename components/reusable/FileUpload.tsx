"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
}

export default function FileUpload({
  value,
  onChange,
  maxSizeMB = 10,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    const allowedTypes = [
          "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF files are allowed.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File must be less than ${maxSizeMB}MB.`);
      return;
    }

    onChange(file); // 🔥 send to parent
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center
        border-2 border-dashed rounded-xl
        px-6 py-10 text-center transition-all
        ${
          isDragging
            ? "border-[#36668E] bg-[#F3F7FA]"
            : "border-[#D7DCE2] bg-white"
        }
      `}
    >
      <Upload className="w-8 h-8 text-[#9CA3AF] mb-4" />

      <p className="text-[#4A4C56] text-sm font-medium">
        Drag and drop your file here, or{" "}
        <span
          onClick={() => fileInputRef.current?.click()}
          className="text-[#36668E] cursor-pointer underline"
        >
          click to browse
        </span>
      </p>

      <p className="text-[#818898] text-xs mt-2">
        Supports PDF (max {maxSizeMB}MB)
      </p>

      {value && (
        <p className="mt-4 text-sm text-green-600 font-medium">
          Selected: {value.name}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleBrowse}
      />
    </div>
  );
}