/* eslint-disable indent */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

const Filters = ( props ) => {

    const { filters, loading, error } = useSelector(state => state.filters)
    const dispatch = useDispatch()

    const handleChange = ( event, filterKey ) => {

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
            [type]: newFilterValue 
        } )


    }



    return (
        <div className={"filter"}>
            <div className="filter-inner">

            <h6>Filters</h6>

            <div className='group'>
                <label htmlFor="max-bids">Max bids</label>
                <input 
                    type='number' 
                    name='max-bids' 
                    id="max-bids" 
                    max="999"
                    min="1"  
                    value={filters.maxBids}
                    onChange={ (e) => handleChange(e, F.MAX_BIDS)}  
                />
            </div>

            <div className='group'>
                <label htmlFor="min-client-rating">Min. client rating</label>
                <input 
                    type='number' 
                    name='min-client-rating' 
                    id="min-client-rating" 
                    max="5"
                    min="1"
                    value={filters.minClientRating}
                    onChange={ (e) => handleChange(e, F.MIN_CLIENT_RATING)}  
                />
            </div>
            {/* <p>Use words divided by space. New filters will be applied starting from the projects of the next scroll.</p>
            <textarea 
                id='filter-input' 
                rows='4' 
                value={ Object.keys(filters.keywords).join(" ") } 
                onChange={ (e) => handleChange(e, F.KEYWORDS) } ></textarea>

                 */}


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
    handleNewFilterFunction: PropTypes.func.isRequired,
    handleLoading: PropTypes.func.isRequired,
}


export default Filters