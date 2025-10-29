

export interface UserData {
    id?: number,
    username?:string,
    email:string,
    password:string
}


export interface MovieData {
    mid?: number;
    title:string;
    director:string;
    budget:number;
    location:string;
    type:string;
    duration:string;
    year:string;
    image?: File | string | null
}