//automate token fetching before tests

import generateToken from './tests/auth/login.spec';

async function autoRefreshToken() {
  await generateToken(); // fetch and save token
}

export default autoRefreshToken;
