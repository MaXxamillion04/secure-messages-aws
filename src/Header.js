import React, { Component } from 'react';
import './App.css';
import { AmplifySignOut } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import Grid from '@material-ui/core/Grid'


export default function Header(props) {

return (<div className="HeaderSection">
<Grid item xs={8}>
    props.userName
</Grid>
<Grid item xs={4}>
    <AmplifySignOut />
</Grid>
</div>
);

}