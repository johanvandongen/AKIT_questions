import { type User } from '@auth0/auth0-react';

export const hasRole = (user: User | undefined, role: string): boolean => {
    if (user === undefined) {
        return false;
    }
    const userRoles: string[] = user['https://my-app.example.com/roles'];
    return userRoles.includes(role);
};
