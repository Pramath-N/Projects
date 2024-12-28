import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: String,
    email: String,
};

export const useGetMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async () : Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        
        const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },

        });

        if(!response.ok){
            throw new Error("Failed to get the user");
        }
        return response.json();
    }

    const {
        data: currentUser,
        isLoading,
        error
    } = useQuery("fetchCurrentUser", getMyUserRequest);

    if(error){
        toast.error(error.toString());
    }

    return{currentUser, isLoading}
}

export const useCreateUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if(!response.ok){
            throw new Error(`Error creating user!`);
        }
    };  
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createUserRequest);
    
    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
};

type UpdateUserRequest = {
    name: string,
    addresLine1: string,
    city: string,
    country: string
}

export const useUpdateUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const updateUserRequest = async (formData : UpdateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
            method : 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            throw new Error("Failed to update the user")
        }

        return response.json();
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess, 
        error, 
        reset
    } = useMutation(updateUserRequest);

    if(isSuccess){
        toast.success("User updated successfully");
    }
    if(error){
        toast.error(error.toString());
        reset();
    }

    return {
        updateUser,
        isLoading,
    }
}