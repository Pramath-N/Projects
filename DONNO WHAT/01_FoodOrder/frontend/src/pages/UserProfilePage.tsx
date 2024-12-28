import { useGetMyUser, useUpdateUser } from "@/api/User.api"
import UserProfileForm from "@/forms/userProfileForm/UserProfileForm"

function UserProfilePage() {
  const {currentUser, isLoading: isGetLoading} = useGetMyUser();
  const {updateUser, isLoading: isUpdateLoading} = useUpdateUser();

  if(isGetLoading){
    return <span>Loading.....</span>
  }

  if(!currentUser){
    return <span>Unable to Load the User</span>
  }


  return <UserProfileForm  currentUser = {currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>

}

export default UserProfilePage
