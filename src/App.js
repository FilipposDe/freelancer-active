import React from "react"
import "./App.css"

import { logoutUser } from "./api/firebase"
import Filters from "./components/Filters"
import Header from "./components/Header"
import Login from "./components/Login"
import Projects from "./components/Projects"
import useInit from "./components/hooks/useInit"
import { useSelector } from "react-redux"
import Toast from "./components/Toast"

function App () {


    useInit()

    const user = useSelector( state => state.user.authenticatedUser)

    
    // const [ theme, setTheme ] = useState( "light" )

    // // const [ savedProjects, setSavedProjects ] = useState( {} )



    
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


            <Toast />

            <Header
                handleThemeChange={()=>{}}
                handleHelp={ handleHelp}
                handleLogout={ handleLogout}
            />


            <main>

                
                <Filters
                    handleLoading={()=>{}}
                />

                <Projects />

                {/* <button
                        onClick={ handleOpenSaved }
                        className={ "open-all-btn" }
                        disabled={ Object.keys(savedProjects).length === 0 }
                    >
                        { Object.keys(savedProjects).length }
                    </button> */}



            </main>
            
        </>
    )
}

export default App