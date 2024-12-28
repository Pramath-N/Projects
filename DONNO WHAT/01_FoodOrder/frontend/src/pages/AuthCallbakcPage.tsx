import { useCreateUser } from "@/api/User.api";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const {createUser} = useCreateUser();

    const hasCreated = useRef(false);

    useEffect(  () => {
        if(user?.sub && user?.email && !hasCreated.current){ 
            createUser({auth0Id: user?.sub!, email: user?.email!});
            hasCreated.current = true;
        }
        navigate('/');
    }, [user, createUser, navigate])

    return (
        <>Loading......</>
    )
}

export default AuthCallbackPage