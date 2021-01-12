import { useEffect, useState } from "react"

export function useProjects( config ) {


    const [ page, setPage] = useState( 0 )
    const [ projects, setProjects ] = useState( [] )
    const [ loading, setLoading ] = useState( false )
    const [ message, setMessage ] = useState( false )

    useEffect(() => {
        
        if ( !config.apiKey ) {
            setMessage("Please set a Freelancer API Key in the configuration file")
            return
        }
        
        init()
        
    }, [])
    
    
    async function fetchNext() {
        
        setLoading(true)
        setMessage(false)

        try {
            
            const apiProjects = await fetchNextBatch()
            const { projects, clientsParam } = prepareProjects(apiProjects)
    
            const apiClients = await fetchProjectsClients( clientsParam )
        
        

            setLoading(false)
        } catch (error) {
            setLoading(false)
            setMessage(error)
        }

        

    }
    async function fetchNextBatch() {

        
        const projectsResult = await fetch( `${ config.projectsUrl }&offset=${ page * 100 }`, {
            method: "GET", headers: {
                "freelancer-oauth-v1": config.apiKey,
            }
        } )

        const projects = await projectsResult.json()
        return projects.result || []
        
    }


    function prepareProjects(projects) {

        let clientsParam = ""

        const projectItems = projects.map( project => {
            // Add project client to client list                        
            clientsParam += "users[]=" + project.owner_id + "&"

            return {
                id: project.id,
                title: project.title,
                desc: project.preview_description + "...",
                budget: project.budget.minimum + " - " + project.budget.maximum,
                bids: project.bid_stats.bid_count,
                avg: project.bid_stats.bid_avg,
                currency: project.currency.sign,
                url: "https://www.freelancer.com/projects/" + project.seo_url,
                time: new Date( project.time_submitted * 1000 ).toLocaleString(),
                client: project.owner_id,
                saved: false
            }
        })

        // Remove last ' & '
        clientsParam = clientsParam.substr( 0, clientsParam.length - 1 )

        return { projects: projectItems, clientsParam }
    }


    async function fetchProjectsClients( param ) {

        const clientsResult = await fetch( `${ config.clientsUrl }${ param }`, {
            method: "GET", headers: {
                "freelancer-oauth-v1": config.apiKey,
            }
        } )

        const clients = await clientsResult.json()
        return clients.result.users


    }

    return { projects, message, fetchNext }

}