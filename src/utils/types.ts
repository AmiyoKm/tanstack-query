export interface UserResponseHttpData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
        lat: string;
        lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface CreatePostRequestBody {
    title: string;
    body: string;
    userId : number
}

export interface PostsResponseHttpData {
    id: number;
    title: string;
    body: string;
    userId : number
}