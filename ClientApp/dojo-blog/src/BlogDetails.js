import { useNavigate, useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const serverBaseUrl = process.env.REACT_APP_API_URL;
  const { data: blog, error, isPending } = useFetch(`${serverBaseUrl}/blogs/` + id);
  const navigate = useNavigate();

  const handleDelete = () =>
  {
    fetch(`${serverBaseUrl}/blogs/`, 
    {
      method: "DELETE",
      headers: 
            {
              "Content-Type": "application/json"
            },
      body: JSON.stringify(blog)
    }).then(() => navigate("/"));
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
        </article>
      )}
      {sessionStorage.getItem('user_name') && <button onClick={() => handleDelete()}>Delete</button>}
    </div>
  );
}

export default BlogDetails;