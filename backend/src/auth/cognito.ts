import {
    CognitoIdentityProviderClient,
    GetUserCommand,
    NotAuthorizedException,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: 'eu-west-1' });

/**
 * Retrieves the sub (subject) attribute of a user from Cognito using the provided ID token.
 * @param accessToken - The idToken of the user.
 * @returns The sub attribute value of the user, or null if not found.
 */
export const getUserSub = async (accessToken: string): Promise<string | null> => {
    const command = new GetUserCommand({ AccessToken: accessToken });
    try {
        const response = await cognitoClient.send(command);
        return response.UserAttributes?.find((attr) => attr.Name === 'sub')?.Value || null;
    } catch (err: unknown) {
        if (!(err instanceof NotAuthorizedException)) {
            console.error(err);
        }
        return null;
    }
};

/**
 * Retrieves the nickname of a user from Cognito using the provided ID token.
 * @param accessToken - The idToken of the user.
 * @returns The nickname of the user, or null if not found.
 */
export const getUserNickname = async (accessToken: string): Promise<string | null> => {
    const command = new GetUserCommand({ AccessToken: accessToken });
    try {
        const response = await cognitoClient.send(command);
        return response.UserAttributes?.find((attr) => attr.Name === 'nickname')?.Value || null;
    } catch (err: unknown) {
        if (!(err instanceof NotAuthorizedException)) {
            console.error(err);
        }
        return null;
    }
};
