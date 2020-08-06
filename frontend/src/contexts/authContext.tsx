import React, {useEffect, useState} from 'react';
import {User} from "firebase";
import {auth} from "../firebase";
// import {auth} from '../firebase';

interface IAuthContextProps {
    user: User | null;
}

const AuthContext = React.createContext<Partial<IAuthContextProps>>({user: null});

export const AuthProvider: React.FC = (props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setUser(userAuth);
        });
    });

    return (
        <AuthContext.Provider value={{user}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
