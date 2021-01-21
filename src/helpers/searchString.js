export function parseSearchString ( text) {

    const regex = /[^\s"]+|"([^"]*)"/gi
    const items = []
    let match = null

    do {

        match = regex.exec(text)
        if (match !== null) {
            items.push(match[1] ? match[1] : match[0])
        }
    } while (match !== null)

    return items

}

export function joinSearchString ( keywordsArray ) {

    const result = keywordsArray
        .map( phrase => phrase.includes(" ") ? `"${ phrase }"` : phrase )
        .join(" ")
    
        
    return result

}