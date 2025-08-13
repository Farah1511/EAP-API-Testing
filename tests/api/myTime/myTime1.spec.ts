
import { test, expect } from '@playwright/test';
import { apiRequest } from '../../../utils/apiclient';
import { getToken } from '../../../utils/tokenmanager';
import { validate200, validate400, validate401, validate403, validate415, validate500 } from '../../../utils/helpers';
import { validPayload, invalidDataPayload, missingFieldsPayload, specialCharsPayload, maxLengthPayload } from '../../../data/payloads/myTime/addTimeEntry';

// API Endpoint
const endpoint = '/gateway/api/v1/employee-access/Employee/time-entry';

test.describe('Sample POST API Tests with positive & negative scanerios', () => {
  //Valid token
test('Execute API call with valid Request body', async () => {
    //Calls the 'getToken()' function from "tokenmanager.ts" and store the token string in variable 'token'.
  const token = await getToken();
    // calls "apiRequest()" function from "apiclient.ts" file and pass token
  const request = await apiRequest(token);
  const response = await request.post(endpoint, {
    data: validPayload,
  });
  const status = response.status();
  console.log('Status:', status);
  validate200(response); //Created (As API endpoint is designed to return 200 )
});

  // invalid token
test('API call for invalid authorization token', async () => {
  const request = await apiRequest('invalid-token-123');
  const response = await request.post(endpoint , {
      data: validPayload,
    });
  const status = response.status();
  console.log('Status:', status);
  if (status === 401) validate401(response);
  else if (status === 403) validate403(response);
  else if (status === 500) validate500(response);
  else throw new Error(`Unexpected status: ${status}`);
});

// Empty Token
  test('API call for Missing or empty authorization token', async () => {
    const request = await apiRequest('');
    const response = await request.post(endpoint, {
      data: validPayload,
    });
  const status = response.status();
  console.log('Status:', status);
  if (status === 401) validate401(response);
  else if (status === 403) validate403(response);
  else if (status === 500) validate500(response);
  else throw new Error(`Unexpected status: ${status}`);
  });

  // invalid data types
    test('API call for invalid data types', async () => {
    const token = await getToken();
    const context = await apiRequest(token);
    console.log("the invalid payload is : ", invalidDataPayload);
    const response = await context.post(endpoint, { 
      data: invalidDataPayload 
    });
    console.log('Status:', response.status());
    if (response.status() === 400) validate400(response);
    else if (response.status() === 422) {
      expect(response.status()).toBe(422); // Optional
    }
  });

  // empty body
  test('API call by sending an empty body', async () => {
    const token = await getToken();
    const context = await apiRequest(token);
    const response = await context.post(endpoint);
    validate415(response);
    console.log(response);
  });

  // Missing required fields
  test('API call for missing required fields', async () => {
    const token = await getToken();
    const context = await apiRequest(token);
    const response = await context.post(endpoint, { 
      data: missingFieldsPayload 
    });
    validate400(response);
    const responseBody = await response.json();
    expect(responseBody.message || responseBody.error || JSON.stringify(responseBody)).toContain('Please fill all the required parameters');
  });

  // Special characters in input fields
  test('API call for Special characters in input fields', async () => {
    const token = await getToken();
    const context = await apiRequest(token);
    const response = await context.post(endpoint, { 
      data: specialCharsPayload 
    });
    console.log('Status:', response.status());
    expect([400, 422]).toContain(response.status());
  });
  
  // Max input size
  test('API call for max length parameters', async () => {
    const token = await getToken();
    const context = await apiRequest(token);
    const response = await context.post(endpoint, { 
      data: maxLengthPayload 
    });
    validate400(response);
    const responseBody = await response.json();
    expect(JSON.stringify(responseBody)).toContain('Please fill all the required parameters');
  });

});
