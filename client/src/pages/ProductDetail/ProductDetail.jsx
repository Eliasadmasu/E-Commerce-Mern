import { useCallback, useEffect, useState } from "react";
import "./productdetail.css";
import axios from "axios";
import API_URL from "../../config/config";
import { useParams } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import Magnifier from "react-magnifier";
import { Button } from "@mui/material";
import { IoSend } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import generateNewAccessToken from "../../config/generateRefreshToken";
import Cookies from "js-cookie";
import DeleteComment from "./DeleteComment/DeleteComment";
import Reply from "./Reply/Reply";
import RatingComp from "./RatingComp/RatingComp";
import AddToCart from "./AddToCart/AddToCart";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [img, setImg] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const [editableCommentId, setEditableCommentId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const { productId } = useParams();

  const handleTextSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await generateNewAccessToken();

        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.log("accessToken misiing");
        }

        const postComment = await axios.post(
          `${API_URL}/product/${productId}/comment`,
          { text },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (postComment.status === 201) {
          setText("");
          console.log(postComment);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [productId, text]
  );
  useEffect(() => {
    const CurrentUserFetch = async () => {
      try {
        await generateNewAccessToken();

        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.log("accessToken misiing");
        }

        const currentUser = await axios.get(`${API_URL}/product/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (currentUser.status === 200) {
          setUserId(currentUser.data.CurrentUserId);
        }
        console.log({ currentUser });
      } catch (error) {
        console.error(error);
      }
    };
    CurrentUserFetch();
  }, [productId, text]);
  // !
  // !
  // !

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/product/detail/${productId}`
        );
        if (response.status === 200) {
          setProduct(response.data);
          console.log({ fetchProduct: response });
          if (response.data.imageUrl && response.data.imageUrl.length > 0) {
            setImg(response.data.imageUrl[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductDetail();
  }, [productId, text]);

  // !
  // !
  // !

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  //
  useEffect(() => {
    if (editableCommentId !== null) {
      const commentToEdit = product?.comments?.find(
        (comment) => comment._id === editableCommentId
      );
      if (commentToEdit) {
        setEditedComment(commentToEdit.text);
      }
    }
  }, [editableCommentId, product?.comments]);
  //

  const hoverHandler = useCallback((image, idx) => {
    setImg(image);
    setActiveImageIndex(idx);
  }, []);

  const handleEditComment = (commentId, commentText) => {
    setIsEditing({
      [commentId]: true,
    });
    setEditableCommentId(commentId);
  };

  const handleCommentUpdateValue = (e) => {
    setEditedComment(e.target.value);
  };

  const handleCommentUpdate = useCallback(
    async (commentID) => {
      try {
        await generateNewAccessToken();

        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.log("accessToken misiing");
        }

        const UpdateComment = await axios.put(
          `${API_URL}/product/${productId}/comment/${commentID}`,
          { text: editedComment },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (UpdateComment.status === 200) {
          setProduct((prevProduct) => {
            const updatedComments = prevProduct.comments.map((comment) => {
              if (comment._id === commentID) {
                return { ...comment, text: editedComment };
              }
              return comment;
            });
            return { ...prevProduct, comments: updatedComments };
          });

          setIsEditing({
            [commentID]: false,
          });
        }
        console.log(UpdateComment);
      } catch (error) {
        console.error(error);
      }
    },
    [editedComment, productId]
  );

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "Unknown Date";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    try {
      return new Intl.DateTimeFormat("en-US", options).format(
        new Date(timestamp)
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="productDetailcont">
        <div className="imagedetail">
          <div className="imageleft">
            {product.imageUrl &&
              product.imageUrl.map((image, idx) => (
                <div key={idx} className="imgCont">
                  <img
                    className={`productDetailimgleft ${
                      idx === activeImageIndex ? "active" : ""
                    }`}
                    src={`${API_URL}/public/uploads/${image}`}
                    alt={image}
                    loading="lazy"
                    onMouseOver={() => hoverHandler(image, idx)}
                  />
                </div>
              ))}
          </div>
          <div className="imageright">
            <Magnifier
              src={`${API_URL}/public/uploads/${img}`}
              width={500}
              zoomFactor={2}
            />
          </div>
          {/*  */}
        </div>
        <div className="otherDetails">
          <div className="titleF">{product.name}</div>
          <div>
            <div className="primaryTxt ">About this item:</div>
            <div
              className="productAbout ql-editor"
              dangerouslySetInnerHTML={{ __html: product.aboutitem }}
            />
          </div>
          <div className="priceD">
            Price: <span>${product.price}</span>
          </div>
          <div className="deliver">
            <div className="deliver-primary">Delivery & Support</div>
            <div className="deliver-second">Select to learn more</div>
            <div className="logosDtMain">
              <div className="logosDt">
                <TbTruckDelivery size={35} />
                Ships from Shop house
              </div>
              <div className="logosDt">
                <RiCustomerService2Fill size={35} />
                Customer Support
              </div>
            </div>
          </div>
          {/*  */}
          <div className="butnCont">
            <AddToCart productId={productId} />
          </div>
        </div>
      </div>
      <div className="productInfoandDescCont">
        <div className="infoCont">
          <div className="primaryTxt">Product information</div>
          <div
            className="productInfo ql-editor"
            dangerouslySetInnerHTML={{ __html: product.productinfo }}
          />
        </div>
        <div className="border"></div>
        <div className="descCont">
          <div className="primaryTxt">Product Description</div>
          <div
            className="productDesc ql-editor"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
      {/*  */}
      <form className="addCommentcont" onSubmit={handleTextSubmit}>
        <input
          type="text"
          placeholder="Write Customer review"
          onChange={handleChange}
          value={text}
          className="commentInput"
        />
        <Button type="submit" variant="contained" className="createCommetnBtn">
          Comment
          <IoSend />
        </Button>
      </form>
      {/* //!!!! */}
      <div className="ratingAndCommentCont">
        {/* //? */}
        {/* //? */}
        {/* //? */}
        {/* //? */}
        <RatingComp productId={productId} />
        {/* //? */}
        {/* //? */}
        {/* //? */}
        {/* //? */}
        {/* //!Comment */}
        <div className="commetntWrapper">
          <div className="noreview">
            {product?.comments.length === 0 && <div>No customer reviews</div>}
          </div>

          {product?.comments?.map((comment) => (
            <div key={comment._id} className="singlecommetntWrapper">
              <div className="commentsCont">
                <div className="circle">
                  <img
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                    alt=""
                  />
                </div>
                <div className="user_text_button">
                  <div className="username_date">
                    <h1 className="commenterName">{comment.username}</h1>
                    <div className="commentCreatedAt">
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                  {!isEditing[comment._id] && (
                    <>
                      <div className="commentTxt">{comment.text}</div>
                      <div className="commentButton">
                        {userId === comment.user && (
                          <div className="EditandDelete">
                            <div
                              className="Editpointer"
                              onClick={() => handleEditComment(comment._id)}
                            >
                              Edit
                            </div>
                            <DeleteComment
                              commentId={comment._id}
                              productId={productId}
                              onDeleteComment={() => {
                                setProduct((prevProduct) => {
                                  const updatedComment =
                                    prevProduct.comments.filter(
                                      (c) => c._id !== comment._id
                                    );

                                  return {
                                    ...prevProduct,
                                    comments: updatedComment,
                                  };
                                });
                              }}
                            />
                          </div>
                        )}
                        {/*//! */}
                        {/*//! */}
                        {/*//! */}
                        <Reply
                          productId={productId}
                          commentId={comment._id}
                          formatDate={formatDate}
                        />
                        {/*//! */}
                        {/*//! */}
                        {/*//! */}
                      </div>
                    </>
                  )}
                  {userId === comment.user &&
                    editableCommentId === comment._id &&
                    isEditing[comment._id] && (
                      <div className="commentActions">
                        <div>
                          <input
                            className="updateCommentInput"
                            type="text"
                            placeholder="Edit comment"
                            value={editedComment}
                            onChange={handleCommentUpdateValue}
                          />
                        </div>
                        <div className="commentbtnCont">
                          <div
                            className="updatebutton"
                            onClick={() => handleCommentUpdate(comment._id)}
                          >
                            Update
                          </div>
                          <div
                            onClick={() =>
                              setIsEditing({
                                [comment._id]: false,
                              })
                            }
                            className="discardUpdate"
                          >
                            cancel
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/*  */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
