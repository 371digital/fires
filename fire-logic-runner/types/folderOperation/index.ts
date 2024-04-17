export type FolderDetails = {
  folderName: string;
};

export type FolderRenameDetails = {
  oldFolderName: string;
  newFolderName: string;
};

export type FolderTask =
  | {
      operationName: "createFolder";
      targetPath: string;
      parameters: FolderDetails;
    }
  | {
      operationName: "deleteFolder";
      targetPath: string;
      parameters: FolderDetails;
    }
  | {
      operationName: "renameFolder";
      targetPath: string;
      parameters: FolderRenameDetails;
    };
