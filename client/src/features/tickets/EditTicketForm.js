import React, { useState, useEffect } from "react";
import {
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} from "./ticketsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrashCan,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { PRIORITIES } from "../../config/priority";
import { SEVERITIES } from "../../config/severity";
import { NATURES } from "../../config/nature";

const EditTicketForm = ({ ticket, users }) => {
  const { isManager, isAdmin } = useAuth();
  const [updateTicket, { isLoading, isSuccess, isError, error }] =
    useUpdateTicketMutation();

  const [
    deleteTicket,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteTicketMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(ticket.name);
  const [details, setDetails] = useState(ticket.details);
  const [steps, setSteps] = useState(ticket.steps);
  const [version, setVersion] = useState(ticket.version);
  const [priority, setPriority] = useState(ticket.priority);
  const [severity, setSeverity] = useState(ticket.severity);
  const [nature, setNature] = useState(ticket.nature);
  const [status, setStatus] = useState(ticket.status);
  const [userId, setUserId] = useState(ticket.user);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setDetails("");
      setSteps("");
      setVersion("");
      setPriority("");
      setSeverity("");
      setNature("");
      setStatus("");
      setUserId("");
      navigate("/dash/tickets");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // const onNameChanged = (e) => setName(e.target.value);
  const onNameChanged = (e) => {
    setChanged(true);
    setName(e.target.value);
  };
  const onDetailsChanged = (e) => {
    setChanged(true);
    setDetails(e.target.value);
  };
  const onStepsChanged = (e) => {
    setChanged(true);
    setSteps(e.target.value);
  };
  const onVersionChanged = (e) => {
    setChanged(true);
    setVersion(e.target.value);
  };
  const onPriorityChanged = (e) => {
    setChanged(true);
    setPriority(e.target.value);
  };
  const onSeverityChanged = (e) => {
    setChanged(true);
    setSeverity(e.target.value);
  };
  const onNatureChanged = (e) => {
    setChanged(true);
    setNature(e.target.value);
  };
  const onStatusChanged = () => {
    setChanged(true);
    setStatus((prev) => !prev);
  };
  const onUserIdChanged = (e) => {
    setChanged(true);
    setUserId(e.target.value);
  };

  const onSaveTicketClicked = async () => {
    if (changed && !isLoading) {
      await updateTicket({
        id: ticket.id,
        name,
        details,
        steps,
        version,
        priority,
        severity,
        nature,
        status,
        userId,
      });
    }
  };

  const onDeleteTicketClicked = async () => {
    await deleteTicket({ id: ticket.id });
  };

  const onReloadTicketClicked = () => {
    setChanged(false);
    setName(ticket.name);
    setDetails(ticket.details);
    setSteps(ticket.steps);
    setVersion(ticket.version);
    setPriority(ticket.priority);
    setSeverity(ticket.severity);
    setNature(ticket.nature);
    setStatus(ticket.status);
    setUserId(ticket.user);
  };

  const created = new Date(ticket.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(ticket.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const priorityOptions = Object.values(PRIORITIES).map((optpriority) => {
    return (
      <option key={optpriority} value={optpriority}>
        {" "}
        {optpriority}
      </option>
    );
  });

  const severityOptions = Object.values(SEVERITIES).map((optseverity) => {
    return (
      <option key={optseverity} value={optseverity}>
        {" "}
        {optseverity}
      </option>
    );
  });

  const natureOptions = Object.values(NATURES).map((optnature) => {
    return (
      <option key={optnature} value={optnature}>
        {" "}
        {optnature}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validDetailsClass = !details ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteTicketClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  let reloadButton = null;
  reloadButton = (
    <button
      className="icon-button"
      title="Reload"
      onClick={onReloadTicketClicked}
    >
      <FontAwesomeIcon icon={faWindowRestore} />
    </button>
  );

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Bug #{ticket.id}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveTicketClicked}
              disabled={!changed}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {reloadButton}
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="ticket-title">
          Name:
        </label>
        <input
          className={`form__input ${validNameClass}`}
          id="ticket-title"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />

        <label className="form__label" htmlFor="ticket-text">
          Details:
        </label>
        <textarea
          className={`form__input form__input--text ${validDetailsClass}`}
          id="ticket-text"
          name="text"
          value={details}
          onChange={onDetailsChanged}
        />

        <label className="form__label" htmlFor="steps">
          Steps:
        </label>
        <textarea
          className="form__input form__input--text"
          id="steps"
          name="steps"
          value={steps}
          onChange={onStepsChanged}
        />

        <label className="form__label" htmlFor="version">
          Version:
        </label>
        <input
          className="form__input"
          id="version"
          name="version"
          type="text"
          autoComplete="off"
          value={version}
          onChange={onVersionChanged}
        />

        {(isManager || isAdmin) && (
          <>
            <label className="form__label" htmlFor="priority">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              className="form__select"
              value={priority}
              onChange={onPriorityChanged}
            >
              {priorityOptions}
            </select>

            <label className="form__label" htmlFor="severity">
              Severity:
            </label>
            <select
              id="severity"
              name="severity"
              className="form__select"
              value={severity}
              onChange={onSeverityChanged}
            >
              {severityOptions}
            </select>

            <label className="form__label" htmlFor="nature">
              Nature:
            </label>
            <select
              id="nature"
              name="nature"
              className="form__select"
              value={nature}
              onChange={onNatureChanged}
            >
              {natureOptions}
            </select>

            <div className="form__row">
              <div className="form__divider">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="ticket-status"
                >
                  WORK COMPLETE:
                  <input
                    className="form__checkbox"
                    id="ticket-status"
                    name="status"
                    type="checkbox"
                    checked={status}
                    onChange={onStatusChanged}
                  />
                </label>

                <label
                  className="form__label form__checkbox-container"
                  htmlFor="ticket-username"
                >
                  ASSIGNED TO:
                </label>
                <select
                  id="ticket-username"
                  name="username"
                  className="form__select"
                  value={userId}
                  onChange={onUserIdChanged}
                >
                  {options}
                </select>
              </div>
              <div className="form__divider">
                <p className="form__created">
                  Created:
                  <br />
                  {created}
                </p>
                <p className="form__updated">
                  Updated:
                  <br />
                  {updated}
                </p>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );

  return content;
};

export default EditTicketForm;
