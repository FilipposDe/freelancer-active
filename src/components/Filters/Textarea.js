import React from "react"
import PropTypes from "prop-types"

const Textarea = (props) => {

    const { 
        value,
        name, 
        isSelectedShown,
        selectedText, 
        onChange, 
        onAddToTextarea, 
        onCancelSelection, 
    } = props


    return (
        <>
            { isSelectedShown 
                ?
                <div className="filter-selection-add-container">
                    <p>Add &quot;{selectedText}&quot; here</p>
                    <button
                        className="keyword-add-btn"
                        onClick={ (e) => onAddToTextarea(e, name, selectedText) }
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
                    id={name} 
                    value={ value } 
                    name={name} 
                    onChange={ onChange } 
                    autoCorrect="off"
                    spellCheck="false"
                ></textarea>

            }
        </>
    )
}


Textarea.propTypes = {
    name: PropTypes.string.isRequired, 
    value: PropTypes.string.isRequired, 
    isSelectedShown: PropTypes.bool.isRequired, 
    selectedText: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    onAddToTextarea: PropTypes.func.isRequired, 
    onCancelSelection: PropTypes.func.isRequired, 
}




export default Textarea