// Get API spec file

import { test, expect } from '@playwright/test'; // import Playwright testing tools 'test' for testcases, and 'expect' for assertions.
import { apiRequest } from '../../utils/apiclient'; // imports context with token
import { validate200 } from '../../utils/helpers';
import { getToken } from '../../utils/tokenmanager';


// API Endpoint
const endpoint = '/gateway/api/v1/employee-access/DataSync/payroll/users/general-profile';

test.describe('Sample GET API Tests with positive & negative scanerios', () => {
  // valid token
test('GET Example API Request', async () => {
  const token = await getToken();
  const request = await apiRequest(token);
  const response = await request.get(endpoint);
  
  //Token-based GET response
//   console.log('Status:', response.status());
//   console.log('Headers:', response.headers());
//   console.log('Body:', await response.text()); // read raw response

  // expect(response.status()).toBe(200);
  // const json = await response.json();
  // console.log(json);

  //Call Reusable Validator
  validate200(response);

});
 
//Missing token
test('GET: Missing token returns 401', async () => {
  const request = await apiRequest('');
  const response = await request.get(endpoint);
  expect(response.status()).toBe(401);
});

// invalid token
test('GET: Invalid token returns 401', async () => {
  const request = await apiRequest("invalid token 123");
  const response = await request.get(endpoint);
  expect(response.status()).toBe(401);
});

//Validate Response Attributes
test('GET: Test Attributes', async () => {
  const token = await getToken();
  const request = await apiRequest(token);
  const response = await request.get(endpoint);

  validate200(response);
//Validate All Top-Level Keys Exist
  const body = await response.json();
  expect(body).toHaveProperty('employeeId');
  expect(body).toHaveProperty('profile');

//Validate Data Types of Attributes
  const { employeeId, profile } = await response.json();
  expect(typeof employeeId).toBe('string');
  expect(typeof profile.name).toBe('string');
  expect(typeof profile.department).toBe('string');
  expect(typeof profile.email).toBe('string');
  expect(typeof profile.isActive).toBe('boolean');
});


});
