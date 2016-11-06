import NumberGenerator from "./NumberGenerator/NumberGenerator";

export function getRandomString(length: number): string {
    let characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for(let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    } 
    return result;
}