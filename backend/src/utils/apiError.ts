interface ErrorDetail {
  message: string;
}

//ERROR CLASS
/**
 * @class   ApiError
 * @public
 * @property  statusCode {number} - http status code
 * @property  message {string} - error message
 * @property  data {null} - error data
 * @property  success {boolean} - error success
 * @property  errors {ErrorDetail[]} - error details
 */
export class ApiError extends Error {
  statusCode: number;
  message: string;
  data: null;
  success: boolean;
  errors: ErrorDetail[];

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    errors: ErrorDetail[],
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = statusCode < 400;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
