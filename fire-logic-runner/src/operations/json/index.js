import { BaseOperation } from "../../services";
import fs from "fs/promises";

class JsonOperation extends BaseOperation {
  constructor(props) {
    super(props);
  }

  updateValue = async ({ key, value }, targetPath = "") => {
    const fullPath = targetPath;

    try {
      let fileContent = await fs.readFile(fullPath, { encoding: "utf8" });
      let jsonContent = JSON.parse(fileContent);

      const keys = key.split(".");
      let current = jsonContent;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current)) {
          current[k] = {};
        }
        current = current[k];
      }
      current[keys[keys.length - 1]] = value;

      await fs.writeFile(fullPath, JSON.stringify(jsonContent, null, 2));

      return `JSON file ${targetPath} updated successfully with key ${key}`;
    } catch (err) {
      throw new Error(`Error updating JSON file ${targetPath}: ${err.message}`);
    }
  };
}

export default JsonOperation;
