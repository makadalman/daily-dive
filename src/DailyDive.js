import React, { useEffect, useState } from "react";
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

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import {db} from './firebaseconfig';

function DailyDive() {
  const thing = fetchData();
  // return (
  //   <>
  //   <ThemeProvider theme={theme}>
  //     <Adventurebar/>
  //     <Container>
  //       <DiveCard />
  //     </Container>
  //   </ThemeProvider>
  // </>
  // );
}

const fetchData = async () => {
  const pool = "4way";
  const dbcollection = "divepool/" + pool + "/formations"
  const q = query(collection(db, dbcollection));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
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
