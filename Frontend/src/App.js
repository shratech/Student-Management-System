import "./App.css";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { Route, Routes, useNavigate } from "react-router-dom";
import RegisterUser from "./components/register";
import { CircularProgress } from "@mui/material";
import { Component } from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomeWithRouter />}></Route>
        <Route exact path="/register" element={<RegisterUser />}></Route>
      </Routes>
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, users: [] };
    this.state = { users: [] };
  }

  componentDidMount() {
    console.log("hello word");
    var config = {
      method: "get",
      url: "http://192.168.0.100:8000/userregister/alluser",
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    };
    axios(config)
      .then((response) => {
        this.setState({ isLoading: false, users: response.data.users });
        //console.log(JSON.stringify(response.data.users));
      })
      .catch(function (error) {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }

  handleDeleteUser(_id) {
    var data = JSON.stringify({
      _id: _id,
    });

    var config = {
      method: "delete",
      url: "http://192.168.0.100:8000/userregister/deleteuser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const paperstyle = {
      width: "100%",
      padding: "40px",
      height: "100vh",
    };

    const totalUsers = this.state.users.length;
    const listItems = this.state.users.map((user, index) => (
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{user.firstname}</TableCell>
        <TableCell>{user.lastname}</TableCell>
        <TableCell>{user.location}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          {user.date}-{user.month}-{user.year}
        </TableCell>
        <TableCell>{user.education}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              this.props.navigate("/register", {
                state: {
                  user,
                },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              confirmAlert({
                title: "Confirm to submit",
                message: "Arr you sure you want to delete?",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      this.handleDeleteUser(user._id);
                    },
                  },
                  {
                    label: "No",
                    onClick: () => {},
                  },
                ],
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
    return (
      <div className="Home">
        <Paper style={paperstyle}>
          {this.state.isLoading && <CircularProgress />}
          <Box sx={{ m: 5 }}>
            <Typography variant="h5" textAlign="left">
              Student Mangement System
            </Typography>
          </Box>
          <Box sx={{ m: 5 }}>
            <Stack
              justifyContent="space-between"
              direction="row"
              style={{ paddingRight: "70px", marginTop: "70px" }}
            >
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "50ch" },
                }}
                style={{ backgroundColor: "whitesmoke" }}
              >
                <TextField
                  variant="outlined"
                  actions
                  placeholder="search"
                ></TextField>
              </Box>
              <Chip
                clickable
                label="add"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  width: "9%",
                  fontSize: "1.3rem",
                  padding: "20px",
                  borderRadius: "20px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
                onClick={() => {
                  this.props.navigate("/register");
                }}
              ></Chip>
            </Stack>
          </Box>

          <Paper
            style={{
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            {totalUsers > 0 ? (
              <TableContainer component={Paper}>
                <Table
                  size="medium"
                  aria-label="a dense table"
                  style={{
                    padding: "50px",
                    style: {
                      border: `4px dashed`,
                    },
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>FirstName</TableCell>
                      <TableCell>LastName</TableCell>
                      <TableCell>Loaction</TableCell>
                      <TableCell>email</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>Education</TableCell>
                      <TableCell>Actions</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>{listItems}</TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div
                style={{
                  justifyContent: "center",

                  padding: "250px 500px 250px 500px",
                }}
                variant="h4"
              >
                No Records Found
              </div>
            )}
          </Paper>
        </Paper>
      </div>
    );
  }
}

export function HomeWithRouter() {
  const navigate = useNavigate();
  return <Home navigate={navigate}></Home>;
}

export default App;
