import "./App.css";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignout(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "426471191334-634bndbk8912ktqhopf6hqropojgsoc2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  // If we have no user, then show Login Button
  // If we have a user, then show Logout Button
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box id="signInDiv" />
      {Object.keys(user).length !== 0 && user.length !== 0 && (
        <>
          <Button variant="contained" onClick={(event) => handleSignout(event)}>
            Sign Out
          </Button>
          <Box
            component={"img"}
            sx={{
              height: 80,
              width: 80,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            src={user.picture}
          />
        </>
        // <div>
        //   <img src={user.picture}></img>
        //   <h3>{user.name}</h3>
        // </div>
      )}
      {/* {user.length !== 0 && (
         <Box
           component={"img"}
           sx={{
             height: 500,
             width: 600,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
           }}
           src={user.picture}
         />
          // <div>
          //   <img src={user.picture}></img>
          //   <h3>{user.name}</h3>
          // </div>
       )} */}
    </Box>
  );
}

export default App;

/*
const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);
  <LoginOAuth2
  clientId="426471191334-634bndbk8912ktqhopf6hqropojgsoc2.apps.googleusercontent.com"
  authorizeUri="http://localhost:3000"
  onSuccess={onSuccess}
  onFailure={onFailure}
/>
*/
