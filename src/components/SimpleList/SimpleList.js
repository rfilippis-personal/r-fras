import React from "react";
import "components/SimpleList/SimpleList.scss";
import { useState, useMemo } from "react";
import { ThreeDots } from "react-loading-icons";

const SimpleList = ({ list, showButtonComment = false }) => {
  const [posts, setPosts] = useState(list);
  const [isPendingId, setIsPendingId] = useState(null);

  const childRefs = useMemo(() => list.map(() => React.createRef()), [list]);

  const getDetails = async ({ id }) => {
    setIsPendingId(id);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const data = await response.json();
    setIsPendingId(null);
    return data;
  };

  const handleOpenHideDetails = async (currentItem, index) => {
    const detailsInfo = !currentItem?.detailsInfo
      ? await getDetails(currentItem)
      : currentItem.detailsInfo;
    if (currentItem?.showDetails) {
      setTimeout(() => {
        setPosts(
          posts.map((post) => {
            if (currentItem.id === post.id) {
              return {
                ...post,
                detailsInfo,
                showDetails: !currentItem?.showDetails,
              };
            }
            return post;
          })
        );
      }, 600);
    } else {
      setPosts(
        posts.map((post) => {
          if (currentItem.id === post.id) {
            return {
              ...post,
              detailsInfo,
              showDetails: !currentItem?.showDetails,
            };
          }
          return post;
        })
      );
    }

    const content = childRefs[index].current;

    setTimeout(() => {
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }, 1);
  };

  return (
    <>
      {posts.map((currentItem, index) => (
        <div className="simple-list-container" key={currentItem.id}>
          {currentItem.title && (
            <div className="simple-list-title">{currentItem.title}</div>
          )}
          {currentItem.name && (
            <div className="simple-list-title">{currentItem.name}</div>
          )}
          <div className="simple-list-body">{currentItem.body}</div>
          {currentItem.email && (
            <div className="simple-list-email">
              Coment from {currentItem.email}
            </div>
          )}

          {showButtonComment && (
            <div className="comments-box" ref={childRefs[index]}>
              {currentItem?.showDetails && (
                <>
                  <div className="comments-header">Comments</div>
                  <SimpleList list={currentItem.detailsInfo} />
                </>
              )}
            </div>
          )}

          {showButtonComment && (
            <button
              className="button-comments"
              onClick={() => handleOpenHideDetails(currentItem, index)}
              disabled={isPendingId === currentItem.id}
            >
              {isPendingId === currentItem.id && (
                <div className="button-load">
                  Loading
                  <ThreeDots
                    stroke="#000"
                    fill="#2d2d2d"
                    height=".3em"
                    width="25px"
                  />
                </div>
              )}
              {isPendingId !== currentItem.id && (
                <span>
                  {currentItem?.showDetails ? "Hide " : "Show "} comments
                </span>
              )}
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default SimpleList;
