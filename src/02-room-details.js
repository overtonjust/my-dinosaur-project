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
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

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

function findDinosaurId(dinosaurs,dinosaurName) {
  let dinoObj = dinosaurs.find(dino => dino.name === dinosaurName) || `Dinosaur with name '${dinosaurName}' cannot be found.`;

  return dinoObj.dinosaurId || dinoObj
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
function getConnectedRoomNamesById(rooms, id) {
let arrOfIds = getConnectRoomIds(rooms,id);
if(typeof arrOfIds == 'string') return arrOfIds;

let connectedRooms = matchRoomsWithID(rooms,arrOfIds);
let uniqueId = arrOfIds.find(id => !connectedRooms.some(room => room.roomId === id));

if(uniqueId) return `Room with ID of '${uniqueId}' could not be found.`

return connectedRooms.map(room => room.name)

}

function getConnectRoomIds(rooms,id) {
  let foundRoom = rooms.find(room => room.roomId === id) || `Room with ID of '${id}' could not be found.`;

  return foundRoom.connectsTo || foundRoom
}

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

console.log(getConnectedRoomNamesById(input,"xwG7O4wQl"))



module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};


