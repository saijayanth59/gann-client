"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileList } from "@/components/file-list";
import { Upload, Download, Trash2 } from "lucide-react";

export default function CSVUploader() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(event.target.files || []),
      ]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = async () => {
    try {
      if (files.length === 0) return;

      setIsUploading(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        "https://stock-history-api.onrender.com/gann/combine-csv",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process CSV.");
      }
      setIsUploading(false);
      const now = new Date();
      const formattedDate = now
        .toISOString()
        .replace(/[-:.]/g, "")
        .slice(0, 15);
      const filename = `gann_result_${formattedDate}.xlsx`;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during file processing:", error);
      alert("Failed to process files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(e.dataTransfer.files),
      ]);
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900"
            : "border-gray-300 dark:border-gray-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />

        <div>
          <Button
            onClick={handleUploadClick}
            className="w-full mb-4"
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload CSV Files
          </Button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          or drag and drop your files here
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Uploaded Files
            </h2>
            <Button variant="ghost" size="sm" onClick={handleClearFiles}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear All
            </Button>
          </div>
          <FileList files={files} />
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          disabled={isUploading || files.length === 0}
          onClick={handleDownload}
          className="w-full"
        >
          <Download className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Process CSV"}
        </Button>
      </div>
    </div>
  );
}
