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

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";

function DailyDive() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Adventurebar/>
      <Container>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{ marginTop: 30, backgroundColor: "#adc2f0"}}>
              <Typography component="span">4way FS - Open/Advanced</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DiveCard />
          </AccordionDetails>
        </Accordion>
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
