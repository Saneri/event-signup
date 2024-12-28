import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import { AuthenticationError } from "../components/login/errors";
import {
  signIn as amplifySignIn,
  getCurrentUser,
  AuthUser,
} from "aws-amplify/auth";
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

type SignInOutcome = {
  emailConfirmation: boolean;
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
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      return { emailConfirmation: true };
    }
    return { emailConfirmation: false };
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

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch (error) {
    return null;
  }
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
