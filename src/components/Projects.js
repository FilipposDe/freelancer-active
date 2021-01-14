import React from "react"
import PropTypes from "prop-types"


const Projects = ( props ) => {

    const {
        projects,
        handleSave,
    } = props


    return (
        <ul>
            { projects.map( (project, index) => {
                return (
                    <li 
                        key={index}
                        className={ `card ${ project.saved ? "saved " : "" }` }
                        onClick={ e => handleSave( project ) } 
                    >
                        <p className="time">{ project.time } |</p>
                        <p className="client">Rating: { Number(project.clientRating).toFixed( 1 ) } Reviews: { project.clientReviews }</p>
                        <h2>{ project.title }</h2>
                        <p className="desc">{ project.desc }</p>
                        <p className="bids">Bids: <strong>{ project.bids }</strong></p>
                        <p className="budget">
                            Budget: { project.budget } { project.currency },
                        Average Bid: { project.avg ? Number(project.avg).toFixed( 1 ) : "-" } { project.currency }</p>
                        <a href={ project.url } onClick={ ( e ) => e.stopPropagation() }>Go to Project</a>

                        <div className="saved-tag"></div>

                    </li>
                )
            } )

            }
        </ul>
    )
}



Projects.propTypes = {
    projects: PropTypes.arrayOf( PropTypes.object ).isRequired,
    handleSave: PropTypes.func.isRequired,
}

export default Projects