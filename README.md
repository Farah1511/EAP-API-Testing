# EAP API Testing Framework

# Overview
This is a "custom-built API automation framework" created from scratch using Playwright with TypeScript.  
It is designed for modular, scalable, and maintainable API testing across different modules of the EAP application.

Currently, the "MyTime" module APIs are fully automated, while other modules are under development.  
The framework emphasizes reusability, code abstraction, and token-based authentication.

# Project Modules
The application under test consists of multiple modules.  
- Profile (planned)  
- Dashboard (planned)  
- MyTime  (Automated) 
- MyTimeOff (planned)  
- MyRequests (planned)

# Authentication Flow
- "login.spec.ts" → Executes the Login API request and fetches a fresh Auth Token.  
- Token Handling: 
  - Token is written to "authToken.json" after every login.  
  - This ensures fresh token retrieval before each test run.  
- "tokenmanager.ts" → Reads the token from "authToken.json" whenever required in test cases.

# Utility Modules
The framework follows a utility-based architecture to avoid code duplication:
- "apiclient.ts" →  
  - Centralized HTTP request handling.  
- "tokenmanager.ts" →  
  - Reads stored token from JSON file.  
  - Provides token to API requests for authorization.# 📁 Project Structure
