import { getUserDoc, updateUserDoc } from "./firebase"

const fetchUserData = async ( user ) => {
    if ( !user?.uid || !user?.email  ) throw new Error("Authorized user was not provided")

    const userData = await getUserDoc(user)
    return userData
}

const updateUserSettings = async ( user, settings ) => {
    if ( !user?.uid || !user?.email  ) throw new Error("Authorized user was not provided")

    await updateUserDoc(user, settings)
}

const dbAPI = {
    fetchUserData,
    updateUserSettings,
}

export default dbAPI