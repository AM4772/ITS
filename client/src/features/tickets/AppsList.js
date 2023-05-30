import React from "react";
import { Link } from "react-router-dom";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const AppsList = () => {
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = tickets;

    let ticketsIds = [...ids];

    let appsArray = ticketsIds.map((item) => entities[item].application);

    let appsSet = [...new Set(appsArray)];

    let sortedAppsSet = [...appsSet].sort();

    const tableContent = sortedAppsSet.map((app) => (
      <tr key={app} className="table__row app">
        <td className="table__cell">
          <Link to={`/dash/apps/list?appname=${app}`}>{app}</Link>
        </td>
      </tr>
    ));

    content = (
      <table className="table__applist">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th ticket__app">
              Applications
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default AppsList;
