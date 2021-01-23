export default function normalizeProjects ( projects ) {
    
    const ids = []
    
    const normalized = projects.reduce( (obj, item) => {

        obj[ item.id ] = { ...item }
        ids.push( item.id )
        return obj

    }, {}) 

    return { projects: normalized, ids }
}