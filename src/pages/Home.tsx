import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"/auth"}>Login</Link>
    </div>
  );
};

export default Home;
