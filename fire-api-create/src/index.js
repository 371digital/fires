import { FireLogicRunner } from "371fire";
import path from "path";
import inquirer from "inquirer";
import {
  envFile,
  messagesIndexFile,
  modelsIndexFile,
  indexFile,
  exampleRouteMessageFile,
  exampleRouteModelFile,
  exampleRouteModelIndexFile,
  exampleRoutePostFile,
  exampleRouteGetFile,
  exampleRouteGetSingleFile,
  exampleRoutePatchFile,
  exampleRouteDeleteFile,
  exampleRouteValidationRulesFile,
} from "./fileDetails";

class FireApiCreate {
  constructor() {
    this.cwd = "";
    this.apiPath = "";
    this.runner = FireLogicRunner();
    this.initBaseVariables();
  }

  initBaseVariables() {
    this.name = "";
    this.cwd = process.cwd();
    this.apiPath = "";
  }

  initVariables(name) {
    this.name = name;
    this.apiPath = path.join(this.cwd, name);
  }

  getPath = (customPath) => path.join(this.apiPath, customPath);

  createFire = () =>
    this.createOperation("run", ["fire", "create", this.name], this.cwd);

  addEnv = () => this.createFile(".env", envFile);

  addFires = () =>
    this.updateJson("package.json", "fires", {
      "fire-api": "1.0.0",
      "fire-api-validation": "1.0.0",
      "fire-validation": "1.0.0",
      "fire-mongo": "1.0.0",
      "fire-api-response-message": "1.0.0",
    });

  createRoutes = () => this.createFolder("routes", "src");

  createMessages = () =>
    this.createFile("index.js", messagesIndexFile, "src/messages");

  createModels = () =>
    this.createFile("index.js", modelsIndexFile, "src/models");

  addAlias = () => {
    this.updateJson("jsconfig.json", "compilerOptions.paths", {
      messages: ["./src/messages"],
      models: ["./src/models"],
      routers: ["./src/routers"],
    });
    this.updateJson("package.json", "alias", {
      messages: "./src/messages",
      models: "./src/models",
      routers: "./src/routers",
    });
  };

  createIndexJs = () => this.updateFile("index.js", indexFile, "src");

  createExampleRoutes = () => {
    this.updateFile("index.js", exampleRouteMessageFile, "src/messages");
    this.createFile("index.js", exampleRouteModelFile, "src/models/blog");
    this.updateFile("index.js", exampleRouteModelIndexFile, "src/models");
    this.createFile("post.js", exampleRoutePostFile, "src/routes/blog");
    this.createFile("get.js", exampleRouteGetFile, "src/routes/blog");
    this.createFile("get[id].js", exampleRouteGetSingleFile, "src/routes/blog");
    this.createFile("patch[id].js", exampleRoutePatchFile, "src/routes/blog");
    this.createFile("delete[id].js", exampleRouteDeleteFile, "src/routes/blog");
    this.createFile(
      "index.js",
      exampleRouteValidationRulesFile,
      "src/validationRules"
    );
    this.updateJson("jsconfig.json", "compilerOptions.paths.validationRules", [
      "./src/validationRules",
    ]);
    this.updateJson(
      "package.json",
      "alias.validationRules",
      "./src/validationRules"
    );
  };

  fire = async (params) => {
    console.clear();
    const { initExampleRoute } = await inquirer.prompt({
      type: "confirm",
      name: "initExampleRoute",
      message: "Are you want example route?",
      default: true,
    });
    this.initVariables(params.name);
    this.createFire();
    this.addEnv();
    this.addFires();
    this.createRoutes();
    this.createMessages();
    this.createModels();
    this.addAlias();
    this.createIndexJs();
    if (initExampleRoute) await this.createExampleRoutes();
    const response = await this.runner.run();    
    if(!response.status) {
      throw new Error(response.logs.join("\n"))
    }
    console.log(`Api Create Successfuly. Now run:
  
cd ${params.name}
yarn install
yarn dev`)
    process.exit(0)
  };

  createOperation(operation, params, target) {
    return this.runner.command({
      operationName: operation,
      parameters: params,
      targetPath: target,
    });
  }

  createFile(name, content, dir = "") {
    return this.runner.file({
      operationName: "createFile",
      parameters: { fileName: name, content: content },
      targetPath: this.getPath(dir),
    });
  }

  updateFile(name, content, dir = "") {
    return this.runner.file({
      operationName: "updateFile",
      parameters: { fileName: name, content: content },
      targetPath: this.getPath(dir),
    });
  }

  updateJson(file, key, value) {
    return this.runner.json({
      operationName: "updateValue",
      parameters: { key: key, value: value },
      targetPath: this.getPath(file),
    });
  }

  createFolder(name, dir = "") {
    return this.runner.folder({
      operationName: "createFolder",
      parameters: { folderName: name },
      targetPath: this.getPath(dir),
    });
  }
}

export default new FireApiCreate().fire;
