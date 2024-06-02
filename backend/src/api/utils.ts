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

/**
 * Extracts the event ID from a primary key which is of type "event_<UUID>".
 * @param primaryKey - The primary key string.
 * @returns The event ID extracted from the primary key, or undefined if the primary key is falsy.
 */
export const getEventIdFromPK = (primaryKey: string | undefined): string | undefined => {
    if (!primaryKey) {
        return undefined;
    }
    const FIND_ID_REGEX = /event_([0-9a-fA-F-]+)/;
    return primaryKey.match(FIND_ID_REGEX)?.[1];
};
