import React from "react";
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import EditTicketForm from "./EditTicketForm";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const EditTicket = () => {
  useTitle("techBugs: Edit Bug");

  const { id } = useParams();

  const { username, isManager, isAdmin, isDeveloper } = useAuth();

  const { ticket } = useGetTicketsQuery("ticketsList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[parseInt(id)],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((i) => data?.entities[i]),
    }),
  });

  if (!ticket || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin && !isDeveloper) {
    if (ticket.author !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditTicketForm ticket={ticket} users={users} />;

  return content;
};
export default EditTicket;
