export interface RecipeData {
    id: number,
    userId: number,
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