import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddModal from "../components/AddModal";
import Ui from "../assets/bg.jpg.webp";
import { Modal } from "react-bootstrap";

const EmployeeTable = () => {
  const [showing, setShowing] = useState(false);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(false);
  const handleClosing = () => setShowing(false);
  const handleShowing = () => setShowing(true);
  const handleCloseUpdate = () => setUpdate(false);

  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
    id: "",
  });
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/modal")
      .then((res) => {
       return res.json();
      })
      .then((resp) => {
       setData(resp);
       })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  const handleUpdateOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  const handleShowUpdate = (id) => {
    data.forEach((val) => {
      if (val.id === id) {
        setUpdatedData(val);
      }
    });
    setUpdate(true);
  };
  const handleUpdate = async () => {
    await fetch(`http://localhost:8000/modal/${updatedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then(async (res) => {
      await fetch("http://localhost:8000/modal")
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          setData(resp);
          setUpdate(false);    
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };
  const handleDeleteClick = (employeeId) => {
    setDeleteEmployeeId(employeeId);
    handleShowing();
  };

  const handleConfirmDelete = () => {
    deleteEmployee(deleteEmployeeId);
    handleClosing();
  };
  const deleteEmployee = (employeeId) => {
    fetch(`http://localhost:8000/modal/${employeeId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        fetch("http://localhost:8000/modal")
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          setData(resp);
          setUpdate(false);
        })
        console.log("Data deleted successfully:", data);

      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };
  return (
    <>
    <div>
      <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Ui})`, height:"100vh"}} className="card img-fluid">
        <div className="card-title mt-5"></div>
      <h2 className="text-light m-4">Employee Listing</h2>
        <div className="d-flex justify-content-between ps-2">
          <div> <Link to='/' className="btn btn-danger">
        Back
      </Link></div>
          <div><AddModal setData={setData} /></div>
            
           
        </div>
        
        <div className="card-body">
          <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="text-light">Id</th>
              <th className="text-light">Name</th>
              <th className="text-light">Email</th>
              <th className="text-light">Phone Number</th>
              <th className="text-light">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, i) => (
                <tr className="text-light" key={i}>
                  <td className="text-light">{i + 1}</td>
                <td className="text-light">{item.name}</td>
                <td className="text-light">{item.email}</td>
                <td className="text-light">{item.phone}</td>
                <td >
                <button
                        onClick={() => handleShowUpdate(item.id)}
                        className="btn btn-warning me-md-3"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="btn btn-danger me-md-3"
                      >
                        Delete
                </button>
                </td>
              </tr>))}
          </tbody>
          </table>
          <Modal show={showing} onHide={handleClosing}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this employee?
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClosing}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Delete
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={update} onHide={handleCloseUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Update Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-row m-3">
                <div className="form-group ">
                  <label htmlFor="naming" className="m-1">
                    Name:{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleUpdateOnChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="inputs" className="p-1">
                    Email:{" "}
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={updatedData.email}
                    onChange={handleUpdateOnChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="phone" className="p-1">
                    Phone:
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={updatedData.phone}
                    onChange={handleUpdateOnChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary text-center"
                onClick={handleUpdate}
              >
                Update
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
    </>
  );
};

export default EmployeeTable;
