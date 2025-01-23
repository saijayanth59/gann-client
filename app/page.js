"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CSVUploader from "@/components/CSVUploader";
import CSVProcessor from "@/components/CSVProcessor";
import { HowToUseDialog } from "@/components/HowToUseDialog";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [showUploader, setShowUploader] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleComponent = () => {
    setShowUploader(!showUploader);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 transition-colors duration-300">
        <CardHeader className="flex md:flex-row items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="self-start"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            {showUploader ? "CSV File Uploader" : "CSV Processor"}
          </CardTitle>
          <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
            <HowToUseDialog />
            <Button variant="outline" onClick={toggleComponent}>
              Switch to {showUploader ? "Processor" : "Uploader"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showUploader ? <CSVUploader /> : <CSVProcessor />}
        </CardContent>
      </Card>
    </div>
  );
}
