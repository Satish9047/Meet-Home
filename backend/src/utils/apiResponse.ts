/**
 * @class   ApiResponse
 * @public
 * @property  statusCode {number} - http status code
 * @property  data {T} - response data
 * @property  message {string} - response message
 * @property  success {boolean} - response success
 */
export class ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T, message = 'success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
