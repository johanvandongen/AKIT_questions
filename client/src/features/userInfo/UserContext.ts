import { createContext } from 'react';

export const UserContext = createContext<{ userRole: string[] }>({ userRole: [] });
