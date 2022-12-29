import { ThreeDots } from "react-loading-icons";
import "./ButtonWithLoading.scss";

const ButtonWithLoading = (props) => {
  const { onClick, isPending, show, loadingText, defaultText } = props;
  return (
    <button
      className="button-with-loading"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending && (
        <div className="button-load">
          {loadingText}
          <ThreeDots stroke="#000" fill="#2d2d2d" height=".3em" width="25px" />
        </div>
      )}
      {!isPending && (
        <span>
          {show ? "Hide " : "Show "} {defaultText}
        </span>
      )}
    </button>
  );
};

export default ButtonWithLoading;
