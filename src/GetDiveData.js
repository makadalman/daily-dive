import { useEffect, useState } from "react";

import { collection, query, where, getDocs, Timestamp, addDoc } from "firebase/firestore";
import {db} from './firebaseconfig';

export default function GetDive() {
  const [todayData, setTodayData] = useState(null);
  const [todayLoading, setTodayLoading] = useState(true);

  const [hatData, setHatData] = useState(null);
  const [hatLoading, setHatLoading] = useState(true);

  let dive = []
  let newHat = []

  GetTodaysDive({setTodayData, setTodayLoading})

  // if there's already a dive for today, don't generate a new one
  if (!todayLoading && todayData.length > 0) {
    dive = todayData
  }

  GetHat({setHatData, setHatLoading})

  if (!hatLoading && todayData.length === 0) {
    [dive, newHat] = generateDive(hatData)

    // put today's dive in the database
    SaveDive(dive)
    
    // update the new hat in the database
    UpdateHat()
  }
  

  return dive
}

function GetTodaysDive({setTodayData, setTodayLoading}) {
  useEffect(() => {
    fetchTodaysDive(setTodayData, setTodayLoading)
  }, []);
}

const fetchTodaysDive = async(setTodayData, setTodayLoading) => {
  setTodayLoading(true)
  const day = new Date()
  day.setHours(0,0,0,0)
  const start = Timestamp.fromDate(day);
  day.setHours(23,59,59,0)
  const end = Timestamp.fromDate(day);

  let todaysDive = []

  try {
    const q = query(collection(db, "divepool/4way/generatedDives"), where("division", "==", "open"),
        where("date", ">=", start),
        where("date", "<=", end));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      todaysDive = doc.data().dive
    });
    setTodayData(todaysDive)
  } finally {
    setTodayLoading(false)
  }
}

function GetHat({setHatData, setHatLoading}) {
  useEffect(() => {
    fetchHat(setHatData, setHatLoading)
  }, []);
}

const fetchHat = async (setHatData, setHatLoading) => {
  setHatLoading(true)
  let hat = []

  try {
    const q = query(collection(db, "divepool/4way/formations"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      hat.push(doc.data())
    });
    setHatData(hat);
  } finally {
    setHatLoading(false)
  }
}

function generateDive(data) {
  const pointsPerRound = 5

  let points = 0
  let hat = data.find(e => e.name === "open").hat
  const blocks = data.find(e => e.name === "open").blockPool

  const randomhat = [...hat];
  for (let i = randomhat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [randomhat[i], randomhat[j]] = [randomhat[j], randomhat[i]];
  }

  let jump = [];
  while (points < pointsPerRound) {
    var page = randomhat.pop();
    jump.push(page);
    points += (blocks.includes(page)) ? 2 : 1;
  }

  return [jump, randomhat]
}

function SaveDive(dive) {

  const day = Timestamp.fromDate(new Date())

  try {
    const docRef = addDoc(collection(db, "divepool/4way/generatedDives"), {
      division: "open",
      dive: dive,
      date: day
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

function UpdateHat() {

}

// const updateHat = async () => {
//   const pool = "4way"
//   const dbcollection = "divepool"

//   const q = query(collection(db, dbcollection), where("name", "==", pool));

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     const hat = doc.data().hat
//     console.log(hat)
//   });
// }
