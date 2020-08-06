import React from 'react';
import {AuthProvider} from './authContext';

const ProviderCollection: React.FC = (props) => {
    return (
        <AuthProvider>
            {props.children}
        </AuthProvider>
    );
};

export default ProviderCollection;
