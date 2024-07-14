import { useEffect, useState } from "react";
import appwriteService from '../appwrite/config';
import { Container, PostCard } from "../components";


function Home(){
    const [posts, setPosts] = useState([]);
    useEffect(()=> {
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, [])

   if(posts.length === 0){
    return (
        <Container className="w-full p-4">
            <h1 className="text-3xl text-center">Login To View Posts</h1>
        </Container>
    )
   }else{
    return(
      <Container className="max-w-md mx-auto p-4 pt-6 md:pt-12">
        <h1 className="text-3xl font-bold text-center text-gray-800">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            { posts.map((post)=>
                (
                    <div className="bg-white hover:shadow-md rounded-lg p-4" key={post.$id}>
                            <PostCard {...post} />
                     </div>
                )
            )
            }
        </div>
      </Container>
    )
   }
}

export default Home;