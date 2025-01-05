import { AuthenticationError } from "../components/login/errors";
import {
  signIn as amplifySignIn,
  getCurrentUser,
  AuthUser,
  signUp,
  confirmSignUp,
  signInWithRedirect,
} from "aws-amplify/auth";

const PICTURE_PLACEHOLDER_STRING = "placeholder";

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

export async function signInWithGoogle() {
  try {
    await signInWithRedirect({ provider: "Google" });
  } catch (error) {
    console.error(error);
  }
}
