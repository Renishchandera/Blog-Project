import { useEffect, useState } from "react";
import appwriteService from '../appwrite/config';
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }, []);
  
    if (posts.length === 0) {
      return (
        <Container className="w-full p-4 h-screen flex items-center justify-center">
          <h1 className="text-3xl text-center font-bold text-gray-800">
            Login To View Posts
          </h1>
        </Container>
      );
    } else {
      return (
        <Container className="max-w-md mx-auto p-4 pt-6 md:pt-12">
          <div className="min-h-screen bg-white-100 w-screen p-2">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Posts
            </h1>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div
                  className="bg-white grow shrink hover:shadow-md rounded-lg p-4 mb-4 p-4 w-full md:w-1/2 xl:w-1/3 border-2 border-stone-800"
                  key={post.$id}
                >
                  <PostCard {...post}  className="rounded w-full"/>
                </div>
              ))}
            </div>
          </div>
        </Container>
      );
    }
  }

export default Home;