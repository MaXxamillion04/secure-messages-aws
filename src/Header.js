import React, { Component, useEffect } from "react";
import "./App.css";
//import { AmplifySignOut } from 'aws-amplify-react'
import Amplify, { Auth } from "aws-amplify";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useState } from "react";

export default function Header(props) {
  const [userName,setUserName] = useState("Not Signed In?");
  
  useEffect(()=>{
    Auth.currentUserInfo().then((user) =>{
        //console.log("Captured User Info: "+user)
        setUserName(user.username);
      });
  },[Auth]);
  
  

  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="HeaderSection">
      <Grid container direction="row" spacing={1}>
        <Grid item xs={8}>
          <span className="UserName">{userName}</span>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            className="SignOutButton"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
