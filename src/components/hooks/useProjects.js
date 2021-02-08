import { useEffect } from "react"
import { clearProjects, fetchNextProjectsBatch } from "../../state/projects"
import { useDispatch, useSelector } from "react-redux"
import { showSuccessToast } from "../../state/messages"



export default function useProjects (  ) {

    const { projects, ids, loading, error } = useSelector((state) => state.projects)
    const { authenticatedUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {

        window.addEventListener("scroll", () =>  {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 300
        > document.documentElement.offsetHeight

            if ( bottomOfWindow && !loading ) {
                // Prevent fetching if still loading
                dispatch( fetchNextProjectsBatch() ).then( ({ payload }) => {
                    const requestedLength = process.env.REACT_APP_FL_API_PROJECTS_PER_PAGE
                    if ( payload?.ids && requestedLength  ) {
                        dispatch( showSuccessToast( `Showing ${payload.ids.length} projects out of ${requestedLength} fetched` ) )
                    }
                } )
            }
        })
        
        if ( !process.env.REACT_APP_API_KEY ) {
            alert("Please set a Freelancer API Key in the configuration file")
            return
        }
        
        
    }, [])
    
    
    useEffect(() => {

        if ( authenticatedUser === null ) {
            dispatch( clearProjects() )
        }
        
        dispatch( fetchNextProjectsBatch(true) ).then( ({ payload }) => {
            const requestedLength = process.env.REACT_APP_FL_API_PROJECTS_PER_PAGE
            if ( payload?.ids && requestedLength  ) {
                dispatch( showSuccessToast( `Showing ${payload.ids.length} projects out of ${requestedLength} fetched` ) )
            }
        } )
        
    }, [ authenticatedUser ])
    
 

    return { projects, ids, loading, error }

}