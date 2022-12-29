import React, { Fragment } from "react";
import "components/SimpleList/SimpleList.scss";
import { useState, useMemo } from "react";
import ButtonWithLoading from "components/UI/ButtonWithLoading/ButtonWithLoading";
import SimpleListItem from "./SimpleListItem";

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

  const openHideDetailsHandler = async (currentItem, index) => {
    const detailsInfo = !currentItem?.detailsInfo
      ? await getDetails(currentItem)
      : currentItem.detailsInfo;

    const postsNormalize = () => {
      return posts.map((post) => {
        if (currentItem.id === post.id) {
          return {
            ...post,
            detailsInfo,
            showDetails: !currentItem?.showDetails,
          };
        }
        return post;
      });
    };

    if (currentItem?.showDetails) {
      // Timeout to wait close animation
      setTimeout(() => setPosts(postsNormalize), 600);
    } else {
      setPosts(postsNormalize);
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
    <Fragment>
      {posts.map((currentItem, index) => (
        <SimpleListItem
          key={currentItem.id}
          title={currentItem.title}
          name={currentItem.name}
          body={currentItem.body}
          email={currentItem.email}
        >
          {showButtonComment && (
            <div className="comments-box" ref={childRefs[index]}>
              {currentItem?.showDetails && (
                <Fragment>
                  <div className="comments-header">Comments</div>
                  <SimpleList list={currentItem.detailsInfo} />
                </Fragment>
              )}
            </div>
          )}

          {showButtonComment && (
            <ButtonWithLoading
              onClick={openHideDetailsHandler.bind(null, currentItem, index)}
              isPending={isPendingId === currentItem.id}
              loadingText="Loading"
              defaultText="comments"
              show={currentItem?.showDetails}
            />
          )}
        </SimpleListItem>
      ))}
    </Fragment>
  );
};

export default SimpleList;
