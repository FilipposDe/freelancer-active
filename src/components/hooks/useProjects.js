import { useEffect } from "react"
import { clearProjects, fetchNextProjectsBatch } from "../../state/projects"
import { useDispatch, useSelector } from "react-redux"



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
                dispatch( fetchNextProjectsBatch() )
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
        
        dispatch( fetchNextProjectsBatch(true) )
        
    }, [ authenticatedUser ])
    
 

    // function updateFilter ( filter ) {
    //     setProjects( projects.filter( filter ))
    // }

    

    return { projects, ids, loading, error }

}