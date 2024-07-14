interface ErrorDetail {
  message: string;
}

//ERROR CLASS
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
