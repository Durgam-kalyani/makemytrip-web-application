import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import HotelCard from "../components/HotelCard";
import hotels from "../data/hotels";

const offers = [
  { id: 1, title: "Flat 12% off on domestic flights", code: "FLY12", emoji: "✈️" },
  { id: 2, title: "Weekend hotel deals from ₹1,200", code: "STAY", emoji: "🏨" },
  { id: 3, title: "Goa beach holidays - book early", code: "GOA25", emoji: "🏖️" },
];

function Home() {
  const topHotels = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      <section className="hero">
        <h1>Book flights &amp; hotels across India</h1>
        <p>Search, compare and book your next trip in a few clicks.</p>
        <SearchBox />
      </section>

      <section className="container section">
        <h2>Offers for you</h2>
        <div className="offer-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <span className="offer-emoji" aria-hidden="true">{offer.emoji}</span>
              <div>
                <h3>{offer.title}</h3>
                <p className="muted">Use code <strong>{offer.code}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Top-rated stays</h2>
          <Link to="/hotels">See all hotels →</Link>
        </div>
        <div className="list">
          {topHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
