const prepareUserObject = user => {

    if ( !user ) return {}
   
    if ( !user?.uid || !user?.email  ) throw new Error("User API could not retrieve needed credentials from user object")

    return {
        email: user.email,
        uid: user.uid
    }
}

const userAPI = {
    prepareUserObject,
}

export default userAPI