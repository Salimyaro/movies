import path from "node:path";
import { fileURLToPath } from "node:url";

export const getFileName = (metaUrl: string): string => {
  return fileURLToPath(metaUrl);
};

export const getDirName = (metaUrl: string): string => {
  return path.dirname(getFileName(metaUrl));
};
