import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
// import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const filters = Object.entries(selectedFilters)
          .map(([key, value]) => (value ? `${key}=${value}` : ""))
          .filter(Boolean)
          .join("&");

        const response = await fetch(
          `http://localhost:5000/users?page=${currentPage}&searchName=${searchName}&${filters}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();
  }, [currentPage, searchName, selectedFilters]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const createTeam = async () => {
    try {
      if (!teamName) {
        console.error("Team name is required.");
        return;
      }

      if (selectedUsers.length === 0) {
        console.error("Select at least one user to create a team.");
        return;
      }

      const response = await fetch("http://localhost:5000/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName,
          users: selectedUsers,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSelectedUsers([]);
      setTeamName("");
      console.log("Team created successfully!");
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="lg:px-14">
      <h1 className="text-center font-bold text-4xl my-3">All Users</h1>

      <div className="md:flex justify-center mt-4 lg:px-0 px-3">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchChange}
          className="mr-2 px-3 py-2 w-full md:w-40 bg-gray-200 border-2 border-green-500 rounded-md"
        />
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="mr-2 px-3 py-2 md:w-40 w-full bg-gray-200 border-2 border-orange-500 rounded-md"
        />
        <button
          className="bg-sky-300 w-full md:w-32 py-2 px-3 rounded-md"
          onClick={createTeam}
        >
          Create Team
        </button>
      </div>


      <div className="flex justify-center mt-4">
      <select
        value={selectedFilters.domain}
        onChange={(e) => handleFilterChange("domain", e.target.value)}
        className="mr-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
      >
        <option value="">Domain</option>
        <option value="Developer">Developer</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Management">Management</option>
        <option value="UI Designing">UI Designing</option>
        <option value="Sales">Sales</option>
        <option value="Business Development"> Development</option>
        {/* Add more options as needed */}
      </select>
        <select
          value={selectedFilters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          {/* ... */}
        </select>

        <select
          value={selectedFilters.availability}
          onChange={(e) => handleFilterChange("availability", e.target.value)}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          <option value="">Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      {/* Add a team name input */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserDetails
            key={user.id}
            user={user}
            onSelect={() => handleUserSelection(user.id)}
            isSelected={selectedUsers.includes(user.id)}
          />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-orange-300 rounded-md"
        >
          Previous Page
        </button>
        <span className="px-4 py-2 ml-2 bg-gray-300 animated-spin rounded-md">
          Page : {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Users;
