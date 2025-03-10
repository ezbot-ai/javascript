/**
 * This file exports APIs that vary across runtimes (i.e. Node & Browser - V8 isolates)
 * as a singleton object.
 *
 * Runtime polyfills are written in VanillaJS for now to avoid TS complication. Moreover,
 * due to this issue https://github.com/microsoft/TypeScript/issues/44848, there is not a good way
 * to tell Typescript which conditional import to use during build type.
 *
 * The Runtime type definition ensures type safety for now.
 * Runtime js modules are copied into dist folder with bash script.
 *
 * TODO: Support TS runtime modules
 */

// @ts-ignore - These are package subpaths
import { webcrypto as crypto } from '#crypto';

type Runtime = {
  crypto: Crypto;
  fetch: typeof globalThis.fetch;
  AbortController: typeof globalThis.AbortController;
  Blob: typeof globalThis.Blob;
  FormData: typeof globalThis.FormData;
  Headers: typeof globalThis.Headers;
  Request: typeof globalThis.Request;
  Response: typeof globalThis.Response;
};

// Invoking the global.fetch without binding it first to the globalObject fails in
// Cloudflare Workers with an "Illegal Invocation" error.
//
// The globalThis object is supported for Node >= 12.0.
//
// https://github.com/supabase/supabase/issues/4417
const globalFetch = fetch.bind(globalThis);
export const runtime: Runtime = {
  crypto,
  fetch: globalFetch,
  AbortController: globalThis.AbortController,
  Blob: globalThis.Blob,
  FormData: globalThis.FormData,
  Headers: globalThis.Headers,
  Request: globalThis.Request,
  Response: globalThis.Response,
};
