// PostCard.js
import { Link } from "react-router-dom";
import appwriteService from '../appwrite/config';

function PostCard({
  $id,
  title,
  featuredImage
}) {
  const filePreview = appwriteService.getFilePreview(featuredImage);
  console.log(filePreview);
  console.log(featuredImage);
  console.log($id);
  return (
    <Link to={`/post/${$id}`}>
      <div className="post-card overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <div className="w-full bg-gray-100 rounded-t-lg p-4">
          <img src={filePreview} alt={title} className="max-w-full rounded-t-lg object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 px-4 py-2">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard;