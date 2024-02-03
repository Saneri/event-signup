export class NewPasswordRequiredError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NewPasswordRequiredError";
  }
}

export class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}
