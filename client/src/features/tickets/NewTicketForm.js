import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewTicketMutation } from "./ticketsApiSlice";
import useAuth from "../../hooks/useAuth";
import { PRIORITIES } from "../../config/priority";
import { SEVERITIES } from "../../config/severity";
import { NATURES } from "../../config/nature";
import { RESOLUTIONS } from "../../config/resolutions";
import { APPLICATIONS } from "../../config/applications";

const NewTicketForm = ({ users }) => {
  const [addNewTicket, { isLoading, isSuccess, isError, error }] =
    useAddNewTicketMutation();
  const navigate = useNavigate();

  const { username, isAdmin, isManager } = useAuth();

  const [name, setName] = useState("");
  const [application, setApplication] = useState("");
  const [details, setDetails] = useState("");
  const [steps, setSteps] = useState("");
  const [version, setVersion] = useState("");
  const [priority, setPriority] = useState(5);
  const [severity, setSeverity] = useState(7);
  const [nature, setNature] = useState("");
  const [author] = useState(username);
  const [resolution, setResolution] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setApplication("");
      setDetails("");
      setSteps("");
      setVersion("");
      setPriority(5);
      setSeverity(7);
      setNature("");
      setUserId("");
      navigate("/dash/tickets");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onApplicationChanged = (e) => setApplication(e.target.value);
  const onDetailsChanged = (e) => setDetails(e.target.value);
  const onStepsChanged = (e) => setSteps(e.target.value);
  const onVersionChanged = (e) => setVersion(e.target.value);
  const onPriorityChanged = (e) => setPriority(parseInt(e.target.value));
  const onSeverityChanged = (e) => setSeverity(parseInt(e.target.value));
  const onNatureChanged = (e) => setNature(e.target.value);
  const onResolutionChanged = (e) => setResolution(e.target.value);
  const onUserIdChanged = (e) => setUserId(parseInt(e.target.value));

  const canSave =
    [name, application, details, author].every(Boolean) && !isLoading;

  const onSaveTicketClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewTicket({
        name,
        application,
        details,
        author,
        steps,
        version,
        priority,
        severity,
        nature,
        resolution,
        userId,
      });
    }
  };

  // if (isSuccess) console.log(data);

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

  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validApplicationClass = !application ? "form__input--incomplete" : "";
  const validDetailsClass = !details ? "form__input--incomplete" : "";
  const validStepsClass = !steps ? "form__input--incomplete" : "";
  const validVersionClass = !version ? "form__input--incomplete" : "";

  const content = (
    <section>
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

        <label className="form__label" htmlFor="app">
          App Name:
        </label>
        <select
          id="app"
          name="app"
          className={`form__select ${validApplicationClass}`}
          value={application}
          onChange={onApplicationChanged}
        >
          {appOptions}
        </select>

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
          Created by:
        </label>
        <input
          className="form__input author"
          id="author"
          name="author"
          type="text"
          autoComplete="off"
          value={username}
          readOnly
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
                  className="form__select"
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
                  className="form__select"
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
                  className="form__select"
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
                  className="form__select"
                  value={resolution}
                  onChange={onResolutionChanged}
                >
                  {resolutionOptions}
                </select>
              </div>
              <div className="form__divider">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="assigneduser"
                >
                  Assign Bug to:
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
              </div>
            </div>
          </>
        )}
      </form>
    </section>
  );

  return content;
};

export default NewTicketForm;
