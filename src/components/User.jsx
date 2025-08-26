import React, { useState, useEffect } from "react";
import "./userApp.scss";
import { INPUT_FIELDS } from "../utils";

export default function UserApp() {
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || []
  );

  const [form, setForm] = useState({ fname: "", lname: "", age: "", job: "" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addUser = (e) => {
    e.preventDefault();
    setUsers([...users, { id: Date.now(), ...form }]);
    setForm({ fname: "", lname: "", age: "", job: "" });
  };

  return (
    <div className="user-app">
      <form className="user-form" onSubmit={addUser}>
        <h2>Add User</h2>
        {INPUT_FIELDS.map((field, inx) => (
          <input
            key={inx}
            name={field}
            type={field === "age" ? "number" : "text"}
            value={form[field]}
            onChange={handleChange}
            placeholder={
              field === "fname"
                ? "First Name"
                : field === "lname"
                ? "Last Name"
                : field === "age"
                ? "Age"
                : "Job"
            }
            required
          />
        ))}
        <button type="submit">Add</button>
      </form>

      <div className="user-cards">
        {users.map((u) => (
          <div key={u.id} className="user-card">
            <div className="avatar">{u.fname[0]}</div>
            <div className="info">
              <h3>
                {u.fname} {u.lname}
              </h3>
              <p>{u.job}</p>
              <button onClick={() => setSelected(u)}>See more</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>User Info</h2>
            {Object.entries(selected).map(([key, value]) => (
              <p key={key}>
                <b>{key}:</b> {value}
              </p>
            ))}
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
