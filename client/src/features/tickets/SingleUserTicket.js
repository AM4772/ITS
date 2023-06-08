import React from "react";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow, formatDistance } from "date-fns";
import { useGetSortedTicketsQuery } from "./ticketsApiSlice";
import { priorityName } from "../../config/priority";
import { severityName } from "../../config/severity";

const SingleUserTicket = ({ ticketId }) => {
  const { ticket } = useGetSortedTicketsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[ticketId],
    }),
  });

  if (ticket) {
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

    return (
      <tr className="table__row">
        <td className="table__cell ticket__title">
          <Link to={`/dash/tickets/${Number(ticket.id)}`}>{ticket.name}</Link>
        </td>
        <td className="table__cell ticket__app">{ticket.application}</td>
        <td className="table__cell ticket__status">
          {ticket.status ? (
            <span className="ticket__status--completed">Closed</span>
          ) : (
            <span className="ticket__status--open">Open</span>
          )}
        </td>
        <td className="table__cell ticket__timeago">{timeAgo}</td>
        <td className="table__cell ticket__priority">
          {priorityName(ticket.priority)}
        </td>
        <td className="table__cell ticket__severity">
          {severityName(ticket.severity)}
        </td>
        <td className="table__cell ticket__nature">{ticket.nature}</td>
      </tr>
    );
  } else return null;
};

export default SingleUserTicket;
