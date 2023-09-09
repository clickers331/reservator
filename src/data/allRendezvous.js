"use strict";
import Chance from "chance";
import fs from "fs";

var yeyeye = createAllRendezvous(2023);
//write the yeyeye variable into a file named "allRendezvous.json"
fs.writeFile(
  "./allRendezvous.json",
  JSON.stringify(yeyeye, null, 2),
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);

function createAllRendezvous(startYear, yearCount) {
  if (yearCount === void 0) {
    yearCount = 1;
  }
  var allRendezvous = {};
  var chance = new Chance();
  for (var i = 0; i < yearCount; i++) {
    var currentFullYear = startYear + yearCount - 1;
    var currentYear = [];
    console.log("Year: ", currentFullYear);
    for (var j = 1; j < 13; j++) {
      console.log("Month: ", j);
      var currentMonth = [];
      let daysInMonth = new Date(currentFullYear, j, 0).getDate();
      for (var k = 0; k < daysInMonth; k++) {
        console.log("Day: ", k);
        for (let m = 0; m < 4; m++) {
          currentMonth.push({
            date: new Date(currentFullYear, j, k, m),
            name: chance.name(),
            cancelled: chance.bool(),
            uid: chance.guid(),
          });
        }
      }
      currentYear.push(currentMonth);
    }
    allRendezvous[currentFullYear] = currentYear;
  }
  return allRendezvous;
}
