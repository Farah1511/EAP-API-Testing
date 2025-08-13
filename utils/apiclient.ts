// Utility modules like apiclient.ts, tokenmanager.ts indicate abstracting common logic.

//request → Used to create a new API request context (kind of like Postman’s new session).
//APIRequestContext → Type that represents the API client/context you return (like a browser for APIs).
import { request, APIRequestContext } from '@playwright/test';

export async function apiRequest(token: string | undefined): Promise<APIRequestContext> {
 //Creates a new API request context (session) with custom headers.
  return await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', //tells server we’re sending/receiving JSON
    },
  });
}


