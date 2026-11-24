import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import HotelCard from "../components/HotelCard";
import hotels from "../data/hotels";

function Hotels() {
  const [params] = useSearchParams();
  const city = params.get("city");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests") || 1;

  const [maxPrice, setMaxPrice] = useState(15000);

  let results = city ? hotels.filter((h) => h.city === city) : hotels;
  results = results.filter((h) => h.price <= maxPrice);

  // Pass the search details on to the booking page
  const query = `?checkIn=${checkIn || ""}&checkOut=${checkOut || ""}&guests=${guests}`;

  return (
    <>
      <section className="hero small-hero">
        <SearchBox initialTab="hotels" />
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>{city ? `Hotels in ${city}` : "All hotels"}</h2>

          <label className="sort">
            Max price: ₹{maxPrice.toLocaleString("en-IN")}{" "}
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
        </div>

        {results.length === 0 ? (
          <p className="empty">No hotels match your search. Try a different city or a higher price.</p>
        ) : (
          <div className="list">
            {results.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} query={query} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Hotels;
