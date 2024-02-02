
import dinosaurs from "../data/dinosaurs.js";

function testFunction() {
console.log('Hello world');
alert('hello world test');
}

export {testFunction}

function getDinosaurDescription(id) {
    let matchedObj = (dinosaurs.find(dino => dino.dinosaurId === id)) || false;
    if(matchedObj.dinosaurId) {
      alert(`${matchedObj.name} (${matchedObj.pronunciation})\n${matchedObj.info} It lived in the ${matchedObj.period} period, over ${matchedObj.mya[matchedObj.mya.length -1]} million years ago.`);
    }
    else{
    alert(`A dinosaur with an ID of '${id}' cannot be found.`);
    }
  }

  export {getDinosaurDescription}

