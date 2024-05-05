import { FireLogicRunner } from "371fire";
import path from "path";
import inquirer from "inquirer";
import {
  viteConfigFile,
  packageJsonFile,
  manifestJsonFile,
  indexHtmlFile,
  gitIgnoreFile,
  eslintrcFile,
  mainFile,
  indexCss,
  appJsx,
  appCss,
  favicon,
  codeJs,
} from "./fileDetails";

class FireFigmaPluginCreate {
  constructor() {
    this.cwd = "";
    this.pluginPath = "";
    this.runner = FireLogicRunner();
    this.initBaseVariables();
  }

  initBaseVariables() {
    this.name = "";
    this.cwd = process.cwd();
    this.pluginPath = "";
  }

  getPath = (customPath) => path.join(this.pluginPath, customPath);

  createFile = (name, content, dir = "") => {
    return this.runner.file({
      operationName: "createFile",
      parameters: { fileName: name, content: content },
      targetPath: this.getPath(dir),
    });
  };

  initVariables = (name) => {
    this.name = name;
    this.pluginPath = path.join(this.cwd, name);
  };

  addViteConfigFile = () => this.createFile("vite.config.js", viteConfigFile);

  addPackageJson = (name) =>
    this.createFile("package.json", packageJsonFile(name));

  addManifestJson = (params) =>
    this.createFile("manifest.json", manifestJsonFile(params));

  addIndexHtml = () => this.createFile("index.html", indexHtmlFile);

  addGitignore = () => this.createFile(".gitignore", gitIgnoreFile);

  addEslintrc = () => this.createFile(".eslintrc.cjs", eslintrcFile);

  addMainJsx = () => this.createFile("src/main.jsx", mainFile);

  addIndexCss = () => this.createFile("src/index.css", indexCss);

  addAppJsx = () => this.createFile("src/app.jsx", appJsx);

  addAppCss = () => this.createFile("src/app.css", appCss);

  addFavicon = () => this.createFile("public/appicon.svg", favicon);

  addCodeJs = () => this.createFile("lib/code.js", codeJs);

  fire = async (params) => {
    console.clear();
    const { displayName } = await inquirer.prompt({
      type: "input",
      name: "displayName",
      message: "What is your plugin display name?",
    });
    this.initVariables(params.name);
    this.addViteConfigFile();
    this.addPackageJson(params.name);
    this.addManifestJson({ name: params.name, displayName });
    this.addIndexHtml();
    this.addEslintrc();
    this.addMainJsx();
    this.addIndexCss();
    this.addAppJsx();
    this.addAppCss();
    this.addFavicon();
    this.addCodeJs();
    this.runner.run();
    const response = await this.runner.run();
    if (!response.status) {
      throw new Error(response.logs.join("\n"));
    }
    console.log(`Figma Plugin Create Successfuly. Now run:
  
cd ${params.name}
yarn install
yarn dev`);
    process.exit(0);
  };
}

export default new FireFigmaPluginCreate().fire;
