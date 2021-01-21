import { getUserDoc } from "./firebase"

const fetchUserData = async ( user ) => {
    if ( !user?.uid || !user?.email  ) throw new Error("Authorized user was not provided")

    const userData = await getUserDoc(user)
    return userData
}

const dbAPI = {
    fetchUserData
}

export default dbAPI