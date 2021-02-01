import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { F } from "../../helpers/constants"
import { updateFilters } from "../../state/settingsCommon"
import { joinSearchString, parseSearchString } from "../../helpers/searchString"
import Textarea from "./Textarea"


const getFilterInputValues = filters => {
    return {
        ...filters,
        [F.EXCLUDE_KEYWORDS]: joinSearchString(filters[F.EXCLUDE_KEYWORDS]),
        [F.EXCLUDE_COUNTRIES]: joinSearchString(filters[F.EXCLUDE_COUNTRIES]),
        [F.EXCLUDE_CATEGORIES]: joinSearchString(filters[F.EXCLUDE_CATEGORIES]),
        [F.EXCLUDE_CURRENCIES]: joinSearchString(filters[F.EXCLUDE_CURRENCIES]),
        [F.EXCLUDE_NAMES]: joinSearchString(filters[F.EXCLUDE_NAMES]),
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
        case F.EXCLUDE_CATEGORIES: 
            filters[ key ] = parseSearchString( inputFieldsData[key] )
            break 
        case F.EXCLUDE_NAMES: 
            filters[ key ] = parseSearchString( inputFieldsData[key] )
            break 
        case F.EXCLUDE_CURRENCIES: 
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


    const [selectedText, setSelectedText] = useState("")
    const [isSelectedShown, setIsSelectedShown] = useState(false)


    useEffect(() => {
        
        const onSelectedText = e => {
            const element = document.activeElement?.tagName?.toLowerCase()
            if ( element === "textarea" || element === "input" ) return
            const selection = document.getSelection().toString()
            if ( !selection ) {
                setIsSelectedShown(false)
                return
            }
            setSelectedText( selection.trim() )
            setIsSelectedShown(true)
        }

        document.addEventListener("selectionchange", onSelectedText)
        return () => {
            document.removeEventListener( "selectionchange", onSelectedText )
        }
    }, [])

    const onChange = ( e ) => {

        setFieldData( {
            ...fieldData,
            [e.target.name]: e.target.value
        })
        
        
    }
    
    const onAddToTextarea = ( e, name, capturedSelectedText ) => {
        
        const currText = fieldData[name]
        const textToAdd = selectedText.includes(" ") ? `"${selectedText}"` : selectedText
        const textWithSelected = `${currText} ${textToAdd}`

        setFieldData( {
            ...fieldData,
            [name]: textWithSelected
        })

        setSelectedText("")
        setIsSelectedShown(false)
        
    }

    const onCancelSelection = e => {
        e.preventDefault()
        setSelectedText("")
        setIsSelectedShown(false)
    }
    
    const onApply = e => {
        e.preventDefault()

        const preparedFilters = getFiltersFromInputs( fieldData )
        dispatch(updateFilters( preparedFilters ))

    }


    return (
        <div className={"filter"}>
            <form className="filter-inner" onSubmit={e => e.preventDefault}>

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
                    <label htmlFor={F.EXCLUDE_KEYWORDS}>Exclude keywords</label>
                    <Textarea
                        name={F.EXCLUDE_KEYWORDS}
                        value={fieldData[F.EXCLUDE_KEYWORDS]}
                        onAddToTextarea={onAddToTextarea}
                        onCancelSelection={onCancelSelection}
                        onChange={onChange}
                        isSelectedShown={isSelectedShown}
                        selectedText={selectedText}
                    />
                </div>
          
                <div className='group'>
                    <label htmlFor={F.EXCLUDE_COUNTRIES}>Exclude countries</label>
                    <Textarea
                        name={F.EXCLUDE_COUNTRIES}
                        value={fieldData[F.EXCLUDE_COUNTRIES]}
                        onAddToTextarea={onAddToTextarea}
                        onCancelSelection={onCancelSelection}
                        onChange={onChange}
                        isSelectedShown={isSelectedShown}
                        selectedText={selectedText}
                    />
                </div>
          
                <div className='group'>
                    <label htmlFor={F.EXCLUDE_CATEGORIES}>Exclude categories</label>
                    <Textarea
                        name={F.EXCLUDE_CATEGORIES}
                        value={fieldData[F.EXCLUDE_CATEGORIES]}
                        onAddToTextarea={onAddToTextarea}
                        onCancelSelection={onCancelSelection}
                        onChange={onChange}
                        isSelectedShown={isSelectedShown}
                        selectedText={selectedText}
                    />
                </div>
          
                <div className='group'>
                    <label htmlFor={F.EXCLUDE_NAMES}>Exclude names</label>
                    <Textarea
                        name={F.EXCLUDE_NAMES}
                        value={fieldData[F.EXCLUDE_NAMES]}
                        onAddToTextarea={onAddToTextarea}
                        onCancelSelection={onCancelSelection}
                        onChange={onChange}
                        isSelectedShown={isSelectedShown}
                        selectedText={selectedText}
                    />
                </div>

                <div className='group'>
                    <label htmlFor={F.EXCLUDE_CURRENCIES}>Exclude currencies</label>
                    <Textarea
                        name={F.EXCLUDE_CURRENCIES}
                        value={fieldData[F.EXCLUDE_CURRENCIES]}
                        onAddToTextarea={onAddToTextarea}
                        onCancelSelection={onCancelSelection}
                        onChange={onChange}
                        isSelectedShown={isSelectedShown}
                        selectedText={selectedText}
                    />
                </div>

                {/* <div className='group'>
                    <label htmlFor="exclude-keywords">Exclude keywords</label>
                    { isSelectedShown 
                        ?
                        <div className="filter-selection-add-container">
                            <p>Add &quot;{selectedText}&quot; here</p>
                            <button
                                className="keyword-add-btn"
                                onClick={ (e) => onAddToTextarea(e, F.EXCLUDE_KEYWORDS, selectedText) }
                            >
                                +
                            </button>
                            <button
                                className="keyword-cancel-btn"
                                onClick={onCancelSelection}
                            >
                                X
                            </button>
                        </div>
                        :
                        <textarea 
                            id='exclude-keywords' 
                            value={ fieldData[F.EXCLUDE_KEYWORDS] } 
                            name={F.EXCLUDE_KEYWORDS} 
                            onChange={ onChange } >
                        </textarea>

                    }
                </div> */}
          
          
          
                


                <button
                    onClick={onApply}
                >
                    APPLY
                </button>


            </form>
        </div>
    )
}

Filters.propTypes = {
    // handleNewFilterFunction: PropTypes.func.isRequired,
    handleLoading: PropTypes.func.isRequired,
}


export default Filters