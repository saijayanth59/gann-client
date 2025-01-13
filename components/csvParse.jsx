"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CsvProcessor() {
  const [csvContent, setCsvContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("csvContent", csvContent);

      const response = await fetch(
        "https://stock-history-api.onrender.com/gann-csv",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process CSV.");
      }

      const now = new Date();
      const formattedDate = now
        .toISOString()
        .replace(/[-:.]/g, "")
        .slice(0, 15); // e.g., "20250113T154530"
      const filename = `gann_result_${formattedDate}.xlsx`;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(url);
      handleReset();
    } catch (error) {
      console.error("Error processing CSV:", error);
      alert("An error occurred while processing your CSV.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCsvContent("");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>CSV Processor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="csvContent"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Paste your CSV content here:
              </label>
              <Textarea
                id="csvContent"
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                placeholder="Paste your CSV content here..."
                rows={10}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-between">
              <Button type="submit" disabled={isProcessing || !csvContent}>
                {isProcessing ? "Processing..." : "Process CSV"}
              </Button>
              <Button type="button" onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
            {csvContent && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  CSV Content Preview:
                </h3>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                  {csvContent}
                </pre>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
