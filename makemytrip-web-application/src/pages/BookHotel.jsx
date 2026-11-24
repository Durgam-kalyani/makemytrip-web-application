import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import hotels from "../data/hotels";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";
import { formatPrice, nightsBetween, todayString } from "../utils/format";

function BookHotel() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const hotel = hotels.find((h) => h.id === Number(id));

  const [guestName, setGuestName] = useState(user ? user.name : "");
  const [checkIn, setCheckIn] = useState(params.get("checkIn") || todayString());
  const [checkOut, setCheckOut] = useState(params.get("checkOut") || "");
  const [guests, setGuests] = useState(Number(params.get("guests")) || 1);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState("");

  if (!hotel) {
    return (
      <div className="container section">
        <p className="empty">Hotel not found. <Link to="/hotels">Back to hotels</Link></p>
      </div>
    );
  }

  const nights = checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const total = hotel.price * nights * rooms;

  function handleSubmit(event) {
    event.preventDefault();
    if (guestName.trim().length < 2) {
      setError("Please enter the guest's full name.");
      return;
    }
    if (!checkOut || nights < 1) {
      setError("Check-out must be at least one day after check-in.");
      return;
    }
    setError("");

    addBooking(user.email, {
      type: "hotel",
      title: hotel.name,
      subtitle: `${hotel.area}, ${hotel.city}`,
      checkIn,
      checkOut,
      nights,
      rooms,
      guests,
      guestName,
      total,
    });
    navigate("/my-bookings", { state: { justBooked: true } });
  }

  return (
    <div className="container section narrow">
      <h1>Review &amp; book your stay</h1>

      <div className="summary-card">
        <h2>{hotel.emoji} {hotel.name}</h2>
        <p>{hotel.area}, {hotel.city} · ★ {hotel.rating}</p>
        <p>{formatPrice(hotel.price)} per night</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="guest-name">Guest name</label>
          <input id="guest-name" type="text" value={guestName}
            onChange={(e) => setGuestName(e.target.value)} required />
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="check-in">Check-in</label>
            <input id="check-in" type="date" min={todayString()} value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="check-out">Check-out</label>
            <input id="check-out" type="date" min={checkIn} value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)} required />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="rooms">Rooms</label>
            <input id="rooms" type="number" min="1" max="5" value={rooms}
              onChange={(e) => setRooms(Math.max(1, Number(e.target.value)))} />
          </div>
          <div className="field">
            <label htmlFor="guests">Guests</label>
            <input id="guests" type="number" min="1" max="10" value={guests}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))} />
          </div>
        </div>

        <p className="total">
          {nights} night{nights !== 1 ? "s" : ""} × {rooms} room{rooms > 1 ? "s" : ""}:{" "}
          <strong>{formatPrice(total)}</strong>
        </p>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn">Confirm booking</button>
      </form>
    </div>
  );
}

export default BookHotel;
