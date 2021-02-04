import { F } from "./constants"

export default function filterProject ( project, filters) {

    if ( filters[F.EXCLUDE_COUNTRIES][project.clientCountry.toLowerCase()] ) {
        return false
    }

    if ( filters[F.EXCLUDE_CATEGORIES][project.category.toLowerCase()] ) {
        return false
    }

    if (project.clientName.toLowerCase().split(" ").some( word => filters[F.EXCLUDE_NAMES][word] )) {
        return false
    }
    
    if ( filters[F.EXCLUDE_CURRENCIES][project.currencyCode.toLowerCase()] ) {
        return false
    }

    if ( Object.keys(filters[F.LANGUAGES]).length && !filters[F.LANGUAGES][project.language] ) {
        return false
    }

    if ( project.clientRating < filters[F.MIN_CLIENT_RATING] ) {
        return false
    }

    if ( project.bids > filters[F.MAX_BIDS] ) {
        return false
    }

    const titleLowerCase = project.title.toLowerCase()
    const descLowerCase = project.desc.toLowerCase()
    if ( Object.keys(filters[F.EXCLUDE_KEYWORDS])
        .some( word => titleLowerCase.includes(word) || descLowerCase.includes(word) )) {
        return false
    }

    return true


}