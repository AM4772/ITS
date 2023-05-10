import React from "react";
import { useParams } from "react-router-dom";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import EditTicketForm from "./EditTicketForm";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const EditTicket = () => {
  useTitle("techBugs: Edit Bug");

  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { ticket } = useGetTicketsQuery("ticketsList", {
    selectFromResult: ({ data }) => ({
      ticket: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!ticket || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (ticket.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditTicketForm ticket={ticket} users={users} />;

  return content;
};
export default EditTicket;
