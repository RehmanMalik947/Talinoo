export const formatHumanDate = (isoDate) => {
  if (!isoDate) return "N/A"; 

  const dateObj = new Date(isoDate);

  return dateObj.toLocaleString("en-US", {
    weekday: "short", 
    year: "numeric",
    month: "short",   
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};
