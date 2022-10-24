import React from "react";
import Navbar from "components/Navbar/Navbar";
import Home from "pages/Home/Home";
import Posts from "pages/Posts/Posts";
// import Comments from "pages/Comments/Comements";
import Todos from "pages/Todos/Todos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useScroll } from "react-use";

function App() {
  const scrollRef = React.useRef(null);
  const { y } = useScroll(scrollRef);

  const menuItens = [
    { name: "Home", path: "/" },
    { name: "Posts", path: "/posts" },
    // { name: "Comments", path: "/comments" },
    { name: "Todos", path: "/todos" },
  ];

  return (
    <Router>
      <div className="content-body" ref={scrollRef}>
        <Navbar menuItens={menuItens} y={y} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          {/* <Route path="/comments" element={<Comments />} /> */}
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </div>
      <footer>Powered by rfilippis</footer>
    </Router>
  );
}

export default App;
