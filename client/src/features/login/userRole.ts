import { type User } from '@auth0/auth0-react';

export const getUserRoles = (user: User | undefined): string[] => {
    if (user === undefined) {
        return [];
    }
    return user['https://my-app.example.com/roles'];
};

export const hasRole = (user: User | undefined, role: string): boolean => {
    const userRoles = getUserRoles(user);
    return userRoles.includes(role);
};
