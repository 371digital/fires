import { BaseOperation } from "../../services";
import { exec } from "child_process";
import util from "util";
const execAsync = util.promisify(exec);

class GitOperation extends BaseOperation {
  constructor(props) {
    super(props);
  }

  clone = async ({ repositoryUrl, directoryName }, targetPath = "") => {
    const command = `git clone ${repositoryUrl} ${directoryName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error cloning repository: ${error.message}`);
    }
  };

  checkoutBranch = async ({ branchName }, targetPath = "") => {
    const command = `git checkout ${branchName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(
        `Error checking out branch ${branchName}: ${error.message}`
      );
    }
  };

  createBranch = async ({ branchName }, targetPath = "") => {
    const command = `git branch ${branchName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error creating branch ${branchName}: ${error.message}`);
    }
  };

  checkoutCommit = async ({ commitHash }, targetPath = "") => {
    const command = `git checkout ${commitHash}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error checking out commit ${commitHash}: ${error.message}`);
    }
  };

  commitChanges = async ({ commitMessage }, targetPath = "") => {
    const command = `git commit -m "${commitMessage}"`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error committing changes: ${error.message}`);
    }
  };

  push = async ({ remoteName = "origin", branchName }, targetPath = "") => {
    const command = `git push ${remoteName} ${branchName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error pushing to ${remoteName}/${branchName}: ${error.message}`);
    }
  };

  pull = async ({ remoteName = "origin", branchName }, targetPath = "") => {
    const command = `git pull ${remoteName} ${branchName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error pulling from ${remoteName}/${branchName}: ${error.message}`);
    }
  };

  merge = async ({ sourceBranch, targetBranch }, targetPath = "") => {
    await this.checkoutBranch({ branchName: targetBranch }, targetPath);
    const command = `git merge ${sourceBranch}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error merging ${sourceBranch} into ${targetBranch}: ${error.message}`);
    }
  };

  fetch = async ({ remoteName = "origin" }, targetPath = "") => {
    const command = `git fetch ${remoteName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error fetching from ${remoteName}: ${error.message}`);
    }
  };

  rebase = async ({ branchName }, targetPath = "") => {
    const command = `git rebase ${branchName}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error rebasing onto ${branchName}: ${error.message}`);
    }
  };

  stash = async (options = {}, targetPath = "") => {
    const command = `git stash ${options.includeUntracked ? '--include-untracked' : ''}`;
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error stashing changes: ${error.message}`);
    }
  };

  stashList = async (options = {}, targetPath = "") => {
    const command = "git stash list";
    try {
      const { stdout, stderr } = await execAsync(command, { cwd: targetPath });
      if (stderr) throw new Error(stderr);
      return stdout;
    } catch (error) {
      throw new Error(`Error listing stashes: ${error.message}`);
    }
  };
};

export default GitOperation;
