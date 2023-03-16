import React from "react";
import { Link } from "react-router-dom";
import "./Message.scss";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  console.log(id);

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages/create/`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">MESSAGES</Link> JOHN DOE
        </span>

        {isLoading
          ? "Loading data"
          : error
          ? "Something went wrong"
          : data && (
              <div className="messages">
                {data.map((m) => (
                  <div
                    className={
                      m.userId === currentUser._id ? "owner item" : "item"
                    }
                    key={m._id}
                  >
                    <img
                      src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <p>{m.desc}</p>
                  </div>
                ))}
              </div>
            )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            placeholder="Write a message"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
