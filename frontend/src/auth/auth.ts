import { AuthenticationError } from "../components/login/errors";
import {
  signIn as amplifySignIn,
  getCurrentUser,
  AuthUser,
  signUp,
  confirmSignUp,
} from "aws-amplify/auth";
import { Amplify } from "aws-amplify";

const PICTURE_PLACEHOLDER_STRING = "placeholder";

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

export async function registerNewUser(
  email: string,
  password: string,
  nickname: string
): Promise<void> {
  await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        picture: PICTURE_PLACEHOLDER_STRING,
        nickname,
        email,
      },
    },
  });
}

export async function confirmRegistration(
  username: string,
  confirmationCode: string
): Promise<void> {
  confirmSignUp({ username, confirmationCode });
}
