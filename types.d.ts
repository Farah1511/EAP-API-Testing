// issue at import leavePayload from '../../../data/payloads/myTimeOff/payload.json'; in "postapi.spec.ts" so we add this

// This custom type declaration file tells TypeScript how to handle imports of .json files, especially when you're using them like this:
//import data from './some/path/data.json';
//By default, TypeScript doesn't know how to type .json imports unless certain settings are enabled.
declare module "*.json" {
  const value: any;              // Treat the imported JSON as any type
  export default value;          // Use ES6 default import syntax
}
