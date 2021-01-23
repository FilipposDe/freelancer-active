/* eslint-disable indent */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { F } from "../helpers/constants"
import { updateFilters } from "../state/filters"
import { parseSearchString,  joinSearchString } from "../helpers/searchString"


const getFilterInputValues = filters => {
    return {
        ...filters,
        [F.EXCLUDE_KEYWORDS]: joinSearchString(filters[F.EXCLUDE_KEYWORDS]),
        [F.EXCLUDE_COUNTRIES]: joinSearchString(filters[F.EXCLUDE_COUNTRIES]),
    }
}

const getFiltersFromInputs = inputFieldsData => {

    const filters = {}
    
    Object.keys(inputFieldsData).forEach( key => {
        
        switch( key ) {
            case F.EXCLUDE_KEYWORDS: 
                filters[ key ] = parseSearchString( inputFieldsData[key] )
                break 
            case F.EXCLUDE_COUNTRIES: 
                filters[ key ] = parseSearchString( inputFieldsData[key] )
                break 
            default: 
                filters[ key ] = Number(inputFieldsData[key])
        }
    } )
    
    return filters


}

const Filters = ( props ) => {

    const { filters, loading, error } = useSelector(state => state.filters)
    const dispatch = useDispatch()


    const [fieldData, setFieldData] = useState(getFilterInputValues(filters))

    const onChange = ( e ) => {

        setFieldData( {
            ...fieldData,
            [e.target.name]: e.target.value
        })
        
        
    }
    
    const onApply = e => {
        e.preventDefault()

        const preparedFilters = getFiltersFromInputs( fieldData )
        dispatch(updateFilters( preparedFilters ))

    }


    return (
        <div className={"filter"}>
            <div className="filter-inner">

            <h6>Filters</h6>

            <div className='group'>
                <label htmlFor="max-bids">Max bids</label>
                <input 
                    type='number' 
                    name={F.MAX_BIDS} 
                    id="max-bids" 
                    max="999"
                    min="1"  
                    value={fieldData[F.MAX_BIDS]}
                    onChange={ onChange }  
                />
            </div>

            <div className='group'>
                <label htmlFor="min-client-rating">Min. client rating</label>
                <input 
                    type='number' 
                    name={F.MIN_CLIENT_RATING} 
                    id="min-client-rating" 
                    max="5"
                    min="1"
                    value={fieldData[F.MIN_CLIENT_RATING]}
                    onChange={ onChange }   
                />
            </div>
          

            <div className='group'>
                <label htmlFor="exclude-keywords">Exclude keywords</label>
                <textarea 
                    id='exclude-keywords' 
                    rows='4' 
                    value={ fieldData[F.EXCLUDE_KEYWORDS] } 
                    name={F.EXCLUDE_KEYWORDS} 
                    onChange={ onChange } >
                </textarea>
                
                
            </div>
          
          
          

            <div className='group'>
                <label htmlFor="exclude-countries">Exclude countries</label>
                <textarea 
                    id='exclude-countries' 
                    rows='4' 
                    value={ fieldData[F.EXCLUDE_COUNTRIES] } 
                    name={F.EXCLUDE_COUNTRIES} 
                    onChange={ onChange } >
                </textarea>
                
                
            </div>
          
          
          
                


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