function convertToIST(isoString) {
  let currentDate;
  if (!isoString) {
    const date = new Date();
    currentDate = date.toISOString();
  }
  // const dateFun = isoString ? new Date(isoString) : new Date()
  const date = new Date(isoString || currentDate);
  // Calculate the IST offset (5 hours 30 minutes ahead of UTC)
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  // Get the IST time
  const istTime = new Date(date.getTime() + istOffset);
  // Extract date and time components
  const year = istTime.getUTCFullYear();
  const month = String(istTime.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(istTime.getUTCDate()).padStart(2, "0");
  const hours = String(istTime.getUTCHours()).padStart(2, "0");
  const minutes = String(istTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istTime.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(istTime.getUTCMilliseconds()).padStart(3, "0");
  // Get the day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[istTime.getUTCDay()];
  // Format the string as required
  const formattedString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+05:30`;
  const fullDate = `${dayName} ${day}-${month}-${year}`;
  const time = `${hours}:${minutes}`;

  return { formattedString, fullDate, time };
}
export default convertToIST;
