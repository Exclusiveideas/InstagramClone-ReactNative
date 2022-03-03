import React from 'react';
import { SignedInStack, SignedOutStack } from './navigation';
import { useStateValue } from './StateProvider';

const AuthNavigation = () => {
    const [{ user }, dispatch] = useStateValue();

    return <>
        {user ? <SignedInStack /> : <SignedOutStack />}
    </>
}

export default AuthNavigation