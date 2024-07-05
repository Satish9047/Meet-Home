export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  get token() {
    console.log('before expire check');
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      console.log('expired');
      return null;
    }
    console.log('after : not expired');
    return this._token;
  }
}
