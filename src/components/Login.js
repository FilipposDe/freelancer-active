import React from "react"
import { useSelector } from "react-redux"
import { showFirebaseLogin } from "../api/firebase"

const Login = () => {

    const loadingUser = useSelector( state => state.user.loading)

    const onLogin = e => {
        e.preventDefault()

        showFirebaseLogin()
        

    }

    return (
        <div>
            <div className="overlay">
                
                {
                    loadingUser
                        ? 
                        <button disabled={loadingUser} onClick={onLogin}>
                            <img src="assets/img/btn_google_signin_light_disabled_web.png" alt="Loading"/>
                        </button>
                        :
                        <button onClick={onLogin}>
                            <img src="assets/img/btn_google_signin_light_normal_web.png" alt="Login with Google"/>
                            
                        </button>
                }
                
            </div>
        </div>
    )
}


export default Login
