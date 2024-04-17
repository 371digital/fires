export type FileDetails = {
  fileName: string;
  content?: string;
};

export type FileNameDetails = {
  fileName: string;
};

export type FileUpdateDetails = {
  fileName: string;
  content: string;
};

export type FilePatchDetails = {
  fileName: string;
  oldContent: string;
  newContent: string;
};

export type FileTask =
  | { operationName: "createFile"; targetPath: string; parameters: FileDetails }
  | {
      operationName: "deleteFile";
      targetPath: string;
      parameters: FileNameDetails;
    }
  | {
      operationName: "updateFile";
      targetPath: string;
      parameters: FileUpdateDetails;
    }
  | {
      operationName: "patchFile";
      targetPath: string;
      parameters: FilePatchDetails;
    };
