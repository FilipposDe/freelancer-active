import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/analytics"

export function initializeFirebase() {

    if ( firebase.apps.length ) return

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORABE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    }

    firebase.initializeApp( firebaseConfig )

}

export function authenticateFirebase( onAuthChangedCb ) {

    const provider = new firebase.auth.GoogleAuthProvider()
    
    // On auth change
    firebase.auth().onAuthStateChanged( function( user ) {

        onAuthChangedCb( user )
        

        if ( !user ) {
            // Authenticate
            try {
                firebase.auth().signInWithPopup( provider )
            } catch ( error ) {
                const { code, message } = error
                console.error( message )
                throw new Error("Unable to authenticate user")
            }
        }
    } )
    
    
    
}


export async function logoutUser() {
    try {
        await firebase.auth().signOut()
    } catch (error) {
        const { code, message } = error
        console.error( error )
        throw new Error("Sign out failed")
    }
} 


export function getFirestore() {
    return firebase.firestore()
}


export async function getUserDoc( user ) {
    const db = firebase.firestore()
    const docRef = db.collection("users").doc( user.uid )
    
    let doc
    try {
        doc = await docRef.get()
    } catch (error) {
        console.error(error)
        throw new Error("Error while accessing user data")        
    }
    
    // Create new document if user does not exist
    if (!doc.exists) {
        try {

            const newData = {
                uid: user.uid,
                email: user.email,
                options: {},
            // Avoid overwrite
            }
            await docRef.set( newData, { merge: true })
            return newData

        } catch (error) {
            console.error(error)
            throw new Error("Error while creating new user data")   
        }
        
    }

    return doc.data()

}





