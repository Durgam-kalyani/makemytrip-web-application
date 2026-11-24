import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

function FlightCard({ flight, date, passengers }) {
  return (
    <article className="flight-card">
      <div className="airline">
        <strong>{flight.airline}</strong>
        <span className="muted">{flight.code}</span>
      </div>

      <div className="route">
        <div>
          <div className="time">{flight.departs}</div>
          <div className="muted">{flight.from}</div>
        </div>
        <div className="duration">
          <span className="muted">{flight.duration}</span>
          <div className="line"></div>
          <span className="muted">Non-stop</span>
        </div>
        <div>
          <div className="time">{flight.arrives}</div>
          <div className="muted">{flight.to}</div>
        </div>
      </div>

      <div className="book-side">
        <div className="price">{formatPrice(flight.price)}</div>
        <div className="muted">per traveller</div>
        <Link
          className="btn btn-small"
          to={`/book/flight/${flight.id}?date=${date}&passengers=${passengers}`}
        >
          Book now
        </Link>
      </div>
    </article>
  );
}

export default FlightCard;
