import logo from "logo.svg";
import { AttentionSeeker } from "react-awesome-reveal";
import "pages/Home/Home.scss";

const Home = () => {
  return (
    <div className="page-content">
      <AttentionSeeker effect="pulse">
        <div className="page-title">Welcome to R-fras home</div>
      </AttentionSeeker>
      <div className="text-center">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
};

export default Home;
