type Result = {
    pageid: string,
    title: string,
    extract: string,
    thumbnail?:{ //this is optional because not all results will have thumbnails and even if it does it should have a source, width and height
        source: string,
        width: number,
        height: number,
    }
}

type SearchResult = {
    query?: { //query is also optional because it is not guaranteed that we will have a search result for all searches but if we do it should display as an array
        pages?: Result[],
    },
}