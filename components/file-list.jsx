import { File } from "lucide-react";

export function FileList({ files }) {
  return (
    <ul className="mt-4 space-y-2">
      {files.map((file, index) => (
        <li
          key={file.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
        >
          <File className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {file.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
