import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrashCan,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { parseISO, formatDistanceToNow, formatDistance } from "date-fns";
import {
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} from "./ticketsApiSlice";
import useAuth from "../../hooks/useAuth";
import { PRIORITIES } from "../../config/priority";
import { SEVERITIES } from "../../config/severity";
import { NATURES } from "../../config/nature";
import { RESOLUTIONS } from "../../config/resolutions";
import { APPLICATIONS } from "../../config/applications";

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
  const [application, setApplication] = useState(ticket.application);
  const [author, setAuthor] = useState(ticket.author);
  const [details, setDetails] = useState(ticket.details);
  const [steps, setSteps] = useState(ticket.steps);
  const [version, setVersion] = useState(ticket.version);
  const [priority, setPriority] = useState(ticket.priority);
  const [severity, setSeverity] = useState(ticket.severity);
  const [nature, setNature] = useState(ticket.nature);
  const [status, setStatus] = useState(ticket.status);
  const [resolution, setResolution] = useState(ticket.resolution);
  const [userId, setUserId] = useState(ticket.userId);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setApplication("");
      setDetails("");
      setSteps("");
      setVersion("");
      setPriority("");
      setSeverity("");
      setNature("");
      setStatus("");
      setResolution("");
      setUserId("");
      navigate("/dash/tickets");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => {
    setChanged(true);
    setName(e.target.value);
  };
  const onApplicationChanged = (e) => {
    setChanged(true);
    setApplication(e.target.value);
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
  const onResolutionChanged = (e) => {
    setChanged(true);
    setResolution(e.target.value);
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
        application,
        details,
        steps,
        version,
        priority,
        severity,
        nature,
        status,
        resolution,
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
    setApplication(ticket.application);
    setAuthor(ticket.author);
    setDetails(ticket.details);
    setSteps(ticket.steps);
    setVersion(ticket.version);
    setPriority(ticket.priority);
    setSeverity(ticket.severity);
    setNature(ticket.nature);
    setStatus(ticket.status);
    setResolution(ticket.resolution);
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

  const assignee = users.map((user) =>
    user.id === ticket.userId ? user.username : null
  );

  const options = users.map((user) =>
    user.role === "Developer" || user.role === "Manager" ? (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    ) : null
  );

  const appOptions = Object.values(APPLICATIONS).map((optapp) => {
    return (
      <option key={optapp} value={optapp}>
        {" "}
        {optapp}
      </option>
    );
  });

  const priorityOptions = Object.entries(PRIORITIES).map(([k, v]) => {
    return (
      <option key={v} value={v}>
        {" "}
        {k}
      </option>
    );
  });

  const severityOptions = Object.entries(SEVERITIES).map(([k, v]) => {
    return (
      <option key={v} value={v}>
        {" "}
        {k}
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

  const resolutionOptions = RESOLUTIONS.map(({ code, title }) => {
    return (
      <option key={code} value={title}>
        {" "}
        {title}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validApplicationClass = !application ? "form__input--incomplete" : "";
  const validDetailsClass = !details ? "form__input--incomplete" : "";
  const validPriorityClass = !priority ? "form__select--incomplete" : "";
  const validSeverityClass = !severity ? "form__select--incomplete" : "";
  const validNatureClass = !nature ? "form__select--incomplete" : "";
  const validResolutionClass = !resolution ? "form__select--incomplete" : "";
  const validUserIdClass = !userId ? "form__select--incomplete" : "";

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
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <p className={errClass}>{errContent}</p>
        <h3>Bug assigned to: {assignee}</h3>
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

        <label className="form__label" htmlFor="application">
          App Name:
        </label>
        <select
          id="application"
          name="application"
          className={`form__select ${validApplicationClass}`}
          value={application}
          onChange={onApplicationChanged}
        >
          {appOptions}
        </select>

        <label className="form__label" htmlFor="author">
          Created by:
        </label>
        <input
          className="form__input author"
          id="author"
          name="author"
          type="text"
          autoComplete="off"
          value={author}
          readOnly
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
            <div className="form__row">
              <div className="form__divider">
                <label className="form__label" htmlFor="priority">
                  Priority:
                </label>
                <select
                  id="priority"
                  name="priority"
                  className={`form__select ${validPriorityClass}`}
                  value={priority}
                  onChange={onPriorityChanged}
                >
                  {priorityOptions}
                </select>
              </div>
              <div className="form__divider">
                <label className="form__label" htmlFor="severity">
                  Severity:
                </label>
                <select
                  id="severity"
                  name="severity"
                  className={`form__select ${validSeverityClass}`}
                  value={severity}
                  onChange={onSeverityChanged}
                >
                  {severityOptions}
                </select>
              </div>
              <div className="form__divider">
                <label className="form__label" htmlFor="nature">
                  Nature:
                </label>
                <select
                  id="nature"
                  name="nature"
                  className={`form__select ${validNatureClass}`}
                  value={nature}
                  onChange={onNatureChanged}
                >
                  {natureOptions}
                </select>
              </div>
            </div>

            <div className="form__row">
              <div className="form__divider">
                <label className="form__label" htmlFor="resolution">
                  Resolution Status:
                </label>
                <select
                  id="resolution"
                  name="resolution"
                  className={`form__select ${validResolutionClass}`}
                  value={resolution}
                  onChange={onResolutionChanged}
                >
                  {resolutionOptions}
                </select>
              </div>
              <div className="form__divider">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="ticket-username"
                >
                  Assign Bug to:
                </label>
                <select
                  id="ticket-username"
                  name="username"
                  className={`form__select ${validUserIdClass}`}
                  value={userId}
                  onChange={onUserIdChanged}
                >
                  {options}
                </select>
              </div>
              <div className="form__divider">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="ticket-status"
                >
                  Work Complete?:
                  <input
                    className="form__checkbox"
                    id="ticket-status"
                    name="status"
                    type="checkbox"
                    checked={status}
                    onChange={onStatusChanged}
                  />
                </label>
              </div>
            </div>
            <div className="form__row">
              <div className="form__divider">
                <p className="form__created">
                  Created:
                  <br />
                  {created}
                </p>
              </div>
              <div className="form__divider">
                <p className="form__updated">
                  Updated:
                  <br />
                  {updated}
                </p>
              </div>
              <div className="form__divider">
                <p className="form__updated">
                  Time Open:
                  <br />
                  {timeAgo}
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
