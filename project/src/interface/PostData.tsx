export interface PostData {
    id: number,
    userId: number,
    title: string,
    shortDescription: string,
    content: string,
    type: string,
    materialCategory: number,
    furnitureCategory: number,
    imageUrl: string,
    imageUrl2: string,
    imageUrl3: string,
    createdAt: string, //아니면 Date?
    updatedAt: string
}