import React from "react";
import useFetch from "hooks/useFetch/useFetch";
import SimpleList from "components/SimpleList/SimpleList";
import LoadingFullPage from "components/LoadingFullPage/LoadingFullPage";

const Posts = ({ scrollRef }) => {
  scrollRef = React.useRef(null);
  const {
    data: posts,
    isPending,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");
  return (
    <div className="page-content">
      {isPending && <LoadingFullPage></LoadingFullPage>}
      <div className="page-title">Posts</div>

      {error && <div>{error}</div>}
      {posts && <SimpleList list={posts} showButtonComment="true" />}
    </div>
  );
};

export default Posts;
