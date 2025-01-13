"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileList } from "@/components/file-list";
import { Upload, Download, Trash2, Moon, Sun } from "lucide-react";

export default function CSVUploader() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Check for user's preferred color scheme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }

    // Listen for changes in color scheme preference
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setIsDarkMode(e.matches);
      });
  }, []);

  useEffect(() => {
    // Apply dark mode class to the body
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

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
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      //   const response = await fetch('http://localhost:8000/process-csv/', {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to process files');
      //   }

      //   const blob = await response.blob();

      //   const timestamp = new Date().toISOString().replace(/[:.-]/g, '_'); // Format: YYYY_MM_DDTHH_MM_SS
      //   const filename = `processed_data_${timestamp}.xlsx`;

      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = filename; // Use the timestamp as part of the filename
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 transition-colors duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            CSV File Uploader
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
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

          <div
            className="mt-6"
            initial={false}
            animate={{ opacity: files.length > 0 ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleDownload}
              className="w-full"
              disabled={files.length === 0}
            >
              <Download className="mr-2 h-4 w-4" /> Download Processed File
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
