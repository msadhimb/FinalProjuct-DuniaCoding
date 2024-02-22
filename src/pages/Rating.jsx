import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Ratings = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      rating: 3,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);
  const [newComment, setNewComment] = useState({
    rating: 0,
    comment: "",
  });
  const [editedComment, setEditedComment] = useState({
    id: null,
    rating: 0,
    comment: "",
  });

  const handleAddComment = () => {
    if (!newComment.rating || !newComment.comment) {
      toast.error("Please fill in all fields");
      return;
    }
    const newId = comments.length + 1;
    setComments([
      ...comments,
      { id: newId, rating: newComment.rating, comment: newComment.comment },
    ]);
    setNewComment({ rating: 0, comment: "" });
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    setEditedComment({ ...commentToEdit });
    setIsEdit(true);
  };

  const saveEditedComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editedComment.id ? editedComment : comment
    );
    setComments(updatedComments);
    setEditedComment({ id: null, rating: 0, comment: "" });
    setIsEdit(false);
  };

  return (
    <>
      <div className="container my-5 mx-auto font-kodeMono">
        <h1 className="text-2xl font-bold my-5">
          How would you describe our website?
        </h1>
        <div className="shadow-md rounded font-sans">
          <div className="flex justify-start items-center mt-3 mx-3">
            <Rating
              name="rating"
              initialRating={newComment.rating}
              onChange={(rate) =>
                setNewComment({ ...newComment, rating: rate })
              }
              emptySymbol="far fa-star text-2xl text-yellow-300"
              fullSymbol="fas fa-star text-2xl text-yellow-300"
            />
          </div>
          <hr className="my-3" />
          <div className="mx-3 mb-3">
            <textarea
              name="comment"
              type="text"
              className="border-2 border-none p-2 rounded-md w-full h-[5rem] focus:outline-none focus:border-transparent focus:ring-transparent"
              placeholder="Your comment"
              value={newComment.comment}
              onChange={(e) =>
                setNewComment({ ...newComment, comment: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end pb-3 mx-3">
            <button
              className="bg-green-400 text-white px-4 py-2 rounded-md"
              onClick={handleAddComment}
            >
              Send
            </button>
          </div>
        </div>
        {comments.map((comment, index) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 my-3 font-sans"
            key={comment.id}
          >
            <div className="flex items-center w-full">
              <img
                src={"https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-grow">
                {isEdit && editedComment.id === comment.id ? (
                  <div className="flex items-center justify-between w-full mb-2">
                    <div>
                      <span className="font-bold text-lg mr-2">Anonymous</span>
                      <Rating
                        initialRating={editedComment.rating}
                        onChange={(rate) =>
                          setEditedComment({ ...editedComment, rating: rate })
                        }
                        emptySymbol="far fa-star text-lg text-yellow-300"
                        fullSymbol="fas fa-star text-lg text-yellow-300"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="bg-green-400 text-white px-4 py-2 rounded-md"
                        onClick={saveEditedComment}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full mb-2">
                    <div>
                      <span className="font-bold text-lg mr-2">Anonymous</span>
                      <Rating
                        initialRating={comment.rating}
                        readonly
                        emptySymbol="far fa-star text-lg text-yellow-300"
                        fullSymbol="fas fa-star text-lg text-yellow-300"
                      />
                    </div>
                    <div className="flex gap-3">
                      <FaTrash
                        color="#a8324c"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="cursor-pointer"
                      />
                      <FaEdit
                        color="#ebbd34"
                        className="cursor-pointer"
                        onClick={() => handleEditComment(comment.id)}
                      />
                    </div>
                  </div>
                )}
                <p className="text-gray-700">
                  {isEdit && editedComment.id === comment.id ? (
                    <textarea
                      name="editedComment"
                      type="text"
                      className="border p-2 rounded-md w-full h-[5rem] focus:outline-none focus:border-green-400 focus:ring-transparent"
                      value={editedComment.comment}
                      onChange={(e) =>
                        setEditedComment({
                          ...editedComment,
                          comment: e.target.value,
                        })
                      }
                    />
                  ) : (
                    comment.comment
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ratings;
