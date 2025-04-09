import { useEffect, useState } from "react";

import { collection, query, where, getDocs, Timestamp, addDoc, setDoc, doc } from "firebase/firestore";
import {db} from './firebaseconfig';

export default function GetDive() {
  const [todayData, setTodayData] = useState(null);
  const [todayLoading, setTodayLoading] = useState(true);

  const [hatData, setHatData] = useState(null);
  const [hatLoading, setHatLoading] = useState(true);

  let dive = []

  GetTodaysDive({setTodayData, setTodayLoading, setHatData, setHatLoading})

  // if there's already a dive for today, don't generate a new one
  if (!todayLoading) {
    dive = todayData
  }
  
  return dive
}

function GetTodaysDive({setTodayData, setTodayLoading, setHatData, setHatLoading}) {
  useEffect(() => {
    const fetchTodaysDive = async(setTodayData, setTodayLoading, setHatData, setHatLoading) => {
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

        if (todaysDive.length === 0) {
          setHatLoading(true)
          let hat = []
        
          try {
            const q = query(collection(db, "divepool/4way/formations"), where("name", "==", "open"));
        
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              hat.push(doc.data())
              hat.push({id: doc.id})
            });
            setHatData(hat);
          } finally {
            setHatLoading(false)

            let [dive, newHat] = generateDive(hat)
            setTodayData(dive)
            // put today's dive in the database
            SaveDive(dive)
            
            // update the new hat in the database
            SaveNewHat(hat, newHat)
          }
        }
      }
    }

    fetchTodaysDive(setTodayData, setTodayLoading, setHatData, setHatLoading)
  }, [setTodayData, setTodayLoading, setHatData, setHatLoading]);
}

function generateDive(data) {
  const pointsPerRound = 5

  let points = 0
  let hat = data.find(e => e.name === "open").hat
  const randoms = data.find(e => e.name === "open").randomPool
  const blocks = data.find(e => e.name === "open").blockPool

  if (hat.length === 0) {
    hat = [...randoms, ...blocks];
  }

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
    addDoc(collection(db, "divepool/4way/generatedDives"), {
      division: "open",
      dive: dive,
      date: day
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

function SaveNewHat(hatData, newHat) {
  const docId = hatData.find(e => e.id).id
  const updatedHat = hatData.find(e => e.hat)
  updatedHat.hat = newHat
  
  try {
    const docRef = doc(db, "divepool/4way/formations", docId)
    setDoc(docRef, updatedHat);
  } catch (e) {
    console.error("Error adding/updating document: ", e);
  }
}
