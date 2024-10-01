#!/usr/bin/env node

import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import open from 'open';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to clear the console
const clearConsole = () => console.clear();
const createGradient = (...colors) => gradient(...colors);

// Function to generate ASCII art title
const generateTitle = (text, font = 'Slant') =>
  new Promise((resolve, reject) =>
    figlet.text(text, { font }, (err, data) => (err ? reject(err) : resolve(data)))
  );

// Function to generate consistent boxes using boxen
const createBox = (content, title, color) => {
  const boxTitle = chalk.bold(title);
  return boxen(content, {
    title: boxTitle,
    padding: 1,
    borderStyle: 'round',
    borderColor: color,
  });
};

// Function to generate sections
const generateSection = (title, data, color) => {
  const content = data
    .map(([key, value]) => `  ${chalk.bold(key.padEnd(12))} ${chalk.green(value)}`)
    .join('\n');
  return createBox(content, title, color);
};

// Function to generate personal details, skills, and connection info
const generateInfo = () => {
  const personalDetails = [
    ['NAME', 'Souvik Ojha'],
    ['STATUS', 'Freelancer | Backend Engineer | Learner'],
    ['EMAIL', 'souvikojha707@gmail.com'],
    ['GITHUB', 'github.com/techsouvik'],
    ['WEBSITE', 'https://tecshouvik.github.io'],
  ];

  const skills = [
    ['LANGUAGES', 'JavaScript, TypeScript, Python'],
    ['FRAMEWORKS', 'Node, FastAPI, Flask'],
    ['TECHNOLOGIES', 'Node.js, Express, Redis, Kafka'],
    ['DATABASES', 'MongoDB, PostgreSQL, SQL, DynamoDB'],
    ['DEVOPS', 'Docker, GitHub'],
    ['TOOLS', 'Git, Firebase, AWS LAMBDA, SQS'],
  ];

  const connectInfo = `
  🌟 ${chalk.greenBright('Elevate Your Projects with Souvik')} 🌟

  ✨ ${chalk.greenBright('Innovative Freelancer')}
  ✨ ${chalk.greenBright('Backend Developer')}
  ✨ ${chalk.greenBright('Skilled Learner & Enthusiast')}

  A Backend Engineer helping you to create a business impact in this world!
  Let's collaborate and innovate something amazing.
  Thank you for exploring the CUI version!`;

  return `
${generateSection('🚀 PERSONAL DETAILS', personalDetails, 'cyan')}

${generateSection('🛠️ SKILLS', skills, 'yellow')}

${createBox(connectInfo, "💼 LET'S CONNECT", 'magenta')}
`;
};

// Function to display options
const displayOptions = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '👀 View LinkedIn Profile', value: 'linkedin' },
        { name: '🐙 View GitHub Profile', value: 'github' },
        { name: '🌐 Visit Website', value: 'website' },
        { name: '📄 View Resume', value: 'resume' },
        { name: '📧 Send Email', value: 'email' },
        { name: '👋 Exit', value: 'exit' },
      ],
    },
  ]);

// Function to handle selection actions
const handleSelection = async action => {
  const links = {
    linkedin: 'https://www.linkedin.com/in/souvikojha',
    github: 'https://github.com/techsouvik',
    website: 'https://techsouvik.github.io',
    email: 'mailto:souvikojha707@gmail.com',
    resume: 'https://bit.ly/souvikojha_resume'
  };

  if (links[action]) {
    await open(links[action]);
    console.log(chalk.green(`Opening ${action} in your default browser...`));
  }
};

// Function to pause and wait for user input
const pause = () => {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('\nPress Enter key to continue...', () => {
      rl.close();
      resolve();
    });
  });
};

// Main function
const main = async () => {
  try {
    clearConsole();
    const titleGradient = createGradient('cyan', 'magenta', 'yellow');
    const title = await generateTitle('SouvikOjha');
    console.log(titleGradient(title));

    const info = generateInfo();
    console.log(info);

    let continueLoop = true;

    while (continueLoop) {
      const { action } = await displayOptions();
      if (action === 'exit') {
        continueLoop = false;
      } else {
        await handleSelection(action);
        await pause();
        clearConsole();
        console.log(titleGradient(title));
        console.log(info);
      }
    }

    console.log(chalk.cyan('Thanks for visiting! Goodbye!'));
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();
