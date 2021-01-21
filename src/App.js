import React, { createContext, useEffect, useState } from "react"
import "./App.css"

import { logoutUser } from "./api/firebase"
import Filters from "./components/Filters"
import Header from "./components/Header"
import Login from "./components/Login"
import Projects from "./components/Projects"
import useInit from "./components/hooks/useInit"
import { useDispatch, useSelector } from "react-redux"

const scrollToTopListener = () => {
    // Scroll to top
    if ( window.scrollY < 150 ) {
        document.querySelector( ".scroll-top-btn" ).classList.add( "hidden" )
    } else {
        document.querySelector( ".scroll-top-btn" ).classList.remove( "hidden" )
    }

}

function App () {


    useInit()

    const user = useSelector( state => state.user.authenticatedUser)

    
    // const [ theme, setTheme ] = useState( "light" )

    // // const [ savedProjects, setSavedProjects ] = useState( {} )



    useEffect(() => {

        window.addEventListener("scroll", scrollToTopListener)
        
    }, [])
    
    // function onNewFilterFunction ( filter ) {
    //     // updateFilter( filter )
    // }

 

    // function handleThemeChange () {
    //     theme === "light" ? setTheme( "dark" ) : setTheme( "light" )
    // }


    // function handleSave ( project ) {
    //     setSavedProjects({ ...savedProjects, [project.id]: project })
    // }

    // function handleOpenSaved () {

    //     // Open saved projects in new window
    //     Object.keys(savedProjects).forEach( function ( id ) {
    //         let win = window.open( savedProjects[id].url + "/details", "_blank" )
    //         if ( !win ) return alert( "Please allow popups for this website" )
    //         win.focus()
    //     } )

    //     setSavedProjects( {} )

    // }


    function handleHelp () {
        alert( "Click on a project card to save, click on the bottom right button to open saved projects in new tabs." )
    }


    
    async function handleLogout () {
        await logoutUser()
    }



    if ( !user ) {
        return <Login />
    }



    return (

        <>

            {/* <LoadingContext.Provider value={false}> */}

            <Header
                handleHelp={ handleHelp}
                handleLogout={ handleLogout}
            />
            {/* handleThemeChange={ handleThemeChange} */}


            <main>

                
                <Filters
                />

                <Projects />

                {/* <button
                        onClick={ handleOpenSaved }
                        className={ "open-all-btn" }
                        disabled={ Object.keys(savedProjects).length === 0 }
                    >
                        { Object.keys(savedProjects).length }
                    </button> */}

                <button
                    onClick={ e => window.scrollTo( 0, 0 ) }
                    className="scroll-top-btn"
                >
                </button>


            </main>
            
            {/* </LoadingContext.Provider> */}
        </>
    )
}

export default App