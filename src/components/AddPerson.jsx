import React, { useState, useEffect } from "react";

const AddPerson = () => {
  const [activeScreen, setActiveScreen] = useState("addPerson");
  const [showForm, setShowForm] = useState(false);
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPerson, setNewPerson] = useState({
    name: "",
    dob: "",
    aadhar: "",
    mobile: "",
    age: "",
  });

  useEffect(() => {
    console.log("Current people state:", people);
  }, [people]);

  const handleScreenSwitch = (screen) => {
    setActiveScreen(screen);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'aadhar') {
      updatedValue = value.replace(/\D/g, '').slice(0, 12);
    } else if (name === 'mobile') {
      updatedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'age') {
      updatedValue = value.replace(/\D/g, '');
    }

    setNewPerson(prevPerson => ({
      ...prevPerson,
      [name]: updatedValue,
    }));
  };

  const handleAddPerson = () => {
    console.log("Attempting to add person:", newPerson);
    if (
      newPerson.name &&
      newPerson.dob &&
      newPerson.aadhar.length === 12 &&
      newPerson.mobile.length === 10 &&
      newPerson.age
    ) {
      setPeople(prevPeople => {
        const updatedPeople = [...prevPeople, { ...newPerson }];
        console.log("Updated people array:", updatedPeople);
        return updatedPeople;
      });
      setNewPerson({ name: "", dob: "", aadhar: "", mobile: "", age: "" });
      setShowForm(false);
    } else {
      alert("Please fill all fields correctly. Aadhar should be 12 digits and mobile should be 10 digits.");
    }
  };

  const handleDeletePerson = (index) => {
    setPeople(prevPeople => prevPeople.filter((_, i) => i !== index));
  };

  const filteredPeople = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.mobile.includes(searchTerm)
  );

  return (
    <div>
      <h1>Directory App</h1>

      <div>
        <button onClick={() => handleScreenSwitch("addPerson")}>Add New Person</button>
        <button onClick={() => handleScreenSwitch("retrieve")}>Retrieve Information</button>
      </div>

      {activeScreen === "addPerson" && (
        <div>
          <h2>Add New Person</h2>
          {people.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Aadhar Number</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person, index) => (
                  <tr key={index}>
                    <td>{person.name}</td>
                    <td>{person.dob}</td>
                    <td>{person.aadhar}</td>
                    <td>{person.mobile}</td>
                    <td>{person.age}</td>
                    <td>
                      <button onClick={() => handleDeletePerson(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data</p>
          )}

          <button onClick={() => setShowForm(true)} style={{ position: "fixed", bottom: 10, right: 10 }}>
            Add
          </button>

          {showForm && (
            <div className="add-person-form">
              <h3>Fill below form for New Entry</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newPerson.name}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={newPerson.dob}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="aadhar"
                placeholder="Aadhar number (12 digits)"
                value={newPerson.aadhar}
                onChange={handleInputChange}
                min="100000000000"
                max="999999999999"
              />
              <input
                type="number"
                name="mobile"
                placeholder="Mobile number (10 digits)"
                value={newPerson.mobile}
                onChange={handleInputChange}
                min="1000000000"
                max="9999999999"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPerson.age}
                onChange={handleInputChange}
                min="0"
              />
              <button onClick={handleAddPerson}>Save</button>
            </div>
          )}
        </div>
      )}

      {activeScreen === "retrieve" && (
        <div>
          <h2>Retrieve Information</h2>
          <input
            type="text"
            placeholder="Search by Name or Mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredPeople.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Aadhar Number</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {filteredPeople.map((person, index) => (
                  <tr key={index}>
                    <td>{person.name}</td>
                    <td>{person.dob}</td>
                    <td>{person.aadhar}</td>
                    <td>{person.mobile}</td>
                    <td>{person.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddPerson;