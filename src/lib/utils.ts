import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  File as FileIcon
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return ImageIcon;
  if (['pdf', 'txt', 'csv', 'doc', 'docx'].includes(ext)) return FileText;
  if (['xls', 'xlsx'].includes(ext)) return FileSpreadsheet;
  if (['zip', 'rar', 'tar', 'gz'].includes(ext)) return FileArchive;
  if (['json', 'js', 'ts', 'html', 'css', 'jsx', 'tsx'].includes(ext)) return FileCode;
  return FileIcon;
};

/**
 * Extracts a human-readable file name from a Cloudinary (or any) URL.
 * Strips version prefix, upload path, and handles encoded characters.
 */
export const getFileName = (url: string, fallback = 'Document'): string => {
  try {
    const decoded = decodeURIComponent(url);
    // Grab just the last path segment (before any query string)
    const segment = decoded.split('/').pop()?.split('?')[0] || '';
    if (!segment) return fallback;
    // Cloudinary puts a version like "v1234567890" as a preceding segment — already stripped above
    // The segment itself may look like "my_file.pdf" or "wmu4wafqolokl0ynqvuw.pdf" (hash)
    const nameWithoutExt = segment.split('.').slice(0, -1).join('.') || segment;
    const ext = segment.includes('.') ? '.' + segment.split('.').pop() : '';
    // If the name without extension is a 20+ char lowercase hex string it's a Cloudinary hash
    if (/^[a-f0-9]{20,}$/.test(nameWithoutExt)) return fallback + ext;
    return segment;
  } catch {
    return fallback;
  }
};

export const isImageFile = (url: string): boolean => {
  const ext = url.split('.').pop()?.split('?')[0]?.toLowerCase() || '';
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
};

export const getDownloadUrl = (url: string): string => {
  if (url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
};
