import React, { useEffect, useReducer, useState } from "react"
import "./App.css"

import { logoutUser, getFirestore } from "./services/firebase"
import Filters from "./components/Filters"
import Header from "./components/Header"
import Overlay from "./components/Overlay"
import Projects from "./components/Projects"
import { useInit } from "./services/init"
import { useProjects } from "./services/projects"


function App() {

    // useReducer(reducer, initializerArg, initializer)

    // const [ user, setUser] = useState( null )
    // const [ userData, setUserData] = useState( {} )

    
    const [ loading, setLoading ] = useState( false )
    const [ theme, setTheme ] = useState( "light" )

    const [ savedProjects, setSavedProjects ] = useState( {} )



    

    const { 
        user, 
        setUser, 
        userData 
    } = useInit(setLoading)

    const { 
        projects,
        listMessage: message, 
        updateFilter,
    } = useProjects( loading, setLoading)



    useEffect(() => {

        window.addEventListener("scroll", () => {

            // Scroll to top
            if ( window.scrollY < 150 ) {
                document.querySelector( ".scroll-top-btn" ).classList.add( "hidden" )
            } else {
                document.querySelector( ".scroll-top-btn" ).classList.remove( "hidden" )
            }

        })
        
    }, [])
    
    function onNewFilterFunction( filter ) {
        updateFilter( filter )
    }

 

    function handleThemeChange() {
        theme === "light" ? setTheme( "dark" ) : setTheme( "light" )
    }


    function handleSave( project ) {
        setSavedProjects({ ...savedProjects, [project.id]: project })
    }

    function handleOpenSaved() {

        // Open saved projects in new window
        Object.keys(savedProjects).forEach( function( id ) {
            let win = window.open( savedProjects[id].url + "/details", "_blank" )
            if ( !win ) return alert( "Please allow popups for this website" )
            win.focus()
        } )

        setSavedProjects( {} )

    }


    function handleHelp() {
        alert( "Click on a project card to save, click on the bottom right button to open saved projects in new tabs." )
    }


    
    async function handleLogout() {
        await logoutUser()
        setUser(null)
    }



    if ( !user ) {
        return <Overlay />
    }



    return (

        <>

            <Header
                handleThemeChange={ handleThemeChange}
                handleHelp={ handleHelp}
                handleLogout={ handleLogout}
            />


            <main>


                <Filters
                    handleNewFilterFunction={ onNewFilterFunction }
                />

                <Projects
                    projects={ projects }
                    handleSave={ handleSave }
                />

                <button
                    onClick={ handleOpenSaved }
                    className={ "open-all-btn" }
                    disabled={ Object.keys(savedProjects).length === 0 }
                >
                    { Object.keys(savedProjects).length }
                </button>

                <button
                    onClick={ e => window.scrollTo( 0, 0 ) }
                    className="scroll-top-btn"
                >
                </button>


                { loading &&
                    <div className="loading-card spinning"></div>
                }

            </main>
        </>
    )
}

export default App