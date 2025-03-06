import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupID, setGrupId] = useState(null);

  // Data Print Functiom
  const fetchGroups = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:9977/groups");
      setGroups(res.data);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  // Update Group Function
  const hendelUpdate = (id) => {
    setGrupId(id._id);
    setGroupName(id.name);
  };

  // Delete Group Function

  const hendelDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:9977/groups/${id}`);
      fetchGroups();
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  // Call to fetchGroup Finction
  useEffect(() => {
    fetchGroups();
  }, []);

  // Data save and Update Function
  const handleSave = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      console.log(groups);
      return;
    }

    try {
      if (!groupID) {
        // Create A New Group
        await axios.post("http://127.0.0.1:9977/groups", { name: groupName });
        setGroupName("");
        fetchGroups();
      } else {
        try {
          // Group Update
          await axios.put(`http://127.0.0.1:9977/groups/${groupID}`, {
            name: groupName,
          });
          setGroupName("");
          setGrupId(null);
          fetchGroups();
        } catch (error) {
          console.error("Error fetching groups", error);
        }
      }
    } catch (error) {
      console.error("Error creating group", error);
    }
  };
  console.log(groups);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create Group</h1>
      {/* Group Nmae */}
      <input
        type="text"
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="p-2 border rounded-lg w-80 mb-4"
      />
      {/* Create and Update button */}
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        {groupID ? "Update" : "Save"}
      </button>

      <div className="flex  flex-col gap-2">
        {groups.map((item) => (
          <div
            key={item._id}
            className="flex gap-40 justify-between items-center p-2 border-b"
          >
            <p>{item.name}</p>
            <div className="flex gap-3">
              <button
                className="text-yellow-500 hover:text-yellow-700"
                onClick={() => hendelUpdate(item)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={async () => await hendelDelete(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
