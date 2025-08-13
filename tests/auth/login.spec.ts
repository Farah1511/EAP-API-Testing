// Get Token from Login and write it in 'authToken.json' file
import { request } from '@playwright/test';   // helps to create HTTP requests without launching a browser UI. Great for API calls.
import fs from 'fs';                          // Node.js module for reading/writing files.
import path from 'path';                      // Node.js module for handling file paths safely on Windows/Linux/macOS.

async function generateToken() {              // asynchronous function declaration
  const loginURL = 'https://next.citysuite.dev/auth/realms/CitySuiteNext/protocol/openid-connect/token';   // OAuth token endpoint

  const context = await request.newContext();     // create new context /  new isolated HTTP client
  const response = await context.post(loginURL, { // send login request
    form: {
      client_id: 'citysuite-employee-portal',     // identifies app to the auth server.
      username: 'hicksa',
      password: '123456',
      grant_type: 'password',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.status() !== 200) {
    throw new Error(`❌ Failed to fetch token: ${response.status()}`);
  }

  const { access_token } = await response.json();         // Converts the response body into a JS object.
  const filePath = path.resolve(__dirname, '../../data/authToken.json');  
  fs.writeFileSync(filePath, JSON.stringify({ token: access_token }, null, 2), 'utf-8');  // Creates or overwrites authToken.json.
  console.log('✅ Token saved');
}

export default generateToken;             // Allows to import and run this function from other files, e.g autoRefreshToken.ts to refresh token automatically.