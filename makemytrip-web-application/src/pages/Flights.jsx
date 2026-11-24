import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import FlightCard from "../components/FlightCard";
import flights from "../data/flights";
import { prettyDate } from "../utils/format";

function Flights() {
  const [params] = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const passengers = params.get("passengers") || 1;

  const [sortBy, setSortBy] = useState("price");

  const hasSearch = from && to;

  let results = hasSearch
    ? flights.filter((f) => f.from === from && f.to === to)
    : flights;

  // Sort a copy of the list so the original data is never changed
  results = [...results].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : a.departs.localeCompare(b.departs)
  );

  return (
    <>
      <section className="hero small-hero">
        <SearchBox initialTab="flights" />
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>
            {hasSearch ? `${from} → ${to}` : "All flights"}
            {date && <span className="muted"> · {prettyDate(date)}</span>}
          </h2>

          <label className="sort">
            Sort by{" "}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">Price (low to high)</option>
              <option value="time">Departure time</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <p className="empty">
            No flights found for this route. Try another city pair such as Hyderabad → Mumbai.
          </p>
        ) : (
          <div className="list">
            {results.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                date={date || ""}
                passengers={passengers}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Flights;
