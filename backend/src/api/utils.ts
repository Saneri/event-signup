import { getUserSub } from '../auth/cognito';

/**
 * Retrieves the AWS Cognito sub associated with the provided access token.
 * @param accessToken - The bearer token used to authenticate the user.
 * @returns If succesful, returns Cognito sub string which is a static UUID for each used. If fails, returns an empty string.
 */
export const getCognitoToken = async (accessToken: string | undefined): Promise<string> => {
    if (process.env.MOCK_AUTH) {
        return process.env.MOCK_AUTH;
    }
    if (!accessToken) {
        return '';
    }
    const userSub = await getUserSub(accessToken.split(' ')[1]);
    if (!userSub) {
        return '';
    }
    return userSub;
};
