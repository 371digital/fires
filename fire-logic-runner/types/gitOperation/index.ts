export type CloneDetails = {
  repositoryUrl: string;
  directoryName: string;
};

export type BranchDetails = {
  branchName: string;
};

export type CheckoutCommitDetails = {
  commitHash: string;
};

export type CommitChangesDetails = {
  commitMessage: string;
};

export type PushDetails = {
  remoteName?: string;
  branchName: string;
};

export type PullDetails = {
  remoteName?: string;
  branchName: string;
};

export type MergeDetails = {
  sourceBranch: string;
  targetBranch: string;
};

export type FetchDetails = {
  remoteName?: string;
};

export type RebaseDetails = {
  branchName: string;
};

export type StashOptions = {
  includeUntracked?: boolean;
};

export type GitTask =
  | { operationName: "clone"; targetPath: string; parameters: CloneDetails }
  | {
      operationName: "checkoutBranch";
      targetPath: string;
      parameters: BranchDetails;
    }
  | {
      operationName: "createBranch";
      targetPath: string;
      parameters: BranchDetails;
    }
  | {
      operationName: "checkoutCommit";
      targetPath: string;
      parameters: CheckoutCommitDetails;
    }
  | {
      operationName: "commitChanges";
      targetPath: string;
      parameters: CommitChangesDetails;
    }
  | { operationName: "push"; targetPath: string; parameters: PushDetails }
  | { operationName: "pull"; targetPath: string; parameters: PullDetails }
  | { operationName: "merge"; targetPath: string; parameters: MergeDetails }
  | { operationName: "fetch"; targetPath: string; parameters: FetchDetails }
  | { operationName: "rebase"; targetPath: string; parameters: RebaseDetails }
  | { operationName: "stash"; targetPath: string; parameters: StashOptions }
  | { operationName: "stashList"; targetPath: string; parameters: {} };
