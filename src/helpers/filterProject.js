export default function filterProject ( project, filters) {

    if ( filters.excludeCountries[project.clientCountry.toLowerCase()] ) {
        return false
    }

    if ( filters.excludeCategories[project.category.toLowerCase()] ) {
        return false
    }

    if ( filters.excludeCurrencies[project.currencyCode.toLowerCase()] ) {
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
    if ( Object.keys(filters.excludeKeywords)
        .some( word => titleLowerCase.includes(word) || descLowerCase.includes(word) )) {
        return false
    }

    return true


}