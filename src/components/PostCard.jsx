import { Link } from "react-router-dom";
import appwriteService from '../appwrite/config';

function PostCard(
    {   $id,
        title,
        featuredImage
    }
){
    const filePreview = appwriteService.getFilePreview(featuredImage);
    console.log(filePreview);
    console.log(featuredImage);
    console.log($id);
    return (
        <Link to={`/post/${$id}`}>  
            <div className="post-card">
                <div className="w-full bg-gray-100 rounded-xl p-4">
                    <img src={filePreview} alt={title}  className="rounded-xl"/>
                </div>
                <h2 className="text-xl font-bold ">
                    {title}
                </h2>
            </div>
        </Link>
    )
}


export default PostCard;