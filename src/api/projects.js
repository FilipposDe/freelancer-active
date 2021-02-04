




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

    
    const uri = `${ allFilters.url }?${ typesParam }&compact=true&limit=${ allFilters.projectsPerPage }&sort_field=time_updated&offset=${ page * allFilters.projectsPerPage }&user_details=true&user_employer_reputation=true`

    return uri
}






const fetchProjectsByPage = async (page, filters) => {

    const url = constructProjectsUrl( page, filters )

    const response = await fetch( url, {
        method: "GET", headers: {
            "freelancer-oauth-v1": process.env.REACT_APP_FL_API_KEY,
        }
    } )

    const data = await response.json()

    return { projects: data.result.projects, clients: data.result.users } 

} 


// REACT_APP_FL_API_CLIENT_URL=https://www.freelancer.com/api/users/0.1/users/?employer_reputation=true&compact=true&




const prepareProjects = ( projects, clients ) => {

    const clientMustHaveRep = process.env.REACT_APP_FL_CLIENT_SHOULD_HAVE_REP
    if ( !clientMustHaveRep ) throw new Error( "Not supported clients with no reputation" )
    
    
    const result = []

    projects.forEach( project => {

        const client = clients[ project["owner_id"] ]
        
        const clientRep = client.employer_reputation.entire_history
        if ( clientMustHaveRep && !clientRep  ) return
        
        const data = {
            id: project.id,
            title: project.title,
            desc: project.preview_description + "...",
            budget: project.budget.minimum + " - " + project.budget.maximum,
            bids: project.bid_stats.bid_count || 0,
            avg: project.bid_stats.bid_avg,
            currencySign: project.currency.sign,
            currencyCode: project.currency.code.toLowerCase(),
            url: "https://www.freelancer.com/projects/" + project.seo_url,
            category: project.seo_url.split("/")[0].replaceAll("-", " "),
            time: new Date( project.time_submitted * 1000 ).toLocaleString(),
            language: project.language,
            client: project.owner_id,
            clientName: client.public_name || "",
            clientJobs: clientRep.all,
            clientReviews: clientRep.reviews,
            clientCompleted: clientRep.complete,
            clientRating: clientRep.overall,
            clientCountry: client.location.country.name,
        }
        
        result.push(data)

    }) 

    //     - users.25465.timezone.country
    //     - users.25465.timezone.timezone

    return result
}




const fetchNextBatch = async ( page, filters ) => {

    const { projects, clients } = await fetchProjectsByPage( page, filters )
    const result = prepareProjects( projects, clients )
    return result

}


const freelancerAPI = { fetchNextBatch }

export default freelancerAPI

