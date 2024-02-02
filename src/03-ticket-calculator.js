/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */

    const ticketInfo = {
      ticketType: "membership",
      entrantType: "child", // Incorrect
      extras: ['movie', 'education'],
    };

function calculateTicketPrice(ticketData, ticketInfo) {
  // Break down the ticketInfo to its parts.
  let ticket = ticketInfo.ticketType;
  let entrant = ticketInfo.entrantType;
  let extraChosen = ticketInfo.extras;

    if(checkForInvalidInfo(ticketData,ticketInfo) !== true) {
        return checkForInvalidInfo(ticketData,ticketInfo)
        }

      // If all checks pass calculate the ticket price.
      let totalPrice = ticketData[ticket].priceInCents[entrant];
      extraChosen.forEach(extra => totalPrice += ticketData.extras[extra].priceInCents[entrant]);

      return totalPrice;
}

function checkForInvalidInfo(ticketData, ticketInfo) {
  // Break down the ticketInfo to its parts.
  let ticket = ticketInfo.ticketType;
  let entrant = ticketInfo.entrantType;
  let extraChosen = ticketInfo.extras;

   // Break down your ticketData to the parts you need
   let entrantOptionsArr = Object.keys(ticketData.general.priceInCents);
   let mainTagsArr = Object.keys(ticketData);
   let extrasArr = Object.keys(ticketData.extras);

   // Grab an invalid extra from your ticketInfo if any
   let invalidExtra =  extraChosen.find(extra => {if(!extrasArr.includes(extra)) return extra});

     // Checks to make sure every part of the ticketInfo is valid
     if(!mainTagsArr.includes(ticket)) return `Ticket type '${ticket}' cannot be found.`;
     if(!entrantOptionsArr.includes(entrant)) return `Entrant type '${entrant}' cannot be found.`;
     if(invalidExtra) return `Extra type '${invalidExtra}' cannot be found.`;

     return true;
}

// console.log(calculateTicketPrice(exampleTicketData,ticketInfo))

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */

    const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: [],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];

function purchaseTickets(ticketData, purchases) {
  // Check for any invalid purchases. If one's found store it and use it in the check to return the proper response.
  let invalidPurchase = purchases.find(purchase => (checkForInvalidInfo(ticketData,purchase) !== true));
  if(invalidPurchase) return checkForInvalidInfo(ticketData,invalidPurchase);

    // Once purchases are verified build your receipt with a slew of helper functions and template literals
    let finalReceipt = ['Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n']
    let totalPrice = 0;
    
    purchases.forEach(purchase => {
      finalReceipt.push(`${capitalize(purchase.entrantType)} ${ticketData[purchase.ticketType].description}: $${convertCentsToDollars(calculateTicketPrice(ticketData,purchase))}${formatArrayOfWords(purchase.extras)}\n`)
      totalPrice += calculateTicketPrice(ticketData, purchase)});

    finalReceipt.push(`-------------------------------------------\nTOTAL: $${convertCentsToDollars(totalPrice)}`)

  return finalReceipt.join('');
}

function formatArrayOfWords(arr) {
  if(arr.length === 0)return '';

  return ` (` + arr.map(word => capitalize(word)).join(` Access, `) + ` Access)` 
}

function convertCentsToDollars(num) {
  return (num / 100).toFixed(2);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

console.log(purchaseTickets(exampleTicketData,purchases))



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
