#!/usr/bin/env node
/*
 * index.js
 * author: evan kirkiles
 * created on Thu Oct 20 2022
 * 2022 the nobot space,
 */
import inquirer, { QuestionCollection } from 'inquirer';
import fs from 'fs';
import * as url from 'url';

type TemplatingAnswers = {
  projectChoice: string;
  projectName: string;
};

// define which projects are accessible
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const CURR_DIR = process.cwd();
const CHOICES = fs.readdirSync(`${__dirname}../templates`);
const QUESTIONS: QuestionCollection<TemplatingAnswers> = [
  {
    name: 'projectChoice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

// ask the questions about generating a project
inquirer.prompt<TemplatingAnswers>(QUESTIONS).then((answers) => {
  // parse the inquirer input
  const { projectChoice, projectName } = answers;
  const templatePath = `${__dirname}../templates/${projectChoice}`;
  // now create the temporary local directory
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  createDirectoryContents(templatePath, projectName);
  // project created.
  console.log('Successfully created.');
});

/**
 * Copies the contents of a template directory into the new project directory
 * @param templatePath
 * @param newProjectPath
 */
function createDirectoryContents(templatePath: string, newProjectPath: string) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      if (file === '.npmignore') file = '.gitignore';
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}
