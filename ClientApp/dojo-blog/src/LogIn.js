import { useState } from "react";
import { useNavigate } from "react-router";

const LogIn = () => {
    const serverBaseUrl = process.env.REACT_APP_API_URL;
    const [name, setName] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if(isLoggedIn())
        {
            sessionStorage.clear();
        }
        else
        {
            await fetch(`${serverBaseUrl}/login/` + name)
            .then(response => response.json())
            .then(data => 
                {
                    sessionStorage.setItem("access_token", data.access_token);
                    sessionStorage.setItem("user_name", data.user_name);
                });
        }        
        
        navigate("/");
    };

    const isLoggedIn = () => sessionStorage.getItem("user_name");

    return (
        <div className="login">
            {
                !isLoggedIn() ? 
                <form onSubmit={handleSubmit}>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <button type="submit">Log In</button>
                </form> :
                <form onSubmit={handleSubmit}>
                    <button type="submit">Log Out</button>
                </form>
            }
        </div>
      );
}
 
export default LogIn;