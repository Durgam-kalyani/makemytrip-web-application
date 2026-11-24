import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cities from "../data/cities";
import { todayString } from "../utils/format";

// Search card with two tabs: Flights and Hotels.
function SearchBox({ initialTab = "flights" }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(initialTab);
  const [error, setError] = useState("");

  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Mumbai");
  const [date, setDate] = useState(todayString());
  const [passengers, setPassengers] = useState(1);

  const [city, setCity] = useState("Hyderabad");
  const [checkIn, setCheckIn] = useState(todayString());
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  function handleFlightSearch(event) {
    event.preventDefault();
    if (from === to) {
      setError("From and To cities cannot be the same.");
      return;
    }
    setError("");
    navigate(`/flights?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);
  }

  function handleHotelSearch(event) {
    event.preventDefault();
    if (checkOut && checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    setError("");
    const out = checkOut ? `&checkOut=${checkOut}` : "";
    navigate(`/hotels?city=${city}&checkIn=${checkIn}${out}&guests=${guests}`);
  }

  return (
    <div className="search-card">
      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "flights"}
          className={tab === "flights" ? "tab active" : "tab"}
          onClick={() => { setTab("flights"); setError(""); }}
        >
          ✈️ Flights
        </button>
        <button
          role="tab"
          aria-selected={tab === "hotels"}
          className={tab === "hotels" ? "tab active" : "tab"}
          onClick={() => { setTab("hotels"); setError(""); }}
        >
          🏨 Hotels
        </button>
      </div>

      {tab === "flights" ? (
        <form className="search-form" onSubmit={handleFlightSearch}>
          <div className="field">
            <label htmlFor="from">From</label>
            <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <button type="button" className="swap" onClick={swapCities} aria-label="Swap cities">
            ⇄
          </button>

          <div className="field">
            <label htmlFor="to">To</label>
            <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="date">Departure</label>
            <input id="date" type="date" min={todayString()} value={date}
              onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="field small">
            <label htmlFor="passengers">Travellers</label>
            <input id="passengers" type="number" min="1" max="9" value={passengers}
              onChange={(e) => setPassengers(e.target.value)} required />
          </div>

          <button type="submit" className="btn">Search</button>
        </form>
      ) : (
        <form className="search-form" onSubmit={handleHotelSearch}>
          <div className="field">
            <label htmlFor="city">City</label>
            <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="checkIn">Check-in</label>
            <input id="checkIn" type="date" min={todayString()} value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="checkOut">Check-out</label>
            <input id="checkOut" type="date" min={checkIn} value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)} />
          </div>

          <div className="field small">
            <label htmlFor="guests">Guests</label>
            <input id="guests" type="number" min="1" max="9" value={guests}
              onChange={(e) => setGuests(e.target.value)} required />
          </div>

          <button type="submit" className="btn">Search</button>
        </form>
      )}

      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}

export default SearchBox;
