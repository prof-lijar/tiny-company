/**
 * Structured logger for server-side error tracking.
 * In a production environment, this could be extended to send logs to 
 * services like Sentry, Axiom, or Datadog.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  route?: string;
  userId?: string;
  params?: any;
  requestId?: string;
  [key: string]: any;
}

export const logger = {
  info: (message: string, context?: LogContext) => {
    console.info(`[INFO] ${new Date().toISOString()} - ${message}`, context ? JSON.stringify(context) : '');
  },
  warn: (message: string, context?: LogContext) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, context ? JSON.stringify(context) : '');
  },
  error: (message: string, error: unknown, context?: LogContext) => {
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, {
      ...errorDetails,
      ...context,
    });
  },
  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, context ? JSON.stringify(context) : '');
    }
  },
};
