import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField, Typography, Box, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";

function RegisterUser() {
  const loc = useLocation();

  const page = {
    width: "1300px",
    height: "1000px",
    margin: "0px auto",
    padding: "50px 100px 50px 100px",
  };

  console.log("Locations ========>", loc.state);

  const [firstname, setfirstname] = useState(loc.state?.user?.firstname ?? "");
  const [lastname, setlastname] = useState(loc.state?.user?.lastname ?? "");
  const [location, setlocation] = useState(loc.state?.user?.location ?? "");
  const [email, setemail] = useState(loc.state?.user?.email ?? "");
  const [date, setdate] = useState(loc.state?.user?.date ?? "");
  const [month, setmonth] = useState(loc.state?.user?.month ?? "");
  const [year, setyear] = useState(loc.state?.user?.year ?? "");
  const [education, seteducation] = useState(loc.state?.user?.education ?? "");
  const navigate = useNavigate();

  return (
    <div className="RegisterUser">
      <Grid style={{ backgroundColor: "black" }}>
        <Paper style={page}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "50ch" },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: "32px" }}
            >
              <Typography variant="h5">First Name :</Typography>
              <TextField
                required
                id="outlined-required"
                value={firstname}
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
              />

              <Typography variant="h5">Last Name :</Typography>
              <TextField
                required
                id="outlined-required"
                value={lastname}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
              />
            </Stack>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "50ch" },
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Typography variant="h5">Location :</Typography>
              <TextField
                required
                id="outlined-required"
                value={location}
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                style={{ paddingLeft: "41px" }}
              />
            </Stack>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "50ch" },
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="h5">Email :</Typography>
              <TextField
                required
                id="outlined-required"
                style={{ paddingLeft: "72px" }}
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Stack>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "10ch" },
            }}
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="h5">DOB :</Typography>
              <TextField
                required
                id="outlined-required"
                style={{ paddingLeft: "79px" }}
                placeholder="DD"
                value={date}
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-required"
                value={month}
                placeholder="MM"
                onChange={(e) => {
                  setmonth(e.target.value);
                }}
              />
              <TextField
                required
                id="outlined-required"
                value={year}
                placeholder="YY"
                onChange={(e) => {
                  setyear(e.target.value);
                }}
              />
            </Stack>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "50ch" },
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="h5">Education :</Typography>
              <TextField
                required
                id="outlined-required"
                style={{ paddingLeft: "20px" }}
                value={education}
                onChange={(e) => {
                  seteducation(e.target.value);
                }}
              />
            </Stack>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 3,
                width: "50ch",
              },
            }}
          >
            <Stack direction="row" justifyContent="flex-start">
              <Typography variant="h5" style={{ marginTop: "20px" }}>
                About :
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={9}
                style={{ paddingLeft: "70px" }}
              />
            </Stack>
          </Box>

          <Chip
            style={{
              width: "13%",
              height: "5%",
              marginRight: "771px",
              fontSize: "1.3rem",
              borderRadius: "30px",
              color: "white",
              backgroundColor: "black",
            }}
            sx={{ m: 1 }}
            label="Submit"
            alignItems="left"
            clickable
            onClick={async () => {
              if (loc.state?.user?._id != null) {
                var data = JSON.stringify({
                  _id: loc.state.user._id,
                  firstname: firstname,
                  lastname: lastname,
                  location: location,
                  email: email,
                  date: date,
                  month: month,
                  year: year,
                  education: education,
                });

                var config = {
                  method: "put",
                  url: "http://192.168.0.100:8000/userregister/updateuser",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                await axios(config)
                  .then(function (response) {
                    console.log(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else {
                await axios
                  .post("http://localhost:8000/userregister/oneuser", {
                    firstname: firstname,
                    lastname: lastname,
                    location: location,
                    email: email,
                    date: date,
                    month: month,
                    year: year,
                    education: education,
                  })

                  .then((res) => {
                    console.log("my response", res);
                  })
                  .catch((err) => {
                    console.log("something went wrong...!", err);
                  });
              }
              navigate("/");
            }}
          >
            Submit
          </Chip>
        </Paper>
      </Grid>
    </div>
  );
}

export default RegisterUser;
