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

    const displaySelectedText = selectedText.length > 20 ? selectedText.substr(0, 20) + "..." : selectedText

    return (
        <>
            { isSelectedShown 
                ?
                <div className="filter-selection-add-container">
                    <button
                        className="keyword-add-btn"
                        onClick={ (e) => onAddToTextarea(e, name, selectedText) }
                    >
                        + &quot;{displaySelectedText}&quot;
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