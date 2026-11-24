import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import BookFlight from "./pages/BookFlight";
import BookHotel from "./pages/BookHotel";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* These pages need the user to be logged in */}
          <Route path="/book/flight/:id" element={<ProtectedRoute><BookFlight /></ProtectedRoute>} />
          <Route path="/book/hotel/:id" element={<ProtectedRoute><BookHotel /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
