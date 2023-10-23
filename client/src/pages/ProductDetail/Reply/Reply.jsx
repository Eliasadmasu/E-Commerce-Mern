import { useEffect, useState } from "react";
import "./reply.css";
import axios from "axios";
import API_URL from "../../../config/config";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import Cookies from "js-cookie";

const Reply = ({ productId, commentId, formatDate }) => {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [vivisbleReplies, setVivisbleReplies] = useState(2);
  const [showAllReply, setShowAllReply] = useState(false);

  // !fetch replie data
  const fetchReplies = async () => {
    try {
      const fetchRepliesResponse = await axios.get(
        `${API_URL}/product/${productId}/comment/${commentId}/reply/fetch`
      );
      if (fetchRepliesResponse.status === 200) {
        setReplies(fetchRepliesResponse.data.replies);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [commentId, productId]);
  // !fetch replie data

  if (!replies) {
    return <div>Loading...</div>;
  }

  //!handleReplySubmit
  const handleReplySubmit = async (e) => {
    e.preventDefault();

    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const response = await axios.post(
        `${API_URL}/product/${productId}/comment/${commentId}/reply`,
        { text: replyText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        setShowAllReply(true);
        await fetchReplies();
        setReplyText("");
      }
      console.log(response);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  //!handleReplySubmit

  // !handleReplyDeletion

  const handleReplyDelete = async (replyId) => {
    console.log(replyId);
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const response = await axios.delete(
        `${API_URL}/product/${productId}/comment/${commentId}/reply/${replyId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        await fetchReplies();
        console.log(response);
      }
    } catch (error) {
      console.error("Error Deleting reply:", error);
    }
  };
  // !handleReplyDeletion
  const handleShowMore = () => {
    setVivisbleReplies((prev) => prev + 3);
  };

  return (
    <div className="replyWholeContainer">
      <div className="repliesCont">
        {/*//todo render 3 replies if showreplies if off  */}
        {!showAllReply &&
          replies.slice(0, vivisbleReplies).map((reply) => (
            <div key={reply._id} className="reply">
              {/*  */}
              <div className="profileCont">
                <img
                  className="userImg"
                  src={
                    "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
                  }
                  alt=""
                />
              </div>
              {/*  */}
              <div className="replyDetail">
                <div className="usernameAnddate">
                  <span className="reply-username">{reply.username}</span>
                  <span className="Replydate">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>
                <span className="mainReplytext">{reply.text}</span>
                <div
                  className="replyDeleteBtn"
                  onClick={() => handleReplyDelete(reply._id)}
                >
                  delete
                </div>
              </div>
              {/*  */}
            </div>
          ))}
        {showAllReply &&
          replies.map((reply) => (
            <div key={reply._id} className="reply">
              {/*  */}
              <div className="profileCont">
                <img
                  className="userImg"
                  src={
                    "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg"
                  }
                  alt=""
                />
              </div>
              {/*  */}
              <div className="replyDetail">
                <div className="usernameAnddate">
                  <span className="reply-username">{reply.username}</span>
                  <span className="Replydate">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>
                <span className="mainReplytext">{reply.text}</span>
                <div
                  className="replyDeleteBtn"
                  onClick={() => handleReplyDelete(reply._id)}
                >
                  delete
                </div>
              </div>
              {/*  */}
            </div>
          ))}
        {/*//todo render all replies if showreplies if on  */}
      </div>

      {replies.length > vivisbleReplies && (
        <button className="showmoreBtn" onClick={handleShowMore}>
          Show more reply
        </button>
      )}

      <form onSubmit={handleReplySubmit}>
        <input
          className="replyInput"
          type="text"
          placeholder="Write your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default Reply;
