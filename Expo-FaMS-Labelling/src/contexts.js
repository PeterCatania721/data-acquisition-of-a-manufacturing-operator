import {createContext} from 'react';

// context to save all things related to the user connected
export const UserContext = createContext({userId: null, setUserId: () => {}});

// context to save if the user is connected to the internet
export const ConnectionContext = createContext({isConnected: false, setIsConnected: () => {}});