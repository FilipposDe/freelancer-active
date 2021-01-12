import React from "react"
import PropTypes from "prop-types"

const Header = ( props ) => {
    
    const {
        isError, 
        message, 
        handleThemeChange,
        handleHelp,
        handleLogout,
    } = props
    
    
    return (
        <header className={ isError ? "red" : "" } >
            <div className="title">
                <img src="freelancer-logo.svg" alt='logo' />
                <span>Active Projects Filtered</span>
            </div>
            <div className="buttons">
                <div onClick={ handleThemeChange } className="toggle-theme">
                    <div className="toggle-theme-handle"></div>
                </div>
                <button onClick={ handleHelp } className="help-btn">?</button>
                <button
                    onClick={ handleLogout }
                    className="log-out-btn"
                >
                    Logout
                </button>
            </div>
            <p className="msg">
                { message }
            </p>

        </header>
    )
}


Header.propTypes = {
    projects: PropTypes.arrayOf( PropTypes.object ).isRequired,
    isError: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleThemeChange: PropTypes.func.isRequired,
    handleHelp: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
}


export default Header