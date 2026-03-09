// i have a file path now i return the content inside it 
import fs from "fs/promises"

export const ReadFile = async (file_path : string) => {
    const content :string = await fs .readFile(file_path , "utf-8")
    const lenght = content.length
    return content.substring(0, lenght-1)
}