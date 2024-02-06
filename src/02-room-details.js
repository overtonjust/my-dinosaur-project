const input = [
  {
    roomId: "xwG7O4wQl",
    name: "Room A",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "GHPLI7EmD", // Room B
      "eU46gvYUF", // Room C
      "incorrect-id", // Incorrect Room. Does not exist.
    ],
  },
  {
    roomId: "GHPLI7EmD",
    name: "Room B",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "xwG7O4wQl", // Room A
    ],
  },
  {
    roomId: "eU46gvYUF", // 3
    name: "Room C",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "xwG7O4wQl", // Room A
    ],
  },
];




/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
// const exampleDinosaurData = require("../data/dinosaurs");
// const exampleRoomData = require("../data/rooms");

import dinosaurs from "../data/dinosaurs.js";
import rooms from "../data/rooms.js";
// Do not change the lines above.


/**
 * findDinosaurID()
 * ---------------------
 * Return the Id of a given dinosaur in the dataset. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The Id associated with the given dinosaur. Alternatively, an error message.
 *
 * EXAMPLE:
 * findDinosaurId(dinosaurs, "Tyrannosaurus");
 * //> "wuL4ddBinQ"
 * 
 * EXAMPLE:
 * findDinosaurId(dinosaurs,"Pterodactyl");
 * "Dinosaur with name 'Pterodactyl' cannot be found."
 * 
 */

function findDinosaurId(dinosaurs,dinosaurName) {
  let dinoObj = dinosaurs.find(dino => dino.name === dinosaurName) || `Dinosaur with name '${dinosaurName}' cannot be found.`;

  return dinoObj.dinosaurId || dinoObj
}


/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let idToCheck = findDinosaurId(dinosaurs,dinosaurName);
  if(idToCheck.includes('Dinosaur')){
    return idToCheck;
  }

  let roomFound = rooms.find(room => room.dinosaurs.includes(idToCheck)) || `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  
  return roomFound.name || roomFound;
}

// console.log(findDinosaurId(exampleDinosaurData,"Allorus"))

// console.log(getRoomByDinosaurName(exampleDinosaurData,exampleRoomData,'Tyrannosaus'))


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
  function getConnectedRoomNamesById(rooms, id) { // id = "A6QaYdyKra"
let arrOfIds = getConnectRoomIds(rooms,id); // give me the connectsTo array from the given ID
if(typeof arrOfIds == 'string') return arrOfIds; // Check if the inputed Id was invalid

let connectedRooms = matchRoomsWithID(rooms,arrOfIds); //give me an array of all the objects from the connectsTo arr
let uniqueId = arrOfIds.find(id => !connectedRooms.some(room => room.roomId === id)); // Stores the id if any connected rooms are invalid

if(uniqueId) return `Room with ID of '${uniqueId}' could not be found.`

return connectedRooms.map(room => room.name) // turn the array of connected room objects into an array of their names

}

/**
 * getConnectedRoomIds()
 * ---------------------
 * Returns an array of strings, where each string is the id of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 * getConnectRoomIds(rooms,"A6QaYdyKra");
 * //>  [ 'zwfsfPU5u', 'aIA6tevTne', 'dpQnu5wgaN', 'L72moIRcrX' ]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "incorred-id");
 *  //>  `Room with ID of 'incorred-id' could not be found.`
 */

function getConnectRoomIds(rooms,id) { 
  let foundRoom = rooms.find(room => room.roomId === id) || `Room with ID of '${id}' could not be found.`;

  return foundRoom.connectsTo || foundRoom
}

// console.log(getConnectRoomIds(rooms,"A6QaYdyKra"))

/**
 * matchRoomsWithId()
 * ---------------------
 * Returns an array of objects, where each object is corresponded to the id in a given array.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {array[]} arr - An array of Ids to match.
 * @returns {Object[]} An array of room objects matching each id in the given array.
 *
 * EXAMPLE:
 * getConnectRoomIds(rooms,[ "L72moIRcrX", "dBZeK6vhpt"]);
 * 
 * //>  [{
    roomId: "L72moIRcrX", // 5
    name: "Kit Hopkins Education Wing",
    requiredTicketPermissions: ["education"],
    dinosaurs: [
      "YLtkN9R37", // Allosaurus
      "U9vuZmgKwUr", // Xenoceratops
    ],
    connectsTo: [
      "A6QaYdyKra", // Ticket Center
      "0eNtkY5WoA", // Haley Hall
      "Ys2Trg-1OT", // Terrell Leon Lecture Room
    ],
  }, {
    roomId: "dBZeK6vhpt", // 10
    name: "Paxton Decker Terrace",
    requiredTicketPermissions: ["terrace"],
    dinosaurs: [],
    connectsTo: [
      "0eNtkY5WoA", // Haley Hall
      "Y707HL8uP9", // Roberts Room
      "1FMoeqQxFk", // Blackwell Amphitheater
    ],
  }]
 *
 *
 */

function matchRoomsWithID(rooms,arr){
  let matchedRooms = rooms.filter(room => {
    for(const id of arr){
      if(room.roomId === id){
        return room
      }
    }
   })
   return matchedRooms;
}

// console.log(getConnectedRoomNamesById(input,"xwG7O4wQl"))



// module.exports = {
//   getRoomByDinosaurName,
//   getConnectedRoomNamesById,
// };


