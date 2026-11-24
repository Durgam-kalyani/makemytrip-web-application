import { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => loadFromStorage("tripeasy_bookings", []));

  function update(newList) {
    setBookings(newList);
    saveToStorage("tripeasy_bookings", newList);
  }

  // booking = { type: "flight" | "hotel", title, details, total, ... }
  function addBooking(userEmail, booking) {
    const newBooking = {
      ...booking,
      id: "TE" + Date.now().toString().slice(-8),
      userEmail,
      status: "CONFIRMED",
      bookedOn: new Date().toISOString(),
    };
    update([newBooking, ...bookings]);
    return newBooking;
  }

  function cancelBooking(id) {
    update(bookings.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b)));
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
