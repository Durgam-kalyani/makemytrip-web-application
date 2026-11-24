import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";
import { formatPrice, prettyDate } from "../utils/format";

function MyBookings() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const location = useLocation();

  // Only show bookings that belong to the logged-in user
  const myBookings = bookings.filter((b) => b.userEmail === user.email);

  function handleCancel(id) {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(id);
    }
  }

  return (
    <div className="container section narrow">
      <h1>My bookings</h1>

      {location.state?.justBooked && (
        <div className="message success" role="status">
          🎉 Booking confirmed! Details are below.
        </div>
      )}

      {myBookings.length === 0 ? (
        <p className="empty">
          You have no bookings yet. <Link to="/flights">Search flights</Link> or{" "}
          <Link to="/hotels">find a hotel</Link>.
        </p>
      ) : (
        <div className="list">
          {myBookings.map((b) => (
            <article key={b.id} className={`booking-card ${b.status === "CANCELLED" ? "cancelled" : ""}`}>
              <div>
                <span className="badge">{b.type === "flight" ? "✈️ Flight" : "🏨 Hotel"}</span>
                <h3>{b.title}</h3>
                <p className="muted">{b.subtitle}</p>

                {b.type === "flight" ? (
                  <p>
                    {prettyDate(b.date)} · {b.travellers.length} traveller
                    {b.travellers.length > 1 ? "s" : ""}:{" "}
                    {b.travellers.map((t) => t.name).join(", ")}
                  </p>
                ) : (
                  <p>
                    {prettyDate(b.checkIn)} → {prettyDate(b.checkOut)} ({b.nights} night
                    {b.nights > 1 ? "s" : ""}, {b.rooms} room{b.rooms > 1 ? "s" : ""})
                  </p>
                )}
                <p className="muted">Booking ID: {b.id}</p>
              </div>

              <div className="book-side">
                <div className="price">{formatPrice(b.total)}</div>
                <span className={b.status === "CONFIRMED" ? "status ok" : "status bad"}>
                  {b.status === "CONFIRMED" ? "Confirmed" : "Cancelled"}
                </span>
                {b.status === "CONFIRMED" && (
                  <button className="btn btn-small btn-outline" onClick={() => handleCancel(b.id)}>
                    Cancel
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
