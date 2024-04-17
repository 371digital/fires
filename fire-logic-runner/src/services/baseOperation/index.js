class BaseOperation {
  constructor(props) {
    this.operationType = props.operationType || "";
    this.tasks = props?.tasks || [];
    this.logs = [];
  }

  createLog = (log) => {
    this.logs.push(log);
  };

  executeTask = async ({ operationTask, parameters, targetPath }) => {
    try {
      const response = await operationTask(parameters, targetPath);
      return { status: true, response: response };
    } catch (error) {
      return { status: false, error: error };
    }
  };

  executeTasks = async () => {
    this.createLog(`Executing tasks starting for ${this.operationType}`);

    for (let index = 0; index < this.tasks.length; index++) {
      const task = this.tasks[index];
      this.createLog(
        `Executing task "${
          task.operationName
        }" with parameters "${JSON.stringify(task.parameters)}"`
      );

      const operationTask = this[task.operationName];

      if (typeof operationTask !== "function") {
        this.createLog(`Task ${task.operationName} does not exist`);
        return this.logs;
      }

      const executeResponse = await this.executeTask({
        ...task,
        operationTask,
      });

      if (!executeResponse.status) {
        this.createLog(
          `[${task.operationName}] Task Error: ${executeResponse.error}`
        );
        return {
          status: false,
          logs: this.logs,
        };
      }
      this.createLog(
        `[${task.operationName}] Task Success: ${executeResponse.response}`
      );
    }
    return {
      status: true,
      logs: this.logs,
    };
  };
}

export default BaseOperation;
