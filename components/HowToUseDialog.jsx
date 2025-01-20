"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export function HowToUseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">How to Use</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>How to Use This App</DialogTitle>
          <DialogDescription>Learn how to use the CSV Processor and Uploader</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="uploader" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="uploader">CSV Uploader</TabsTrigger>
            <TabsTrigger value="processor">CSV Processor</TabsTrigger>
          </TabsList>
          <TabsContent value="uploader">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">CSV Uploader</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Upload one or more CSV files using the "Upload CSV Files" button or by dragging and dropping.</li>
                  <li>Click "Process CSV" to generate Gann results.</li>
                  <li>An Excel file with the results will be downloaded automatically.</li>
                </ol>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="processor">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">CSV Processor</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Paste your CSV content into the text area. The format should be:</li>
                </ol>
                <div className="bg-muted rounded-md p-4">
                  <ScrollArea className="h-[100px] w-full">
                    <pre className="text-xs whitespace-pre-wrap break-all">
                      {`Date,Open,High,Low,Close
Wed Jan 08 2025 09:15:00 GMT+0530 (India Standard Time),1774.1,1779.5,1765.25,1766.25
Wed Jan 08 2025 09:20:00 GMT+0530 (India Standard Time),1764.95,1769.5,1757.2,1759.15`}
                    </pre>
                  </ScrollArea>
                </div>
                <ol start={2} className="list-decimal list-inside space-y-2">
                  <li>Click "Process CSV" to generate Gann results.</li>
                  <li>An Excel file with the results will be downloaded automatically.</li>
                </ol>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

