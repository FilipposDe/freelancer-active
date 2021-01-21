import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { initializeFirebase, setupFirebaseAuth, getUserDoc } from "../../api/firebase"
import { loadUser, setAuthenticatedUser } from "../../state/user"

export default function useInit () {

    const dispatch = useDispatch()
    
    function onAuthChanged ( firebaseUser ) {
        
        dispatch( loadUser( firebaseUser ))
        
    }
    
    
    useEffect(() => {
        
        // Initialize Firebase
        initializeFirebase()

        // Authenticate
        setupFirebaseAuth( onAuthChanged )
        
    }, [])

    
}