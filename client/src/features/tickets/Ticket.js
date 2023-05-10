import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetTicketsQuery } from "./ticketsApiSlice";

const Ticket = ({ ticketId }) => {
  const { ticket } = useGetTicketsQuery("ticketsList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  const navigate = useNavigate();

  if (ticket) {
    const created = new Date(ticket.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(ticket.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

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
