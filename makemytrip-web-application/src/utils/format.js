// Format a number as Indian Rupees, e.g. 4200 -> "₹4,200"
export function formatPrice(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

// Today's date as YYYY-MM-DD (the format <input type="date"> uses)
export function todayString() {
  return new Date().toISOString().split("T")[0];
}

// Number of nights between two YYYY-MM-DD dates
export function nightsBetween(checkIn, checkOut) {
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

// "2026-12-05" -> "5 Dec 2026"
export function prettyDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
