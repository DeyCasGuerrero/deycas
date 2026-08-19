import { User } from "./example";

export interface UserMapped {
    _id: number;
    name: string;
    userName: string;
    email: string;
}

export function mapper(user:User[]):UserMapped[] {
    return user.map((user)=>({
        _id: user.id,
        name: user.name,
        userName: user.username,
        email: user.email
    }))
}