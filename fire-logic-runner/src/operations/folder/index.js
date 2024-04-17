import { BaseOperation } from "../../services";
import fs from "fs/promises";
import path from "path";

class FolderOperation extends BaseOperation {
  constructor(props) {
    super(props);
  }

  async createFolder({ folderName }, targetPath = "") {
    const fullPath = path.join(targetPath, folderName);
    try {
      await fs.mkdir(fullPath, { recursive: true });
      return `Folder ${folderName} created successfully`;
    } catch (err) {
      throw new Error(`Error creating folder ${folderName}: ${err.message}`);
    }
  }

  async deleteFolder({ folderName }, targetPath = "") {
    const fullPath = path.join(targetPath, folderName);
    try {
      await fs.rmdir(fullPath, { recursive: true });
      return `Folder ${folderName} deleted successfully`;
    } catch (err) {
      throw new Error(`Error deleting folder ${folderName}: ${err.message}`);
    }
  }

  async renameFolder({ oldFolderName, newFolderName }, targetPath = "") {
    const oldFullPath = path.join(targetPath, oldFolderName);
    const newFullPath = path.join(targetPath, newFolderName);
    try {
      await fs.rename(oldFullPath, newFullPath);
      return `Folder ${oldFolderName} renamed to ${newFolderName} successfully`;
    } catch (err) {
      throw new Error(`Error renaming folder from ${oldFolderName} to ${newFolderName}: ${err.message}`);
    }
  }
}

export default FolderOperation;
