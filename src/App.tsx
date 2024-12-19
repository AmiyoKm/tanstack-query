import { useQueryClient, useMutation, useQuery} from '@tanstack/react-query'
import './App.css'
import { createPost, getPost, getUsers } from './utils/api'
import { PostsResponseHttpData, UserResponseHttpData } from './utils/types';
import { useEffect, useState } from 'react';

function App() {
  const QueryClient = useQueryClient()
    const {
      data: usersData , error: usersError , isLoading: usersIsLoading 
    }  =  useQuery<UserResponseHttpData[]>({
      queryKey: ['getUsers'],
      queryFn : getUsers
    })

   const { data:postsData , isLoading : isPostsLoading , isError : isPostError  , refetch : refetchGetPosts} = useQuery<PostsResponseHttpData[]>({
      queryFn:  getPost,
      queryKey: ['getPosts']
    })

    const [title , setTitle] =useState('')
    const [body , setBody] =useState('')
    
    if(usersError && !usersIsLoading){
      return(
      <div>
        An error has occurred: {usersError.message}
      </div>
      )
    }
   const {mutate : createPostMutation , isSuccess : isCreatePostSuccess , isPending : isCreatePostPending } = useMutation({
      mutationKey:  ['createPost'],
      mutationFn : createPost
    })
    
    useEffect(()=>{
     
      if(isCreatePostSuccess && !isCreatePostPending){
      
       // refetchGetPosts()
        QueryClient.invalidateQueries({
          queryKey: ['getPosts']
        })
        QueryClient.invalidateQueries({queryKey: ['getUsers']})
      }
      
    },[isCreatePostSuccess , refetchGetPosts , QueryClient])
  return (
    <div>
       <form onSubmit={(e)=>{
        e.preventDefault()
        createPostMutation({title , body , userId: 1})

      }}>
        <label htmlFor="title">Title</label>
        <input name='title' type="text" id='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
        <br />
        <label htmlFor="body">Body</label>
        <input type='text' id='body' name='body' value={body} onChange={(e)=> setBody(e.target.value)} />
        <button type='submit'>Submit</button>
      </form> 

      {
        isPostsLoading ? <p>Loading...</p> : postsData?.map((post)=> (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))
      }

      {/* {
        !usersIsLoading && usersData ? usersData.map((user)=> (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        )) : <p>Loading...</p>
      } */}
    </div>
  )
}

export default App
