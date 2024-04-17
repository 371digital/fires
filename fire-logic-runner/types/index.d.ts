import { CommandTask } from "./commandOperation";
import { FileTask } from "./fileOperation";
import { GitTask } from "./gitOperation";
import { FolderTask } from "./folderOperation";
import { JsonTask } from "./jsonOperation";

interface FireLogicRunner {
  command: (task: CommandTask) => FireLogicRunner;
  file: (task: FileTask) => FireLogicRunner;
  git: (task: GitTask) => FireLogicRunner;
  folder: (task: FolderTask) => FireLogicRunner;
  json: (task: JsonTask) => FireLogicRunner;
  run: () => Promise<{ status: boolean; logs: string[] }>;
}

export default function fire(): FireLogicRunner;
