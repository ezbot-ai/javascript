import { buildErrorThrower } from './error';

const errorThrower = buildErrorThrower({ packageName: '@clerk/shared' });

/**
 * Sets the package name for error messages during ClerkJS script loading.
 *
 * @example
 * setClerkJsLoadingErrorPackageName('@clerk/clerk-react');
 */
export function setClerkJsLoadingErrorPackageName(packageName: string) {
  errorThrower.setPackageName({ packageName });
}
