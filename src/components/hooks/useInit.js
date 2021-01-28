import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeFirebase, setupFirebaseAuth } from "../../api/firebase"
import { loadUser, startLoading } from "../../state/user"

export default function useInit () {

    const dispatch = useDispatch()
    
    function onAuthChanged ( firebaseUser ) {
        
        dispatch( loadUser( firebaseUser ))
        
    }
    
    
    useEffect(() => {
        
        dispatch( startLoading() ) 
        
        // Initialize Firebase
        initializeFirebase()

        // Authenticate
        setupFirebaseAuth( onAuthChanged )
        
    }, [])

    
}