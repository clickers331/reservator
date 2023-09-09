import { AllRandezvous, Rendezvous } from "./data/mockDatabase";
import Chance from "chance";

const monthNamesTR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const monthNamesURL = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function flattenObjectSimple(object: object) {
  const flattenedObject: any[] = [];
  Object.values(object).map((value) => flattenedObject.push(...value));
  return flattenedObject;
}

function getWeekNo(date: string): number {
  const currentDate: Date = new Date(date);
  const startDate: Date = new Date(currentDate.getFullYear(), 0, 1);
  const days: number = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  const weekNumber: number = Math.ceil(days / 7);
  return weekNumber;
}

function createAllRendezvous(
  startYear: number,
  yearCount: number = 1
): AllRandezvous {
  let allRendezvous: AllRandezvous = {};
  const chance = new Chance();
  for (let i = 0; i < yearCount; i++) {
    const currentFullYear: number = startYear + yearCount - 1;
    const currentYear: Rendezvous[][] = [];
    for (let j = 0; j < 12; i++) {
      const currentMonth: Rendezvous[] = [];
      for (let k = 0; k < new Date(currentFullYear, j, 0).getDate(); k++) {
        currentMonth.push({
          date: new Date(currentFullYear, j, k),
          name: chance.name(),
          cancelled: chance.bool(),
          uid: chance.guid(),
        });
      }
      currentYear.push(currentMonth);
    }
    allRendezvous[currentFullYear] = currentYear;
  }
  return allRendezvous;
}

export {
  createAllRendezvous,
  getWeekNo,
  flattenObjectSimple,
  monthNamesTR,
  monthNamesURL,
};
