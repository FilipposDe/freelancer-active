export function parseSearchString ( value ) {

    const text = value.toLowerCase()

    const regex = /[^\s"]+|"([^"]*)"/gi
    const items = {}
    let match = null

    do {

        match = regex.exec(text)
        if (match !== null) {
            items[match[1] ? match[1] : match[0]] = true
        }
    } while (match !== null)

    return items

}

export function joinSearchString ( keywords ) {


    const result = Object.keys(keywords || {})
        .map( phrase => phrase.includes(" ") ? `"${ phrase }"` : phrase )
        .join(" ")
    
        
    return result

}