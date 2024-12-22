import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {

    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_AUTH0_CALLBACK_URL; 
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;


    if(!domain || !client_id || !redirect_uri || !audience) {
        throw new Error('Unable to initialize auth');
    }

    const onRedirectCallback = () => {
        navigate('/auth-callback');
    }

    return (
        <Auth0Provider 
        domain = {domain} 
        clientId={client_id} 
        authorizationParams={
            { 
                redirect_uri,
                audience
            }
        }
        onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate

