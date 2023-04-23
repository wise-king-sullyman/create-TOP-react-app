import { program } from "commander";
import { scaffold } from "./scaffold.js";

program
  .argument("<dir>", "Name of the directory for the new project")
  .option("-ni, --noInstall")
  .action((dir, options) => {
    scaffold(dir, options.noInstall);
  });

program.parse();
