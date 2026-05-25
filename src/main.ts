#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";

import { promisify } from "util";
import { exec } from "child_process";

import {
    boilerEnv,
    BoilerPlates,
    packageBoiler,
    tsconfigBoiler,
} from "./util/boilerplate";

const Exec = promisify(exec);

const log = console.log;

const app = async () => {
    try {
        log(chalk.bgMagenta.whiteBright.bold("\n--- 💥 Welcome Team! 💥 ---\n"));

        // ASK PROJECT NAME
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "projectName",
                message: chalk.cyan(
                    "👉 Enter your project name: (type exit to close)"
                ),

                validate(input) {
                    if (!input.trim()) {
                        return "❌ Project name is required";
                    }

                    return true;
                },
            },
        ]);

        // EXIT CONDITION
        if (answers.projectName.toLowerCase() === "exit") {
            log(chalk.redBright.bold("\n👋 CLI Closed Successfully!\n"));
            process.exit(0);
        }

        //PROJECT NAME
        const projectName = answers.projectName;
        // PROJECT PATH
        const rootPath = process.cwd()
        const projectPath = path.join(rootPath, projectName);

        // FOLDER EXISTS CHECK
        if (fs.existsSync(projectPath)) {
            log(
                chalk.redBright(
                    "\n❌ Folder already exists!\n"
                )
            );

            process.exit(0);
        }

        // CREATE PROJECT FOLDER
        fs.mkdirSync(projectPath);

        // CREATE SRC FOLDER
        const srcPath = path.join(projectPath, "src");
        fs.mkdirSync(srcPath);

        //CONTROLLER AND ROUTER,MODEL,MIDDLEWARE
        const dir = [
            "controller",
            "router",
            "model",
            "middleware",
        ];
        dir.forEach((folder) => {
            const folderPath = path.join(srcPath, folder)
            fs.mkdirSync(folderPath)
        })

        // CREATE main.ts
        const mainFilePath = path.join(srcPath, "main.ts");
        fs.writeFileSync(mainFilePath, BoilerPlates(), "utf-8");

        // CREATE .env
        const envPath = path.join(projectPath, ".env");
        fs.writeFileSync(envPath, boilerEnv(), "utf-8");

        // CREATE package.json
        const packageJsonPath = path.join(projectPath, "package.json");
        fs.writeFileSync(packageJsonPath, packageBoiler(), "utf-8");

        // CREATE tsconfig.json
        const tsconfigPath = path.join(projectPath, "tsconfig.json");
        fs.writeFileSync(tsconfigPath, tsconfigBoiler(), "utf-8");


        // INSTALL NODE MODULES
        log(chalk.yellowBright("\n📦 Installing node modules...\n"));
        await Exec("npm install", { cwd: projectPath, });

        // SUCCESS MESSAGE
        log(chalk.greenBright(`\n✅ Project "${projectName}" created successfully!\n`));
        log(chalk.yellowBright("📁 src folder created"));
        log(chalk.cyanBright("📄 main.ts created"));
        log(chalk.magentaBright("📄 .env created"));
        log(chalk.blueBright("📄 package.json created"));
        log(chalk.greenBright("📄 tsconfig.json created"));
        log(chalk.whiteBright("📦 node_modules installed"));

        // NODE VERSION
        const { stdout } = await Exec("node -v");
        log(chalk.whiteBright(`\n🚀 Current Node Version: ${stdout}`));

        // AUTO RUN PROJECT
        log(chalk.greenBright("\n🚀 Starting Development Server...\n"));
        await Exec("npm run dev", { cwd: projectPath, });

    } catch (err) {
        if (err instanceof Error) {
            log(chalk.bgRed.white.bold(`🚫 Error: ${err.message}`)
            );
        }
    }
};

app();