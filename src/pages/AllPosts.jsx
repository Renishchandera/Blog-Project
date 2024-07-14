import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";
import appwriteService from '../appwrite/config';

function AllPosts(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, [])
    return (
        <div className="w-full py-8 bg-gray-300">
            <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                <div className="flex flex-wrap mx-4 divide-y-2 divide-gray-500">
                    {
                        posts && 
                        posts.map((post) => (
                            <div className="p-4 m-1 rounded w-full md:w-1/2 xl:w-1/3 " key={post.$id}>
                                <PostCard 
                                    className="bg-white rounded shadow-md p-4"
                                    {...post} 
                                />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>

    )
}

export default AllPosts;