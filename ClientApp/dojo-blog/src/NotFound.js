import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Page not found</h2>
            <Link to='/'>Go Home</Link>
        </div>
     );
}
 
export default NotFound;