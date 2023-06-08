import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setSurname("");
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onSurnameChanged = (e) => setSurname(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onRoleChanged = (e) => setRole(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({
        id: user.id,
        name,
        surname,
        username,
        password,
        email,
        role,
        active,
      });
    } else {
      await updateUser({
        id: user.id,
        name,
        surname,
        username,
        email,
        role,
        active,
      });
    }
  };

  const onDeleteUserClicked = async () => {
    if (user.role !== "Admin") {
      await deleteUser({ id: user.id });
    } else {
      console.log(
        "For practical purposes, Admin users cannot be deleted from the db at this time"
      );
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [role, validUsername, validPassword, validEmail].every(Boolean) &&
      !isLoading;
  } else {
    canSave = [role, validUsername, validEmail].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validRoleClass = !role ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <section>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="name">
          Name: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className="form__input"
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />

        <label className="form__label" htmlFor="surname">
          Last Name: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className="form__input"
          id="surname"
          name="surname"
          type="text"
          autoComplete="off"
          value={surname}
          onChange={onSurnameChanged}
        />

        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className={`form__input ${validEmailClass}`}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label className="form__label" htmlFor="role">
          ASSIGN A ROLE:
        </label>
        <select
          id="role"
          name="role"
          className={`form__select ${validRoleClass}`}
          multiple={false}
          size="1"
          value={role}
          onChange={onRoleChanged}
        >
          {options}
        </select>
      </form>
    </section>
  );

  return content;
};
export default EditUserForm;
