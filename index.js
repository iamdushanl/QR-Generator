import { Command } from 'commander';
import inquirer from 'inquirer';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import winston from 'winston';

const program = new Command();

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

program
  .option('-u, --url <url>', 'URL to encode')
  .option('-o, --out <file>', 'Output file path', 'dist/qr_img.png')
  .option('-t, --text-file <file>', 'Save input URL to text file', 'dist/URL.txt')
  .option('--no-prompt', 'Do not prompt interactively')
  .parse(process.argv);

const options = program.opts();

async function generate(url, outPath, textFile) {
  try {
    if (!url) throw new Error('No URL provided');

    await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
    await fs.promises.mkdir(path.dirname(textFile), { recursive: true });

    await QRCode.toFile(outPath, url, { type: 'png' });
    await fs.promises.writeFile(textFile, url, 'utf8');

    logger.info(`QR generated at ${outPath}`);
    logger.info(`URL saved to ${textFile}`);
  } catch (err) {
    logger.error(err.message || err);
    process.exitCode = 1;
  }
}

async function main() {
  let url = options.url;

  if (!url && options.prompt) {
    const answers = await inquirer.prompt([
      { name: 'url', message: 'Enter your URL', type: 'input' },
      { name: 'out', message: 'Output file', type: 'input', default: options.out },
    ]);
    url = answers.url;
    options.out = answers.out || options.out;
  }

  if (!url) {
    console.error('No URL provided. Use --url or run interactively.');
    process.exit(2);
  }

  const outPath = options.out;
  const textFile = options.textFile;

  await generate(url, outPath, textFile);
}

main();
/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
