// Utility modules like apiclient.ts, tokenmanager.ts indicate abstracting common logic.
//tokenManager.ts → reads token from JSON.

import fs from 'fs';     // fs => File System Node.js module, helps to read the file and use its data in code.
import path from 'path'; // path => Node.js module for working with file and directory paths. It helps to write the cross-platform compatible paths.

export async function getToken(): Promise<string> {
  // builds an absolute path to token file.
  // const tokenPath = path.resolve(__dirname, '../../data/authToken.json'); 
  const tokenPath = path.resolve(process.cwd(), 'data/authToken.json');

  //Checks whether the file exists before trying to read it.
  if (!fs.existsSync(tokenPath)) {
    throw new Error('authToken.json file not found');
  }

  // reads the contents of authToken.json file from disk as a text string, not binary.
  const data = fs.readFileSync(tokenPath, 'utf-8'); 
  const tokenData = JSON.parse(data);

  return tokenData.token;
}
