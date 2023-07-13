import { type User } from '@auth0/auth0-react';

/** Get a list of roles for a given user. */
export const getUserRoles = (user: User | undefined): string[] => {
    if (user === undefined) {
        return [];
    }
    return user['https://my-app.example.com/roles'];
};

/** Checks whether the given user has the specified role. */
export const hasRole = (user: User | undefined, role: string): boolean => {
    const userRoles = getUserRoles(user);
    return userRoles.includes(role);
};
