import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const serverBaseUrl = process.env.REACT_APP_API_URL;
  const { error, isPending, data: blogs } = useFetch(`${serverBaseUrl}/blogs/`)
  
  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
    </div>
  );
}
 
export default Home;
