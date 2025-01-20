import { File } from "lucide-react";

export function FileList({ files }) {
  return (
    <ul className="space-y-2">
      {files.map((file, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
        >
          <File className="h-4 w-4" />
          <span>{file.name}</span>
          <span className="text-gray-400 dark:text-gray-500">
            ({(file.size / 1024).toFixed(2)} KB)
          </span>
        </li>
      ))}
    </ul>
  );
}
