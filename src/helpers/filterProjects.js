export default function filterProjects ( project, filters) {

    if ( filters.excludeCountries[project.clientCountry] ) {
        return false
    }

    if ( project.clientRating < filters.minClientRating ) {
        return false
    }

    if ( project.bids > filters.maxBids ) {
        return false
    }

    const titleLowerCase = project.title.toLowerCase()
    const descLowerCase = project.desc.toLowerCase()
    if ( filters.excludeKeywords
        .some( word => titleLowerCase.includes(word) || descLowerCase.includes(word) )) {
        return false
    }

    return true


}