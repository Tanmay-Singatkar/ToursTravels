import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function SellerPanel() {
  const [activeSection, setActiveSection] = useState("overview");
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalbookings, setTotalbookings] = useState(0);

  const navigate = useNavigate();
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/tours/tours"
        );
        setTours(response.data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.info("You Have Successfully Logged Out!");
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (image) => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "toursimages");
      data.append("cloud_name", "dvbnq1kiw");

      setImageUploading(true);

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvbnq1kiw/image/upload",
          data
        );
        setFormData((prevData) => ({
          ...prevData,
          photo: response.data.url.toString(),
        }));
        setImageUploading(false);
        alert("Image uploaded successfully!");
      } catch (err) {
        console.error(err);
        setImageUploading(false);
        alert("Image upload failed. Please try again.");
      }
    } else {
      alert("Please upload a JPEG or PNG image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/tours/addtour",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage("Tour created successfully!");
        setTours([...tours, response.data.tour]);
        setFormData({
          title: "",
          city: "",
          address: "",
          distance: "",
          photo: "",
          desc: "",
          price: "",
          maxGroupSize: "",
        });
        setShowModal(false); // Close modal on success
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage("Failed to create the tour. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/tours/tours"
        );
        setTours(response.data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/users/", {
          withCredentials: true,
        });
        setTotalUsers(res.data.totalUsers);
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/booking/", {
          withCredentials: true,
        });
        console.log(res.data);

        setTotalbookings(res.data.total);
        setBookings(res.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchTours();
    fetchUsers();
    fetchBookings();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      if (res) {
        alert("User Deleted Successfully");
      }
    } catch (error) {
      alert(error.message);
      console.log("error While deleting user:", error);
    }
  };

  const revenueData = [
    { month: "January", revenue: 5000 },
    { month: "February", revenue: 7000 },
    { month: "March", revenue: 4000 },
    { month: "April", revenue: 6000 },
    { month: "May", revenue: 9000 },
    { month: "June", revenue: 12000 },
  ];

  const tourNames = [...new Set(bookings.map((booking) => booking.tourName))];
  const bookingCounts = tourNames.map((tourName) => ({
    tourName,
    count: bookings.filter((booking) => booking.tourName === tourName).length,
  }));

  const guestSizeTrend = bookings.map((booking) => ({
    date: new Date(booking.bookAt).toLocaleDateString(),
    guestSize: booking.guestSize,
  }));

  const guestSizeLabels = [...new Set(guestSizeTrend.map((data) => data.date))];
  const guestSizeValues = guestSizeLabels.map((date) =>
    guestSizeTrend
      .filter((data) => data.date === date)
      .reduce((acc, curr) => acc + curr.guestSize, 0)
  );

  const guestSizeData = guestSizeLabels.map((date, index) => ({
    date,
    guestSize: guestSizeValues[index],
  }));

  return (
    <div className="container-fluid vh-100">
      <div className="row vh-100">
        {/* Sidebar */}
        <div className="col-md-2 bg-light d-flex flex-column p-4">
          <h2 className="fw-bold mb-4">TravelWorld</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeSection === "overview" ? "active" : ""
                }`}
                to="#"
                onClick={() => handleSectionChange("overview")}
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeSection === "tours" ? "active" : ""
                }`}
                to="#"
                onClick={() => handleSectionChange("tours")}
              >
                Tours
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeSection === "users" ? "active" : ""
                }`}
                to="#"
                onClick={() => handleSectionChange("users")}
              >
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeSection === "bookings" ? "active" : ""
                }`}
                to="#"
                onClick={() => handleSectionChange("bookings")}
              >
                Bookings
              </Link>
            </li>
          </ul>
          <div className="mt-auto">
            <button
              className="btn btn-danger w-100"
              id="custom-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          {activeSection === "overview" && (
            <div
              className="text-center"
              style={{ height: "100vh", overflow: "hidden" }}
            >
              <h1 className="mb-4">Overview</h1>

              <div
                className="row h-75 mb-4"
                style={{ display: "flex", alignItems: "stretch" }} // Ensure cards and charts stretch to fill the row
              >
                {/* Cards Column */}
                <div className="col-md-4 d-flex flex-column justify-content-between">
                  <div
                    className="card text-white bg-primary shadow mb-3"
                    style={{ height: "30%" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Total Users</h5>
                      <p className="card-text display-4">{totalUsers}</p>
                    </div>
                  </div>
                  <div
                    className="card text-white bg-success shadow mb-3"
                    style={{ height: "30%" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Total Tours Booked</h5>
                      <p className="card-text display-4">{totalbookings}</p>
                    </div>
                  </div>
                  <div
                    className="card text-white bg-info shadow mb-3"
                    style={{ height: "30%" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Total Revenue</h5>
                      <p className="card-text display-4">
                      ₹
                        {revenueData.reduce((acc, cur) => acc + cur.revenue, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chart Column */}
                <div className="col-md-8 d-flex flex-column">
                  <div
                    className="chart-container"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                    <span className=" ms-6 mb-2">Total Bookings per Tour</span>
                      <BarChart width={600} height={250} data={bookingCounts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tourName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </div>

                    <div style={{ flex: 1 }}>
                    <span className=" ms-6 mb-2 center">Guest Size Over Time</span>
                      <LineChart width={600} height={250} data={guestSizeData} className="border p-4">
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="guestSize"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </LineChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "tours" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Tours</h1>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  Add Tour
                </button>
              </div>
              <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{
                  backgroundColor: showModal ? "rgba(0, 0, 0, 0.5)" : "",
                }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add New Tour</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {message && <p className="text-success">{message}</p>}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label>Title</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Distance (km)</label>
                          <input
                            type="number"
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Price</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Max Group Size</label>
                          <input
                            type="number"
                            name="maxGroupSize"
                            value={formData.maxGroupSize}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Photo</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                              handleImageChange(e.target.files[0])
                            }
                            accept="image/*"
                          />
                          {imageUploading && <p>Uploading image...</p>}
                        </div>
                        <div className="form-group mb-3">
                          <label>Description</label>
                          <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            className="form-control"
                            rows="3"
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Create Tour
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row"
                style={{ maxHeight: "550px", overflowY: "auto" }}
              >
                {tours && tours.length > 0 ? (
                  tours.map(
                    (tour) =>
                      tour ? ( // Check if 'tour' is valid
                        <div key={tour._id} className="col-md-4 mb-3">
                          <div className="card h-100">
                            <img
                              src={
                                tour.photo || "path/to/placeholder-image.jpg"
                              } // Provide a fallback if 'tour.photo' is undefined
                              className="card-img-top"
                              alt={tour.title || "No title"} // Fallback for title
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{tour.title}</h5>
                              <p className="card-text">{tour.desc}</p>
                              <p className="card-text">
                                <strong>Price:</strong> ₹{tour.price}
                              </p>
                              <div className="d-flex justify-content-between">
                                <Link
                                  to={`/tours/${tour._id}`}
                                  className="btn btn-primary"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null // Skip rendering if 'tour' is undefined
                  )
                ) : (
                  <p>No tours available.</p> // Display message if tours array is empty or undefined
                )}
              </div>
            </div>
          )}

          {activeSection === "users" && (
            <div className="text-center">
              <h1 className="mb-4">Users</h1>
              <div className="container">
                <div
                  className="row"
                  style={{
                    maxHeight: "599px",
                    overflowY: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
                    >
                      <div className="card shadow-sm w-100">
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-primary">
                            {user.username}
                          </h5>
                          <p className="card-text">
                            <strong>Email:</strong> {user.email}
                          </p>
                          <p className="card-text">
                            <strong>Role:</strong> {user.role}
                          </p>
                          <div className="mt-auto">
                            <button
                              className="btn btn-danger w-100"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "bookings" && (
            <div className="container my-4">
              <h1 className="text-center mb-4">Manage Bookings</h1>
              <p className="text-center text-muted mb-4">
                Keep track of all your tour bookings with ease.
              </p>

              {bookings.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th>Booking ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Tour</th>
                        <th>Guest Size</th>
                        <th>Booking Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking._id}
                          style={{ maxHeight: "500px", overflowY: "auto" }}
                        >
                          <td>{booking._id}</td>
                          <td>{booking.fullName}</td>
                          <td>{booking.phone}</td>
                          <td>{booking.tourName}</td>
                          <td>{booking.guestSize}</td>
                          <td>
                            {new Date(booking.bookAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-warning text-center">
                  No bookings available.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
