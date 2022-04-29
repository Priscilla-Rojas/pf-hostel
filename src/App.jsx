import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Prueba from './pages/Prueba/Prueba';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NewPassword from './components/NewPassword/NewPassword';
import Admin from './pages/Admin/Admin';
import CreateRoom from './components/RoomsAdmin/CreateRoom';
import ListRooms from './components/RoomsAdmin/ListRooms';
import BookingFromReception from './components/BookingFromReception/BookingFromReception'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<NewPassword />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/listrooms" element={<ListRooms />} />
          <Route path="/bookfromreception" element={<BookingFromReception />} />
        </Route>
        <Route path="/reserva" element={<Prueba />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
