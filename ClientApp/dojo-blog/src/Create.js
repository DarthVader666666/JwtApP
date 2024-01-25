import { useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router";

const Create = () => {
  const serverBaseUrl = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const {data} = useFetch(`${serverBaseUrl}/blogs/`);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    const blog = {title, body, author};

    setIsPending(true);

    setTimeout(() => {
      fetch(`${serverBaseUrl}/blogs/`, 
          {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
          }).then(() => setIsPending(false));

          navigate('/');
    }, 200); 
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}></input>

        <label>Body</label>
        <textarea type="text" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        <label>Author</label>
        {
          data && 
          <select value={author} onChange={(e) => setAuthor(e.target.value)} key={data.id}>
            { data.map(x => {return <option value={x.author}>{x.author}</option>}) }
          </select>
        }
        <button disabled={isPending}>{isPending ? "Loading..." : "Add Blog"}</button>
      </form>
    </div>
  );
}
 
export default Create;