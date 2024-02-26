import { getUserSub } from '../auth/cognito';

export const verifyCognitoToken = async (accessToken: string | undefined): Promise<boolean> => {
    if (!accessToken) {
        return false;
    }
    const userSub = await getUserSub(accessToken.split(' ')[1]);
    if (!userSub) {
        return false;
    }
    return true;
};
