import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/analytics"

export function initializeFirebase () {

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

export function setupFirebaseAuth ( onAuthChangedCb ) {

    // On auth change
    firebase.auth().onAuthStateChanged( function ( user ) {

        onAuthChangedCb( user )
        
    } )
    
    
    
}


export const showFirebaseLogin = () => {
    
    const provider = new firebase.auth.GoogleAuthProvider()
    
    provider.setCustomParameters({
        "prompt": "select_account"
    })


    // Authenticate
    try {
        firebase.auth().signInWithPopup( provider )
    } catch ( error ) {
        console.error( error )
        throw new Error("Unable to authenticate user")
    }
}




export async function logoutUser () {
    try {
        await firebase.auth().signOut()
    } catch (error) {
        console.error( error )
        throw new Error("Sign out failed")
    }
} 


export function getFirestore () {
    if ( !firebase.apps.length ) throw new Error("Trying to access Firestore without initializing firebase")
    return firebase.firestore()
}


export async function getUserDoc ( user ) {


    const db = getFirestore()
    const docRef = db.collection("users").doc( user.uid )
    
    const doc = await docRef.get()
    
    // Create new document if user does not exist
    if (!doc.exists) {

        const newData = {
            uid: user.uid,
            email: user.email,
            options: {},
        }
        
        // Merge to avoid overwrite
        await docRef.set( newData, { merge: true })
        return newData
        
    }

    return doc.data()

}





