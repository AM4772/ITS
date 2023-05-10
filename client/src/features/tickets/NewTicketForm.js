import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTicketMutation } from "./ticketsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { PRIORITIES } from "../../config/priority";
import { SEVERITIES } from "../../config/severity";
import { NATURES } from "../../config/nature";

const NewTicketForm = ({ users }) => {
  const [addNewTicket, { isLoading, isSuccess, isError, error }] =
    useAddNewTicketMutation();

  const navigate = useNavigate();

  const { username, isAdmin, isManager } = useAuth();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [steps, setSteps] = useState("");
  const [version, setVersion] = useState("");
  const [priority, setPriority] = useState("");
  const [severity, setSeverity] = useState("");
  const [nature, setNature] = useState("");
  const [author, setAuthor] = useState(username);
  const [status] = useState(false);
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setDetails("");
      setSteps("");
      setVersion("");
      setPriority("");
      setSeverity("");
      setNature("");
      setUserId("");
      navigate("/dash/tickets");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onDetailsChanged = (e) => setDetails(e.target.value);
  const onStepsChanged = (e) => setSteps(e.target.value);
  const onVersionChanged = (e) => setVersion(e.target.value);
  const onPriorityChanged = (e) => setPriority(e.target.value);
  const onSeverityChanged = (e) => setSeverity(e.target.value);
  const onNatureChanged = (e) => setNature(e.target.value);
  const onAuthorChanged = (e) => setAuthor(username);
  // const onStatusChanged = (e) => setStatus(true);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [name, details, userId, author].every(Boolean) && !isLoading;

  const onSaveTicketClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewTicket({
        userId: userId,
        name,
        details,
        author,
        steps,
        version,
        priority,
        severity,
        nature,
        status,
      });
    }
  };

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

  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validDetailsClass = !details ? "form__input--incomplete" : "";
  const validStepsClass = !steps ? "form__input--incomplete" : "";
  const validVersionClass = !version ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveTicketClicked}>
        <div className="form__title-row">
          <h2>New Bug</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="name">
          Name:
        </label>
        <input
          className={`form__input ${validNameClass}`}
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          required
          onChange={onNameChanged}
        />

        <label className="form__label" htmlFor="details">
          Details:
        </label>
        <textarea
          className={`form__input form__input--text ${validDetailsClass}`}
          id="details"
          name="details"
          value={details}
          required
          onChange={onDetailsChanged}
        />

        <label className="form__label" htmlFor="steps">
          Steps:
        </label>
        <textarea
          className={`form__input form__input--text ${validStepsClass}`}
          id="steps"
          name="steps"
          value={steps}
          required
          onChange={onStepsChanged}
        />

        <label className="form__label" htmlFor="version">
          Version:
        </label>
        <input
          className={`form__input ${validVersionClass}`}
          id="version"
          name="version"
          type="text"
          autoComplete="off"
          value={version}
          required
          onChange={onVersionChanged}
        />

        <label className="form__label" htmlFor="author">
          Author:
        </label>
        <input
          className="form__input"
          id="author"
          name="author"
          type="text"
          autoComplete="off"
          value={username}
          readOnly
          onChange={onAuthorChanged}
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

            <label
              className="form__label form__checkbox-container"
              htmlFor="assigneduser"
            >
              ASSIGNED TO:
            </label>
            <select
              id="assigneduser"
              name="assigneduser"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </>
        )}
      </form>
    </>
  );

  return content;
};

export default NewTicketForm;
