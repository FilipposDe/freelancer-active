import { useEffect, useState } from "react"

export function useProjects( loading, setLoading ) {


    const [ page, setPage] = useState( 0 )
    const [ projects, setProjects ] = useState( [] )
    const [ message, setMessage ] = useState( false )



    useEffect(() => {

        window.addEventListener("scroll", () => {

            // Infinite scroll
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 300
                > document.documentElement.offsetHeight

            if ( bottomOfWindow && !loading ) {
                // Prevent fetching if still loading
                nextPage( )
            }

        })
        
        if ( !process.env.REACT_APP_API_KEY ) {
            setMessage("Please set a Freelancer API Key in the configuration file")
            return
        }
        
        fetchNext()

        
        
    }, [])


    
    useEffect(() => {
        
        fetchNext()
        
    }, [ page ])


    
    
    async function fetchNext() {
        
        setLoading(true)
        setMessage(false)

        try {
            
            const apiProjectsArr = await fetchNextBatch()
            
            const { projects: projectObjArr, clientsParam } = prepareProjects(apiProjectsArr)
    
            const apiClientsObj = await fetchProjectsClients( clientsParam )

            const withClientData = projectObjArr.map( project => {
                const client = apiClientsObj[ project.client ]
                return addClientDataToProject(project, client)
            } )
            
            const newList = [...projects, ...withClientData]
            setProjects( newList )

            setLoading(false)

        } catch (error) {
            console.error(error)
            setLoading(false)
            setMessage(error)
        }

        

    }
    async function fetchNextBatch() {

        const typesParam = process.env.REACT_APP_PROJECT_TYPES.split(",")
            .map( typeStr => `project_types[]=${ typeStr }&` )
            .join("")

        const projectsUrl = "https://www.freelancer.com/api/projects/0.1/projects/active/"
        const apiItemsPerPage = 100

        const uri = `${ projectsUrl }?${ typesParam }compact=true&limit=${ apiItemsPerPage }&sort_field=time_updated&offset=${ page * apiItemsPerPage }`
        
        const projectsResult = await fetch( uri, {
            method: "GET", headers: {
                "freelancer-oauth-v1": process.env.REACT_APP_FL_API_KEY,
            }
        } )

        const projects = await projectsResult.json()
        return projects.result.projects || []
        
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

        const clientsUrl = "https://www.freelancer.com/api/users/0.1/users/?employer_reputation=true&compact=true&"

        const clientsResult = await fetch( `${ clientsUrl }${ param }`, {
            method: "GET", headers: {
                "freelancer-oauth-v1": process.env.REACT_APP_API_KEY,
            }
        } )

        const clients = await clientsResult.json()
        return clients.result.users


    }

    function addClientDataToProject(project, client) {

        let reputation = client.employer_reputation.entire_history

        return {
            ...project,
            clientJobs: reputation.all || "3",
            clientReviews: reputation.reviews || "3",
            clientCompleted: reputation.complete || "3",
            clientRating: reputation.overall || "3",
            clientCountry: client.location.country.name || "3",
        }
    
    }

    function updateFilter( filter ) {
        setProjects( projects.filter( filter ))
    }

    function nextPage() {
        setPage( currPage => currPage + 1 )
    }


    return { projects, message, page, updateFilter }

}