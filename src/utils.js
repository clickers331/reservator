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

function flattenObjectSimple(object) {
  const flattenedObject = [];
  Object.values(object).map((value) => flattenedObject.push(...value));
  return flattenedObject;
}

export { flattenObjectSimple, monthNamesTR, monthNamesURL };
