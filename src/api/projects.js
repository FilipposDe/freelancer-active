




const getTypesParam = types => {
    
    const typesArray = types.split(",")
    
    if ( typesArray.length < 1 ) throw new Error("Invalid types array")

    const typesParam = types
        .split(",")
        .map( typeStr => `project_types[]=${ typeStr }&` )
        .join("")
        .slice( 0, -1 )

    return typesParam

}







const constructProjectsUrl = ( page, filters ) => {

    const envFilters = {
        types: process.env.REACT_APP_FL_API_PROJECT_TYPES,
        url: process.env.REACT_APP_FL_API_PROJECT_URL,
        projectsPerPage: process.env.REACT_APP_FL_API_PROJECTS_PER_PAGE,
    }

    const allFilters = {
        ...envFilters,
        ...filters,
    }

    const typesParam = getTypesParam( allFilters.types )

    
    const uri = `${ allFilters.url }?${ typesParam }&compact=true&limit=${ allFilters.projectsPerPage }&sort_field=time_updated&offset=${ page * allFilters.projectsPerPage }`

    return uri
}






const fetchProjectsByPage = async (page, filters) => {

    const url = constructProjectsUrl( page, filters )

    const projectsResult = await fetch( url, {
        method: "GET", headers: {
            "freelancer-oauth-v1": process.env.REACT_APP_FL_API_KEY,
        }
    } )

    const projects = await projectsResult.json()
    return projects.result.projects

} 






const extractClientIds = projects => {
    return projects.map( project => project["owner_id"] )    

}






const getClientsUrlParam = clientIds => {
    return clientIds
        .map( id => "users[]=" + id + "&" )
        .join("")    
        .slice(0, -1)    

}






const fetchClients = async clientIds => {
    const url = process.env.REACT_APP_FL_API_CLIENT_URL
    const clientsUrlParam = getClientsUrlParam( clientIds )

    const clientsResult = await fetch( `${ url }${ clientsUrlParam }`, {
        method: "GET", headers: {
            "freelancer-oauth-v1": process.env.REACT_APP_API_KEY,
        }
    } )

    const clients = await clientsResult.json()
    return clients.result.users

}






const prepareNormalizedProjects = ( projects, clients ) => {

    const ids = []
        
    const clientMustHaveRep = process.env.REACT_APP_FL_CLIENT_SHOULD_HAVE_REP
    if ( !clientMustHaveRep ) throw new Error( "Not supported clients with no reputation" )
    
    
    const normalizedProjects = projects.reduce( (obj, item) => {

        const client = clients[ item["owner_id"] ]
        
        const clientRep = client.employer_reputation.entire_history
        if ( clientMustHaveRep && !clientRep  ) return obj
        
        const properties = {
            id: item.id,
            title: item.title,
            desc: item.preview_description + "...",
            budget: item.budget.minimum + " - " + item.budget.maximum,
            bids: item.bid_stats.bid_count,
            avg: item.bid_stats.bid_avg,
            currency: item.currency.sign,
            url: "https://www.freelancer.com/projects/" + item.seo_url,
            time: new Date( item.time_submitted * 1000 ).toLocaleString(),
            client: item.owner_id,
            clientJobs: clientRep.all,
            clientReviews: clientRep.reviews,
            clientCompleted: clientRep.complete,
            clientRating: clientRep.overall,
            clientCountry: client.location.country.name,
        }
        
        obj[ item.id ] = { ...properties }
        ids.push( item.id )
        return obj

    }, {}) 

    return { projects: normalizedProjects, ids: ids }
}






const fetchNextBatch = async ( page, filters ) => {

    const projects = await fetchProjectsByPage( page, filters )
    const clientIds = extractClientIds( projects )

    const clients = await fetchClients( clientIds )

    const result = prepareNormalizedProjects( projects, clients )
    return result
}


const freelancerAPI = { fetchNextBatch }

export default freelancerAPI

