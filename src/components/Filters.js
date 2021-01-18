/* eslint-disable indent */
import React, { useState } from "react"
import PropTypes from "prop-types"

const F = {
    KEYWORDS: "keywords",
    MAX_BIDS: "maxBids",
    MIN_CLIENT_RATING: "minClientRating",
    EXCLUDE_COUNTRIES: "excludeCountries",
}

const Filters = ( props ) => {

    // TODO get options from firestore
    const initialFilters = {
        keywords: {},
        maxBids: 15,
        minClientRating: 1,
        excludeCountries: ["India"],
    }

    const [ filters, setFilters ] = useState( initialFilters )

    const {
        handleNewFilterFunction,
    } = props

    function handleChange( event, type ) {

        let newFilterValue

        switch( type ) {

            case F.KEYWORDS: 
                // Dictionary of words
                newFilterValue = {}
                event.target.value.toLowerCase()
                    .split(" ").forEach(word => {
                        newFilterValue[word] = true
                    })
                break
            default: 
                newFilterValue = event.target.value
                
        }

        setFilters( {
            ...filters, 
            [F[type]]: newFilterValue 
        } )


    }


    function onApply(e) {
        e.preventDefault()

        const filterFunction = project => {
            
            if ( filters.excludeCountries.length 
                && filters.excludeCountries
                    .includes(project.clientCountry) ) {
                return false
            }

            if ( filters.minClientRating
                && project.clientRating < filters.minClientRating ) {
                return false
            }

            if ( filters.maxBids
                && project.bids > filters.maxBids ) {
                return false
            }

            if ( filters.keywords
                && (   project.title.toLowerCase().split("")
                            .some( word => filters.keywords[word] ) 
                    || project.desc.toLowerCase().split("")
                            .some( word => filters.keywords[word] )) ) {
                return false
            }

            return true
        }

        handleNewFilterFunction( filterFunction )
    }



    return (
        <div className={`filter ${props.className}`}>
            <div className="filter-inner">

            <h6>Filters</h6>
            <p>Use words divided by space. New filters will be applied starting from the projects of the next scroll.</p>
            <textarea 
                id='filter-input' 
                rows='4' 
                value={ Object.keys(filters.keywords).join(" ") } 
                onChange={ (e) => handleChange(e, F.KEYWORDS) } ></textarea>

                <button
                    onClick={onApply}
                >
                    APPLY
                </button>
            </div>
        </div>
    )
}

Filters.propTypes = {
    className: PropTypes.string.isRequired,
    handleNewFilterFunction: PropTypes.func.isRequired,
}


export default Filters