#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { promisify } from "util";
import chalk from "chalk";
import { spawn } from "child_process";
import inquirer from "inquirer";
import boxen from "boxen";
import { fileURLToPath } from "url";
import gradient from "gradient-string";
import figlet from "figlet";
import ora from "ora";

// Promisify fs methods
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_DIR = path.resolve(__dirname, "../templates");

/**
 * Displays the welcome message with professional styling
 */
async function showWelcome() {
  console.clear();

  console.log(
    gradient.passion(
      figlet.textSync("  JEXIFY   ", {
        font: "Slant",
        horizontalLayout: "controlled smushing",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );

  const welcomeBox = boxen(
    chalk.cyanBright.bold(" SUPERCHARGE YOUR WEB DEVELOPMENT ") +
      "\n\n" +
      chalk.white("Get started with a modern, optimized Jexify project"),
    {
      padding: 1,
      margin: 1,
      borderStyle: "double",
      borderColor: "cyan",
      backgroundColor: "#1a1a2e",
      textAlignment: "center",
    }
  );

  console.log(welcomeBox);
}

/**
 * Validates project name with comprehensive checks
 */
function validateProjectName(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Project name must be a non-empty string");
  }

  let validated = name.trim();

  if (validated.length === 0) {
    throw new Error("Project name cannot be empty");
  }

  if (!/^[a-z0-9@._-]+$/i.test(validated)) {
    throw new Error(
      "Project name can only contain letters, numbers, @, ., _ and -"
    );
  }

  const reservedNames = ["node", "npm", "test", "jexify"];
  if (reservedNames.includes(validated.toLowerCase())) {
    throw new Error(`"${validated}" is a reserved name`);
  }

  if (validated.startsWith(".") || validated.startsWith("-")) {
    throw new Error("Project name cannot start with . or -");
  }

  if (validated.length > 50) {
    throw new Error("Project name is too long (max 50 characters)");
  }

  return validated;
}

/**
 * Processes template files with replacements
 */
async function processTemplateFiles(projectPath, projectName) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

  packageJson.name = projectName.toLowerCase().replace(/\s+/g, "-");

  await writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8"
  );
}

/**
 * Shows animated initialization messages
 */
async function showInitializationMessages() {
  const initSpinner = ora({
    text: chalk.cyan("Initializing project structure"),
    spinner: {
      frames: ["▰▱▱▱▱", "▰▰▱▱▱", "▰▰▰▱▱", "▰▰▰▰▱", "▰▰▰▰▰"],
      interval: 120,
    },
  }).start();

  await new Promise((resolve) => setTimeout(resolve, 1500));
  initSpinner.succeed(chalk.green("Project structure initialized"));

  const configSpinner = ora({
    text: chalk.cyan("Configuring settings"),
    spinner: {
      frames: ["▰▱▱▱▱", "▰▰▱▱▱", "▰▰▰▱▱", "▰▰▰▰▱", "▰▰▰▰▰"],
      interval: 120,
    },
  }).start();

  await new Promise((resolve) => setTimeout(resolve, 1500));
  configSpinner.succeed(chalk.green("Settings configured"));
}

/**
 * Installs project dependencies with progress display
 */
async function installDependencies(projectPath) {
  const spinner = ora({
    text: chalk.cyan("Installing dependencies"),
    spinner: {
      frames: ["▰▱▱▱▱", "▰▰▱▱▱", "▰▰▰▱▱", "▰▰▰▰▱", "▰▰▰▰▰"],
      interval: 120,
    },
  }).start();

  try {
    await runCommand("npm", ["install"], projectPath);
    spinner.succeed(chalk.green("Dependencies installed successfully"));
  } catch (error) {
    spinner.fail(chalk.red("Failed to install dependencies"));
    throw error;
  }
}

/**
 * Runs shell commands with error handling
 */
async function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${command} failed with exit code ${code}`));
        return;
      }
      resolve();
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Shows post-install success message
 */
function showSuccessMessage(projectName) {
  console.log();
  console.log(
    chalk.bold.cyan("Project Commands:\n") +
      chalk.dim("  Development:\n") +
      chalk.cyan(`  cd ${projectName}`) +
      chalk.dim("        # Enter project\n") +
      chalk.cyan("  npm run jexify") +
      chalk.dim("   # Start dev server\n") +
      chalk.dim("\n  Production:\n") +
      chalk.cyan("  npm run build") +
      chalk.dim("    # Create production build\n") +
      chalk.cyan("  npm run preview") +
      chalk.dim("  # Locally test production\n\n")
  );

  console.log(
    chalk.bold.blue("CREATED WITH ❤️  BY\n") +
      gradient.rainbow(figlet.textSync("JEXIFY", { font: "Mini", width: 60 })) +
      chalk.dim("\nLead Architect of Jexify Ecosystem\n") +
      chalk.cyan("GitHub: ") +
      chalk.white("https://github.com/shivamghode09/main-jexify\n")
  );

  console.log(chalk.yellow("⭐ Star us on GitHub!\n"));

  console.log(gradient.morning("Happy coding!"));
}

/**
 * Main function to create the Jexify app
 */
async function createJexifyApp() {
  try {
    await showWelcome();

    let projectName = process.argv[2];
    if (!projectName) {
      const { name } = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Project name:",
          validate: (input) => {
            try {
              validateProjectName(input);
              return true;
            } catch (error) {
              return error.message;
            }
          },
        },
      ]);
      projectName = name;
    }

    await showInitializationMessages();

    const projectPath = path.resolve(process.cwd(), projectName);
    await fs.promises.cp(path.join(TEMPLATE_DIR, "base"), projectPath, {
      recursive: true,
    });

    await processTemplateFiles(projectPath, projectName);
    await installDependencies(projectPath);

    showSuccessMessage(projectName);
  } catch (error) {
    console.error(
      boxen(
        chalk.redBright.bold(" ERROR ") + "\n\n" + chalk.white(error.message),
        { padding: 1, margin: 1, borderStyle: "round", borderColor: "red" }
      )
    );
    process.exit(1);
  }
}

// Start app
createJexifyApp();
