import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Login from "./auth/Login";
import Register from './auth/Register';
import Home from "./booking/Home";
import TopNav from './components/TopNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';
import SearchResult from './hotels/SearchResult';



function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer
        theme='colored'
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel/:hotelId" element={<ViewHotel />} />
        <Route path="/search-result" element={<SearchResult />} />



        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/seller"
          element={
            <PrivateRoute>
              <DashboardSeller />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels/new"
          element={
            <PrivateRoute>
              <NewHotel />
            </PrivateRoute>
          }
        />

        <Route
          path="/hotel/edit/:hotelId"
          element={
            <PrivateRoute>
              <EditHotel />
            </PrivateRoute>
          }
        />


      </Routes>


    </BrowserRouter>
  );
}

export default App;
