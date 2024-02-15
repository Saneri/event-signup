import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import {
  AuthenticationError,
  NewPasswordRequiredError,
} from "../components/login/errors";

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

export function signIn(
  username: string,
  password: string
): Promise<CognitoUserSession> {
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userPool = new CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result: CognitoUserSession) {
        resolve(result);
      },

      onFailure: function (err: Error) {
        reject(new AuthenticationError(err.message || JSON.stringify(err)));
      },

      newPasswordRequired: function () {
        reject(new NewPasswordRequiredError("New password required"));
      },
    });
  });
}

export function signOut() {
  const userPool = new CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser) {
    cognitoUser.signOut();
  }
}

export function getCurrentUser(): Promise<
  CognitoUserAttribute[] | undefined | null
> {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      return resolve(null);
    }
    cognitoUser.getSession(function (
      err: Error,
      session: CognitoUserSession | null
    ) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return reject(err);
      }

      if (!session) {
        alert("No session");
        return resolve(null);
      }

      cognitoUser.getUserAttributes(function (err, attributes) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return reject(err);
        }
        return resolve(attributes);
      });
    });
  });
}
