import { useEffect, useState } from "react";

export const CheckUserForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState({ text: "", color: "black" });
  useEffect(() => {
    setDisabled(!username || !checked);
  }, [username, checked]);

  const handleInputChange = ({ target }) => {
    setUsername(target.value);
  };

  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/username", {
      method: "POST",
      body: username,
    })
      .then((resp) => resp.json())
      .then(({ available }) => {
        setResult({
          text: available ? "Available" : "Exists",
          color: available ? "green" : "red",
        });
      });

    setUsername("");
    setChecked(false);
    setDisabled(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleInputChange}
        />
        <input
          id="tyc-checkbox"
          aria-checked={checked}
          onChange={handleCheckbox}
          type="checkbox"
          checked={checked}
        />
        <label htmlFor="tyc-checkbox">Accept terms and conditions</label>
        <button type="submit" disabled={disabled}>
          Check
        </button>
      </form>
      <p style={{ color: result.color }}>{result.text}</p>
    </>
  );
};
