import degit from "degit";
import { spawn } from "child_process";

function handleDepInstallationExit(exitCode, directoryName) {
  if (exitCode === 0) {
    console.log(
      "\nProject dependencies installed successfully! You can enter your new project directory now by running"
    );
    console.log(`\ncd ${directoryName}`);
    console.log("\nThen you can start the development server using:");
    console.log("\nnpm start");
  } else {
    console.log("\nProject dependency installtion failed");
  }
}

function handleTemplateCloneSuccess(directoryname, skipDepsInstall) {
  if (skipDepsInstall) {
    console.log(
      "\nProject template cloned successfully! You can enter your new project directory now by running"
    );
    console.log(`\ncd ${directoryname}`);
    return;
  }

  console.log("Project template cloned successfully, installing deps:");

  const installDeps = spawn("npm", ["install"], {
    cwd: directoryname,
    stdio: "inherit",
  });

  installDeps.on("exit", (exitCode) =>
    handleDepInstallationExit(exitCode, directoryname)
  );
}

function handleTemplateCloneFailure(error, directoryName) {
  console.error("Error encountered when trying to clone template.");
  if (error.code === "DEST_NOT_EMPTY") {
    console.error(
      `It looks like ${directoryName} already exists.\nEither choose a new directory name or remove the directory`
    );
  } else {
    console.error("\nError:\n", error);
  }
}

export function scaffold(directoryName, skipDepsInstall) {
  const template = degit("wise-king-sullyman/create-TOP-react-app-template");

  template.clone(directoryName).then(
    () => handleTemplateCloneSuccess(directoryName, skipDepsInstall),
    (error) => handleTemplateCloneFailure(error, directoryName)
  );
}
