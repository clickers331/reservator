import Chance from "chance";

interface AllRandezvous {
  [key: string | number]: Rendezvous[][];
}

interface Rendezvous {
  uid: string | number;
  cancelled: boolean;
  name: string;
  date: Date;
}

const yeyeye = createAllRendezvous(2023);

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
