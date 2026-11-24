// Sample flight data. In a real app this would come from a backend API.
// Flights run every day, so the search only needs the route (from / to).
const flights = [
  { id: 1, airline: "IndiGo", code: "6E-201", from: "Hyderabad", to: "Mumbai", departs: "06:15", arrives: "08:00", duration: "1h 45m", price: 4200 },
  { id: 2, airline: "Air India", code: "AI-540", from: "Hyderabad", to: "Mumbai", departs: "14:30", arrives: "16:20", duration: "1h 50m", price: 5100 },
  { id: 3, airline: "Vistara", code: "UK-880", from: "Hyderabad", to: "Delhi", departs: "09:00", arrives: "11:30", duration: "2h 30m", price: 5600 },
  { id: 4, airline: "IndiGo", code: "6E-512", from: "Hyderabad", to: "Bengaluru", departs: "07:45", arrives: "09:00", duration: "1h 15m", price: 2800 },
  { id: 5, airline: "Akasa Air", code: "QP-110", from: "Hyderabad", to: "Chennai", departs: "11:20", arrives: "12:35", duration: "1h 15m", price: 2900 },
  { id: 6, airline: "Air India", code: "AI-665", from: "Mumbai", to: "Delhi", departs: "10:15", arrives: "12:30", duration: "2h 15m", price: 6200 },
  { id: 7, airline: "SpiceJet", code: "SG-330", from: "Mumbai", to: "Goa", departs: "13:00", arrives: "14:10", duration: "1h 10m", price: 3300 },
  { id: 8, airline: "Vistara", code: "UK-941", from: "Mumbai", to: "Hyderabad", departs: "21:10", arrives: "22:55", duration: "1h 45m", price: 4500 },
  { id: 9, airline: "IndiGo", code: "6E-702", from: "Delhi", to: "Hyderabad", departs: "18:20", arrives: "20:50", duration: "2h 30m", price: 5400 },
  { id: 10, airline: "Air India", code: "AI-805", from: "Delhi", to: "Mumbai", departs: "07:00", arrives: "09:15", duration: "2h 15m", price: 6000 },
  { id: 11, airline: "Akasa Air", code: "QP-208", from: "Bengaluru", to: "Chennai", departs: "08:30", arrives: "09:30", duration: "1h 00m", price: 2500 },
  { id: 12, airline: "IndiGo", code: "6E-415", from: "Bengaluru", to: "Hyderabad", departs: "16:40", arrives: "17:55", duration: "1h 15m", price: 2700 },
  { id: 13, airline: "SpiceJet", code: "SG-918", from: "Chennai", to: "Hyderabad", departs: "19:00", arrives: "20:15", duration: "1h 15m", price: 3100 },
  { id: 14, airline: "IndiGo", code: "6E-633", from: "Kolkata", to: "Delhi", departs: "12:10", arrives: "14:35", duration: "2h 25m", price: 5900 },
  { id: 15, airline: "Vistara", code: "UK-377", from: "Pune", to: "Hyderabad", departs: "15:30", arrives: "16:55", duration: "1h 25m", price: 3600 },
  { id: 16, airline: "Air India", code: "AI-112", from: "Goa", to: "Mumbai", departs: "17:45", arrives: "18:55", duration: "1h 10m", price: 3400 },
];

export default flights;
