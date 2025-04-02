// import { getFirestore, collection, query, where, addDoc } from "firebase/firestore";
// import {db} from '../firebaseconfig';

// const formations = [
//     {
//         "code": "A",
//         "name": "Unipod",
//         "type": "Random"
//     },
//     {
//         "code": "B",
//         "name": "Stairstep Diamond",
//         "type": "Random"
//     },
//     {
//         "code": "C",
//         "name": "Murphy Flake",
//         "type": "Random"
//     },
//     {
//         "code": "D",
//         "name": "Yuan",
//         "type": "Random"
//     },
//     {
//         "code": "E",
//         "name": "Meeker",
//         "type": "Random"
//     },
//     {
//         "code": "F",
//         "name": "Open Accordian",
//         "type": "Random"
//     },
//     {
//         "code": "G",
//         "name": "Cataccord",
//         "type": "Random"
//     },
//     {
//         "code": "H",
//         "name": "Bow",
//         "type": "Random"
//     },
//     {
//         "code": "J",
//         "name": "Donut",
//         "type": "Random"
//     },
//     {
//         "code": "K",
//         "name": "Hook",
//         "type": "Random"
//     },
//     {
//         "code": "L",
//         "name": "Adder",
//         "type": "Random"
//     },
//     {
//         "code": "M",
//         "name": "Star",
//         "type": "Random"
//     },
//     {
//         "code": "N",
//         "name": "Crank",
//         "type": "Random"
//     },
//     {
//         "code": "O",
//         "name": "Satellite",
//         "type": "Random"
//     },
//     {
//         "code": "P",
//         "name": "Sidebody",
//         "type": "Random"
//     },
//     {
//         "code": "Q",
//         "name": "Phalanx",
//         "type": "Random"
//     },
//     {
//         "code": "1",
//         "name": "Molar - Molar",
//         "type": "Block"
//     },
//     {
//         "code": "2",
//         "name": "Sidebody Donut - Side Flake Donut",
//         "type": "Block"
//     },
//     {
//         "code": "3",
//         "name": "Side Flake Opal - Turf",
//         "type": "Block"
//     },
//     {
//         "code": "4",
//         "name": "Monopod - Monopod",
//         "type": "Block"
//     },
//     {
//         "code": "5",
//         "name": "Opal - Opal",
//         "type": "Block"
//     },
//     {
//         "code": "6",
//         "name": "Stardian - Stardian",
//         "type": "Block"
//     },
//     {
//         "code": "7",
//         "name": "Sidebuddies - Sidebuddies",
//         "type": "Block"
//     },
//     {
//         "code": "8",
//         "name": "Canadian Tee - Canadian Tee",
//         "type": "Block"
//     },
//     {
//         "code": "9",
//         "name": "Cat-Accordian - Cat-Accordian",
//         "type": "Block"
//     },
//     {
//         "code": "10",
//         "name": "Diamond - Bunyip",
//         "type": "Block"
//     },
//     {
//         "code": "11",
//         "name": "Photon - Photon",
//         "type": "Block"
//     },
//     {
//         "code": "12",
//         "name": "Bundy - Bundy",
//         "type": "Block"
//     },
//     {
//         "code": "13",
//         "name": "Mixed Accordian - Mixed Accordian",
//         "type": "Block"
//     },
//     {
//         "code": "14",
//         "name": "Bipole - Bipole",
//         "type": "Block"
//     },
//     {
//         "code": "15",
//         "name": "Caterpillar - Caterpillar",
//         "type": "Block"
//     },
//     {
//         "code": "16",
//         "name": "Compressed Accordian - Box",
//         "type": "Block"
//     },
//     {
//         "code": "17",
//         "name": "Danish Tee - Murphy",
//         "type": "Block"
//     },
//     {
//         "code": "18",
//         "name": "Zircon - Zircon",
//         "type": "Block"
//     },
//     {
//         "code": "19",
//         "name": "Ritz - Icepick",
//         "type": "Block"
//     },
//     {
//         "code": "20",
//         "name": "Piver - Viper",
//         "type": "Block"
//     },
//     {
//         "code": "21",
//         "name": "Zig Zag - Marquis",
//         "type": "Block"
//     },
//     {
//         "code": "22",
//         "name": "Tee - Chinese Tee",
//         "type": "Block"
//     }
// ]

// const randomhat = ["A","B","C","D","E","F","G","H","J","K","L","M","N","O","P","Q"]
// const blockhat = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"]
// const hat = ["A","B","C","D","E","F","G","H","J","K","L","M","N","O","P","Q","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"]

// async function addData() {
//         try {
//           const docRef = addDoc(collection(db, "divepool/4way/formations"), {
//             name: "open",
//             randomPool: randomhat,
//             blockPool: blockhat,
//             hat: hat
//           });
//         console.log("Document written with ID: ", docRef.id);
//         } catch (e) {
//         console.error("Error adding document: ", e);
//         }
//   }
  
// export default addData();

