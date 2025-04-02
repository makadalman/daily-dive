import React from "react";
import {
  AppBar,
  Container,
  ThemeProvider,
  Toolbar
} from '@mui/material';

import cat from './cat.png';
import './DailyDive.css';
import theme from './theme'
import DiveCard from './DiveCard.js'

import addData from './formations/UploadFormations.js'

function DailyDive() {
  // addData()
  return (
    <>
    <ThemeProvider theme={theme}>
      <Adventurebar/>
      <Container>
        <DiveCard />
      </Container>
    </ThemeProvider>
  </>
  );
}

function Adventurebar() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters theme={theme}>
            <img src={cat} className="small-cat" alt="cat" />
            <p>Daily Dive Flows</p>
          </Toolbar>
        </Container>
      </AppBar>
      
    </>
  );
}

export default DailyDive;
