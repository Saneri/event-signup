import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import { AuthenticationError } from "../components/login/errors";
import { signIn as amplifySignIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";

const PICTURE_PLACEHOLDER_STRING = "placeholder";

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: import.meta.env.VITE_CLIENT_ID,
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
    },
  },
});

// global variable to keep the same user session between sign-in and new password challenge
let userWithSession: CognitoUser | null = null;

type SignInOutcome = {
  newPasswordRequired?: boolean;
};

export async function signIn(
  username: string,
  password: string
): Promise<SignInOutcome> {
  try {
    const { nextStep } = await amplifySignIn({
      username,
      password,
    });
    return {
      newPasswordRequired: !nextStep.signInStep,
    };
  } catch (error: any) {
    if (error.code === "NotAuthorizedException") {
      throw new AuthenticationError();
    } else if (error.code === "UserNotFoundException") {
      throw new AuthenticationError();
    } else {
      throw new Error(error.message);
    }
  }
}

export function signOut(): void {
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

export function getCurrentSession(): Promise<CognitoUserSession | null> {
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
        alert("getSession error: " + err.message || JSON.stringify(err));
        return reject(err);
      }

      return resolve(session);
    });
  });
}

export function completeNewPasswordChallenge(
  newPassword: string,
  nickname: string
): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    if (!userWithSession) {
      return reject(new Error("No user"));
    }
    userWithSession.completeNewPasswordChallenge(
      newPassword,
      { nickname, picture: PICTURE_PLACEHOLDER_STRING },
      {
        onSuccess: function (session: CognitoUserSession) {
          resolve(session);
        },

        onFailure: function (err: Error) {
          reject(new AuthenticationError(err.message || JSON.stringify(err)));
        },
      }
    );
  });
}

export function registerNewUser(
  email: string,
  password: string,
  nickname: string
): Promise<CognitoUser> {
  return new Promise((resolve, reject) => {
    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });
    const nickNameAttribute = new CognitoUserAttribute({
      Name: "nickname",
      Value: nickname,
    });
    const pictureAttribute = new CognitoUserAttribute({
      Name: "picture",
      Value: PICTURE_PLACEHOLDER_STRING,
    });

    const userPool = new CognitoUserPool(poolData);
    userPool.signUp(
      email,
      password,
      [emailAttribute, nickNameAttribute, pictureAttribute],
      [],
      function (err?: Error, result?: ISignUpResult) {
        if (err) {
          return reject(
            new AuthenticationError(err.message || JSON.stringify(err))
          );
        }

        if (!result) {
          return reject(new Error("No result"));
        }

        resolve(result.user);
      }
    );
  });
}

export function confirmRegistration(
  username: string,
  code: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

    cognitoUser.confirmRegistration(code, true, function (err: Error) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
