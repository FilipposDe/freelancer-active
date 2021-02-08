import React from "react"
import useProjects from "./hooks/useProjects"


const Projects = ( props ) => {

    const {
        projects,
        ids,
        loading,
        error,
    } = useProjects()

    
    return (
        <div className="project-list">

            <ul>
                { ids.map( id => {
                    const project = projects[id]
                    return (
                        <li 
                            key={id}
                            className={ `card ${ project.saved ? "saved " : "" }` }
                        >
                            {/* onClick={ e => handleSave( project ) }  */}
                            <p className="time">{ project.time } | </p>
                            <p className="client"><b>{project.clientName}</b> | <b>{project.clientCountry}</b> | Rating: { Number(project.clientRating).toFixed( 1 ) } Reviews: { project.clientReviews } | {project.category}</p>
                            <h2>{ project.title }</h2>
                            <p className="desc">{ project.desc }</p>
                            <p className="bids">Bids: <strong>{ project.bids }</strong></p>
                            <p className="budget">
                            Budget: { project.budget } { project.currencySign } {project.currencyCode.toUpperCase()},
                        Average Bid: { project.avg ? Number(project.avg).toFixed( 1 ) : "-" } { project.currencySign }</p>
                            <a href={ project.url } target="_blank" rel="noreferrer" onClick={ ( e ) => e.stopPropagation() }>Go to Project</a>

                            <div className="saved-tag"></div>

                        </li>
                    )
                } )

                }
            
            </ul>

            { loading &&
                <div className="loading-card spinning"></div>
            }


        </div>
    )
}


export default Projects