import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewTicketForm from "./NewTicketForm";
import useTitle from "../../hooks/useTitle";

const NewTicket = () => {
  useTitle("Bugxinator: New Bug");

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewTicketForm users={users} />;

  return content;
};

export default NewTicket;
