import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

function HotelCard({ hotel, query = "" }) {
  return (
    <article className="hotel-card">
      <div className="hotel-image" aria-hidden="true">{hotel.emoji}</div>
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p className="muted">{hotel.area}, {hotel.city}</p>
        <p className="rating">★ {hotel.rating}</p>
        <ul className="amenities">
          {hotel.amenities.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
      <div className="book-side">
        <div className="price">{formatPrice(hotel.price)}</div>
        <div className="muted">per night</div>
        <Link className="btn btn-small" to={`/book/hotel/${hotel.id}${query}`}>
          Book now
        </Link>
      </div>
    </article>
  );
}

export default HotelCard;
