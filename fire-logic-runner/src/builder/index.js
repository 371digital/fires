import { Command, File, Git, Folder, Json } from "../operations";

class Builder {
  constructor() {
    this.operations = {
      command: Command,
      file: File,
      git: Git,
      folder: Folder,
      json: Json,
    };
    this.operationList = [];
  }

  command = ({ operationName, parameters, targetPath }) => {
    this.operationList.push({
      operationType: "command",
      tasks: [
        {
          operationName,
          parameters,
          targetPath,
        },
      ],
    });
    return this;
  };

  file = ({ operationName, parameters, targetPath }) => {
    this.operationList.push({
      operationType: "file",
      tasks: [
        {
          operationName,
          parameters,
          targetPath,
        },
      ],
    });
    return this;
  };

  git = ({ operationName, parameters, targetPath }) => {
    this.operationList.push({
      operationType: "git",
      tasks: [
        {
          operationName,
          parameters,
          targetPath,
        },
      ],
    });
    return this;
  };

  folder = ({ operationName, parameters, targetPath }) => {
    this.operationList.push({
      operationType: "folder",
      tasks: [
        {
          operationName,
          parameters,
          targetPath,
        },
      ],
    });
    return this;
  };

  json = ({ operationName, parameters, targetPath }) => {
    this.operationList.push({
      operationType: "json",
      tasks: [
        {
          operationName,
          parameters,
          targetPath,
        },
      ],
    });
    return this;
  };

  run = async () => {
    const logs = [];

    for (let index = 0; index < this.operationList.length; index++) {
      const operation = this.operationList[index];

      const OperationFunction = this.operations[operation.operationType];
      if (typeof OperationFunction !== "function")
        return {
          status: false,
          error: `${operation.operationType} not found.`,
        };

      const operationInstance = new OperationFunction(operation);
      const executeResponse = await operationInstance.executeTasks();
      if (!executeResponse.status)
        return {
          status: false,
          logs: [...logs, executeResponse.logs],
        };
      logs.push(...executeResponse.logs);
    }

    return {
      status: true,
      logs,
    };
  };
}

export default Builder;
