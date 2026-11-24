import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import flights from "../data/flights";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";
import { formatPrice, prettyDate, todayString } from "../utils/format";

function BookFlight() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const flight = flights.find((f) => f.id === Number(id));
  const [date, setDate] = useState(params.get("date") || todayString());
  const count = Math.max(1, Math.min(9, Number(params.get("passengers")) || 1));

  // One entry per traveller: { name, age }
  const [travellers, setTravellers] = useState(
    Array.from({ length: count }, () => ({ name: "", age: "" }))
  );
  const [error, setError] = useState("");

  if (!flight) {
    return (
      <div className="container section">
        <p className="empty">Flight not found. <Link to="/flights">Back to flights</Link></p>
      </div>
    );
  }

  const total = flight.price * travellers.length;

  function updateTraveller(index, field, value) {
    setTravellers(travellers.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  }

  function handleSubmit(event) {
    event.preventDefault();
    for (const t of travellers) {
      if (t.name.trim().length < 2) {
        setError("Please enter every traveller's full name.");
        return;
      }
      if (Number(t.age) < 1 || Number(t.age) > 120) {
        setError("Please enter a valid age for every traveller.");
        return;
      }
    }
    setError("");

    addBooking(user.email, {
      type: "flight",
      title: `${flight.from} → ${flight.to}`,
      subtitle: `${flight.airline} ${flight.code} · ${flight.departs} - ${flight.arrives}`,
      date,
      travellers,
      total,
    });
    navigate("/my-bookings", { state: { justBooked: true } });
  }

  return (
    <div className="container section narrow">
      <h1>Review &amp; book your flight</h1>

      <div className="summary-card">
        <h2>{flight.from} → {flight.to}</h2>
        <p>{flight.airline} · {flight.code}</p>
        <p>{flight.departs} → {flight.arrives} ({flight.duration})</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="travel-date">Travel date</label>
          <input id="travel-date" type="date" min={todayString()} value={date}
            onChange={(e) => setDate(e.target.value)} required />
        </div>

        {travellers.map((t, index) => (
          <fieldset key={index}>
            <legend>Traveller {index + 1}</legend>
            <div className="field">
              <label htmlFor={`name-${index}`}>Full name</label>
              <input id={`name-${index}`} type="text" value={t.name}
                onChange={(e) => updateTraveller(index, "name", e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor={`age-${index}`}>Age</label>
              <input id={`age-${index}`} type="number" min="1" max="120" value={t.age}
                onChange={(e) => updateTraveller(index, "age", e.target.value)} required />
            </div>
          </fieldset>
        ))}

        <p className="total">
          Total ({travellers.length} traveller{travellers.length > 1 ? "s" : ""}
          {date ? `, ${prettyDate(date)}` : ""}): <strong>{formatPrice(total)}</strong>
        </p>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn">Confirm booking</button>
      </form>
    </div>
  );
}

export default BookFlight;
