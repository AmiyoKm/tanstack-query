import { CreatePostRequestBody } from "./types"

const BASE_API_URL = 'https://jsonplaceholder.typicode.com'

export const getUsers = async ()=> {
    const response = await fetch(`${BASE_API_URL}/users`)
//    return Promise.reject(new Error('An error has occurred'))
    return response.json()
}

export const createPost = async (data: CreatePostRequestBody)=> {
    const response = await fetch(`${BASE_API_URL}/posts`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const getPost = async ()=> {
    const response = await fetch(`${BASE_API_URL}/posts`)
    return response.json()
}