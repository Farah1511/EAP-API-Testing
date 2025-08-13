//Put reusable logic here (e.g., date formatting, response validation)

import { APIResponse, expect } from '@playwright/test'; // import Playwright testing tools 'test' for testcases, and 'expect' for assertions.

//Validate a successful 200 OK response
export function validate200(response: APIResponse) {
  expect(response.status(), 'Expected status 200').toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 201 Created response
export function validate201(response: APIResponse) {
  expect(response.status(), 'Expected status 201').toBe(201);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 204 No Content response
export function validate204(response: APIResponse) {
  expect(response.status(), 'Expected status 204').toBe(204);
  //expect(await response.text(), 'Expected empty body for 204').toBe('');
}

//Validate a 400 Bad Request response
export function validate400(response: APIResponse) {
  expect(response.status(), 'Expected status 400').toBe(400);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 401 Unauthorized response
export function validate401(response: APIResponse) {
  expect(response.status(), 'Expected status 401').toBe(401);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 403 Forbidden response
export function validate403(response: APIResponse) {
  expect(response.status(), 'Expected status 403').toBe(403);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 404 Not Found response
export function validate404(response: APIResponse) {
  expect(response.status(), 'Expected status 404').toBe(404);
  expect(response.headers()['content-type']).toContain('application/json');
}
 
 //Validate a 415  for Unsupported Media Type
export function validate415(response: APIResponse) {
  expect(response.status()).toBe(415);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 422 Unprocessable Entity response
export function validate422(response: APIResponse) {
  expect(response.status(), 'Expected status 422').toBe(422);
  expect(response.headers()['content-type']).toContain('application/json');
}

//Validate a 500 Internal Server Error response
export function validate500(response: APIResponse) {
  expect(response.status(), 'Expected status 500').toBe(500);
  expect(response.headers()['content-type']).toContain('application/json');
}



