import { useEffect, useState } from "react"
import { initializeFirebase, authenticateFirebase, getFirestore, getUserDoc } from "./firebase"

export function useInit( setLoading ) {

    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState({})

    async function onAuthChanged( firebaseUser ) {
        setUser( firebaseUser )
        
        const data = firebaseUser ? await getUserDoc( firebaseUser ) : {}
        setUserData( data )
        
        setLoading( false )
    }
    
    
    useEffect(() => {
        
        setLoading( true )
        
        // Initialize Firebase
        initializeFirebase()

        // Authenticate
        authenticateFirebase( onAuthChanged )
        
    }, [])


    return { user, userData }


}