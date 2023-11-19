/* eslint-disable no-unused-vars */
// src/App.js
import  { useState } from "react";
import TeamDetails from "./TeamDetails";


const AllTeams = () => {
  const [teamName, setTeamName] = useState("Awesome Team");
  const [selectedUsers, setSelectedUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Jane Doe", email: "jane@example.com" },
    { id: 4, name: "Jane Doe", email: "jane@example.com" },
    { id: 5, name: "Jane Doe", email: "jane@example.com" },
    // Add more selected users as needed
  ]);

  return (
    <div className="">
      <TeamDetails teamName={teamName} selectedUsers={selectedUsers} />
    </div>
  );
};

export default AllTeams;
