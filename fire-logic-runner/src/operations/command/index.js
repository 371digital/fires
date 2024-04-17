import { BaseOperation } from "../../services";
import { exec } from "child_process";
import path from "path";

class Command extends BaseOperation {
  constructor(props) {
    super(props);
  }

  run = async (parameters = [], targetPath = "") => {
    return await new Promise((resolve, reject) => {
      const command = parameters.join(" ");
      const fullPath = path.resolve(targetPath);

      exec(command, { cwd: fullPath }, (error, stdout, stderr) => {
        if (error) {
          console.log("error", error)
          reject(error);
        }
        if (stderr) {
          console.log("stderr", stderr)
          reject(stderr);
        }

        resolve(stdout);
      });
    });
  };
}

export default Command;
