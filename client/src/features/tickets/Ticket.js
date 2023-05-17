import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { parseISO, formatDistanceToNow, formatDistance } from "date-fns";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";

const Ticket = ({ ticketId, userID }) => {
  let assignee;
  const { ticket } = useGetTicketsQuery("ticketsList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  if (isLoading) assignee = "...Loading";

  if (isError) {
    assignee = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = users;

    let assigneeIds = [...ids];

    assignee = assigneeIds.map((userID) =>
      entities[userID].id === ticket.userId ? entities[userID].username : null
    );
  }

  if (ticket) {
    const created = new Date(ticket.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const updated = new Date(ticket.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let timeAgo = "";
    if (!ticket.status) {
      const timePeriod = formatDistanceToNow(parseISO(ticket.createdAt), {
        includeSeconds: true,
      });
      timeAgo = `${timePeriod}`;
    } else {
      const timePeriod = formatDistance(
        parseISO(ticket.createdAt),
        parseISO(ticket.updatedAt),
        { includeSeconds: true }
      );
      timeAgo = `${timePeriod}`;
    }

    const handleEdit = () => navigate(`/dash/tickets/${ticketId}`);

    return (
      <tr className="table__row">
        <td className="table__cell ticket__status">
          {ticket.status ? (
            <span className="ticket__status--completed">Completed</span>
          ) : (
            <span className="ticket__status--open">Open</span>
          )}
        </td>
        <td className="table__cell ticket__created">{created}</td>
        <td className="table__cell ticket__updated">{updated}</td>
        <td className="table__cell ticket__title">{ticket.name}</td>
        <td className="table__cell ticket__username">{ticket.author}</td>
        <td className="table__cell ticket__username">{assignee}</td>
        <td className="table__cell ticket__updated">{timeAgo}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedTicket = memo(Ticket);

export default memoizedTicket;
