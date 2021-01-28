import React, { useEffect, useState  } from "react"
import { clearToast } from "../state/messages"
import { useDispatch, useSelector } from "react-redux"

const Toast = props => {
    
    const dispatch = useDispatch()
    const toast = useSelector(state => state.messages.toast)

    const [fade, setFade] = useState( false )

    useEffect(() => {
        
        const fadeMessage = setTimeout(() => {
            setFade( true )
        }, 4500)
        
        const hideMessage = setTimeout(() => {
            dispatch( clearToast() )
            setFade(false)
        }, 5000)

        return () => {
            clearTimeout( fadeMessage )
            clearTimeout( hideMessage )
        }

    }, [ toast.error, toast.success, toast.warning ])
    

    const message = toast.error || toast.success || toast.warning


    let className = ""
    
    if ( !fade ) {
        if ( toast.error ) {
            className +=  !fade && " show error"
        } else if ( toast.success ) {
            className += " show success"
        } else if ( toast.warning ) {
            className += " show warning"
        }
    }




    return (
        <div className={ `toast ${className}`}>
            {message}
        </div>
    )
}

export default Toast
