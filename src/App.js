import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App () {


    const [ page, setPage ] = useState( 0 )
    const [ message, setMessage ] = useState( '' )
    const [ projects, setProjects ] = useState( [] )
    const [ isError, setIsError ] = useState( false )
    const [ loading, setLoading ] = useState( false )
    const [ theme, setTheme ] = useState( 'light' )
    const [ savedCount, setSavedCount ] = useState( 0 )
    const [ filterOpen, setFilterOpen ] = useState( false )
    const [ filterValue, setFilterValue ] = useState( localStorage.getItem( 'filter' ) || "" )

    const key = 'aaaaaaaaaaa'
    const projectTypes = [ "fixed" ]
    const maxBids = 15
    const excludeIndia = true


    useEffect( () => {
        setupScroll()
        fetchNext()
    }, [] )

    // Configuration
    let typesStr = ''
    projectTypes.forEach( function ( type ) {
        typesStr += "project_types[]=" + type + "&"
    } )

    const projectsUrl = `https://www.freelancer.com/api/projects/0.1/projects/active/?${ typesStr }compact=true&limit=100&sort_field=time_updated`
    const clientsUrl1 = "https://www.freelancer.com/api/users/0.1/users/?employer_reputation=true&compact=true&"





    function fetchNext () {

        if ( typeof key === 'undefined' ) {
            setMessage( "Please set the Freelancer.com API key at apiKey.js (see apiKey-example.js)" )
            setIsError( true )
            return
        }


        // Set loading indication
        setMessage( "" )
        setLoading( true )
        setIsError( false )

        // Fetch all projects
        fetch( `${ projectsUrl }&offset=${ page * 100 }`, {
            method: "GET", headers: {
                "freelancer-oauth-v1": key,
            }
        } ).then( ( res => res.json() ) ).then( async res => {

            let clients = ''

            // Map response to custom project objects 
            let customProjectObjects = res.result.projects.map( project => {

                // Add project client to client list                        
                clients += "users[]=" + project.owner_id + '&'

                return {
                    title: project.title,
                    desc: project.preview_description + "...",
                    budget: project.budget.minimum + " - " + project.budget.maximum,
                    bids: project.bid_stats.bid_count,
                    avg: project.bid_stats.bid_avg,
                    currency: project.currency.sign,
                    url: "https://www.freelancer.com/projects/" + project.seo_url,
                    time: new Date( project.time_submitted * 1000 ).toLocaleString(),
                    client: project.owner_id,
                    saved: false
                }
            } )


            // Remove last ' & '
            clients = clients.substr( 0, clients.length - 1 )

            // Log string length
            console.log( '--- clients.length ---', clients.length )

            // Fetch all clients from projects
            fetch( `${ clientsUrl1 }${ clients }`, {
                method: "GET", headers: {
                    "freelancer-oauth-v1": key,
                }
            } ).then( res => res.json() ).then( clientRes => {

                let clientsObj = clientRes.result.users

                // Populate new projects with required client data
                let customProjectObjectsPopulated = customProjectObjects.map( project => {

                    let rep = clientsObj[ project.client ].employer_reputation.entire_history

                    return {
                        ...project,
                        clientJobs: rep.all,
                        clientReviews: rep.reviews,
                        clientCompleted: rep.complete,
                        clientRating: rep.overall,
                        clientCountry: clientsObj[ project.client ].location.country.name,
                    }
                } )

                // Filter new projects
                let filterWords = filterValue.split( " " )
                for ( let i = 0; i < filterWords.length; i++ ) {
                    filterWords[ i ] = filterWords[ i ].toLowerCase()
                }
                customProjectObjectsPopulated = customProjectObjectsPopulated.filter( project =>
                    project.clientRating && project.clientRating > 0 &&
                    project.bids < maxBids &&
                    ( excludeIndia ? project.clientCountry !== "India" : true ) &&
                    !foundFilterWord( project.title, filterWords ) &&
                    !foundFilterWord( project.desc, filterWords )
                )

                // Add new projects to existing array
                setProjects( projects.concat( customProjectObjectsPopulated ) )

                // this.message = `OK (Results: ${this.projects.length})`
                setPage( page + 1 )
                setLoading( false )

            } ).catch( e => {
                setMessage( "ERROR! Check console" )
                setLoading( false )
                setIsError( true )
                window.scrollTo( 0, 0 )
                console.error( e )
            } )


        } ).catch( e => {
            setMessage( "ERROR! Check console" )
            setLoading( false )
            setIsError( true )
            window.scrollTo( 0, 0 )
            console.error( e )
        } )

    }

    function setupScroll () {
        window.onscroll = () => {

            // Infinite scroll
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 300
                > document.documentElement.offsetHeight

            if ( bottomOfWindow && !loading ) {
                // Prevent fetching if still loading
                fetchNext()
            }

            // Scroll to top
            if ( window.scrollY < 150 ) {
                document.querySelector( ".scroll-top-btn" ).classList.add( 'hidden' )
            } else {
                document.querySelector( ".scroll-top-btn" ).classList.remove( 'hidden' )
            }

        }
    }


    function handleThemeChange () {
        // Toggle theme
        if ( theme === 'light' ) {
            setTheme( 'dark' )
        } else {
            setTheme( 'light' )
        }
    }


    function handleSave ( project ) {

        // Toggle saved status
        project.saved = !project.saved

        // Update counter
        if ( project.saved ) {
            setSavedCount( savedCount + 1 )
        } else {
            setSavedCount( savedCount - 1 )
        }
    }

    function handleOpenSaved () {

        // Open saved projects in new window
        projects.forEach( function ( project ) {
            if ( project.saved ) {
                let win = window.open( project.url, '_blank' )
                if ( win ) {
                    win.focus()
                } else {
                    // When popups are blocked
                    alert( 'Please allow popups for this website' )
                    setMessage( 'Please allow popups for this website' )
                }
            }
        } )

        // Clear saved status of projects to open
        projects.forEach( function ( project ) {
            project.saved = false
        } )

        setSavedCount( 0 )

    }


    function handleHelp () {
        alert( "Click on a project card to save, click on the bottom right button to open saved projects in new tabs." )
    }


    function handleToggleFilter () {
        setFilterOpen( !filterOpen )
    }

    function handleFilterChange () {
        localStorage.setItem( 'filter', filterValue )
    }


    function foundFilterWord ( text, words ) {
        let textWords = text.split( ' ' )
        for ( let i = 0; i < textWords.length; i++ ) {
            let textWord = textWords[ i ].toLowerCase()
            if ( words.includes( textWord ) ) return true
        }
        return false
    }





    return (
        <div>

            {/* Header */ }
            <header className={ isError ? 'red' : '' } >
                <div className="title">
                    <img src="freelancer-logo.svg" alt='logo' />
                    <span>Active Projects Filtered</span>
                </div>
                <div class="buttons">
                    <div onClick={ handleThemeChange } className="toggle-theme">
                        <div className="toggle-theme-handle"></div>
                    </div>
                    <button onClick={ handleHelp } className="help-btn">?</button>
                </div>
                <p className="msg">
                    { message }
                </p>
            </header>
            <body>

               

            <div className={`filter ${filterOpen ? 'on ' : 'off'}`} >
                <h6>Filters</h6>
                <p>Use words divided by space. New filters will be applied starting from the projects of the next scroll.</p>
                <textarea id='filter-input' rows='4' value={filterValue} onChange={handleFilterChange} ></textarea>
            </div>

            { loading &&
                <div className="loading-card spinning"></div>
            }

            <button onClick={handleOpenSaved} className={`open-all-btn ${filterOpen ? 'hidden' : ''}`} disabled={savedCount === 0}> {savedCount}</button>
            
            <button onClick={e => window.scrollTo(0, 0)} className="scroll-top-btn"></button>

            <button onClick={handleToggleFilter} className="open-filter-btn">F</button>


            </body>
        </div>
    );
}

export default App;


// TODO Firebase
// < !--The core Firebase JS SDK is always required and must be listed first-- >
// <script src="/__/firebase/8.2.2/firebase-app.js"></script>

// <!--TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.2.2/firebase-analytics.js"></script>

// <!--Initialize Firebase-- >
//     <script src="/__/firebase/init.js"></script>
