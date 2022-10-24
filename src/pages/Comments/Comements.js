import useFetch from "hooks/useFetch/useFetch";
import SimpleList from "components/SimpleList/SimpleList";
import LoadingFullPage from "components/LoadingFullPage/LoadingFullPage";

const Comments = ({ scrollRef }) => {
  const {
    data: comments,
    isPending,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/comments");
  return (
    <div className="page-content">
      {isPending && <LoadingFullPage></LoadingFullPage>}
      <div className="page-title">Comments</div>

      {error && <div>{error}</div>}
      {comments && <SimpleList list={comments} />}
    </div>
  );
};

export default Comments;
