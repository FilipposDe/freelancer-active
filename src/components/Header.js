import React from "react"
import PropTypes from "prop-types"

const Header = ( props ) => {
    
    const {
        handleThemeChange,
        handleHelp,
        handleLogout,
    } = props
    
    
    return (
        <header>
            <div className="title">
                <h1><b>Freelancer.com</b> Active Projects</h1>
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
                {/* { message }  TODO */ }
            </p>

        </header>
    )
}


Header.propTypes = {
    handleThemeChange: PropTypes.func.isRequired,
    handleHelp: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
}


export default Header