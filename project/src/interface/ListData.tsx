export interface ListData {
    content: [
        {
            id: number,
            userId: 1,
            title: string,
            shortDescription: string,
            content: string,
            type: string,
            materialCategory: number,
            furnitureCategory: number,
            imageUrl: string,
            createdAt: string, //아니면 Date?
            updatedAt: string
        }
    ],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean
}