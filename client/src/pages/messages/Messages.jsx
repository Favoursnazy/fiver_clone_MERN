import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleReadMessage = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading data"
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data &&
              data.map((message) => (
                <tr
                  className={
                    ((currentUser.isSeller && !message.readBySeller) ||
                      (!currentUser.isSeller && !message.readByBuyer)) &&
                    "active"
                  }
                  key={message.id}
                >
                  <td>
                    {currentUser.isSeller ? message.buyerId : message.sellerId}
                  </td>
                  <td>
                    <Link to={`/message/${message.id}`} className="link">
                      {message?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(message.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !message.readBySeller) ||
                      (!currentUser.isSeller && !message.readByBuyer)) && (
                      <button onClick={() => handleReadMessage(message.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
