import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='min-h-screen items-center flex justify-center'>
      <Link to={"/auth/login"}>Login to Apps</Link>
    </div>
  );
};

export default Home;
