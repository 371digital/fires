import { BaseOperation } from "../../services";
import fs from "fs/promises";
import path from "path";

class FileOperation extends BaseOperation {
  constructor(props) {
    super(props);
  }

  createFile = async ({ fileName, content = "" }, targetPath = "") => {
    const fullPath = path.join(targetPath, fileName);
    const directoryPath = path.dirname(fullPath);

    try {
      await fs.mkdir(directoryPath, { recursive: true });
      await fs.writeFile(fullPath, content);
      return `File ${fileName} created successfully`;
    } catch (err) {
      throw new Error(`Error creating file ${fileName}: ${err.message}`);
    }
  };

  deleteFile = async ({ fileName }, targetPath = "") => {
    const fullPath = path.join(targetPath, fileName);

    try {
      await fs.unlink(fullPath);
      return `File ${fileName} deleted successfully`;
    } catch (err) {
      throw new Error(`Error deleting file ${fileName}: ${err.message}`);
    }
  };

  updateFile = async ({ fileName, content }, targetPath = "") => {
    const fullPath = path.join(targetPath, fileName);

    try {
      await fs.writeFile(fullPath, content, { flag: "w" });
      return `File ${fileName} updated successfully`;
    } catch (err) {
      throw new Error(`Error updating file ${fileName}: ${err.message}`);
    }
  };

  patchFile = async ({ fileName, oldContent, newContent }, targetPath = "") => {
    const fullPath = path.join(targetPath, fileName);

    try {
      let fileContent = await fs.readFile(fullPath, { encoding: "utf8" });

      const patchedContent = fileContent.replace(oldContent, newContent);

      await fs.writeFile(fullPath, patchedContent);

      return `File ${fileName} patched successfully`;
    } catch (err) {
      throw new Error(`Error patching file ${fileName}: ${err.message}`);
    }
  };
}

export default FileOperation;
