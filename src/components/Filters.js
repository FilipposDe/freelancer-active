import React from "react"
import PropTypes from "prop-types"

const Filters = ( props ) => {

    const {
        filterValue,
        filterOpen,
        handleFilterChange,
    } = props


    return (
        <div className={ `filter ${ filterOpen ? "on " : "off" }` } >
            <h6>Filters</h6>
            <p>Use words divided by space. New filters will be applied starting from the projects of the next scroll.</p>
            <textarea id='filter-input' rows='4' value={ filterValue } onChange={ handleFilterChange } ></textarea>
        </div>
    )
}

Filters.propTypes = {
    filterValue: PropTypes.string.isRequired,
    filterOpen: PropTypes.bool.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
}


export default Filters