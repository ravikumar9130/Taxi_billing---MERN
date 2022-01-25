import Home from './screens/Home';
import Oneday from './screens/Oneday';
import Taxi from './screens/Taxi';
import Login from './screens/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocalTrip from './screens/LocalTrip';
import Hillstrip from './screens/Hillstrip';
import Dashboard from './screens/Dashboard';
import Customer from './screens/Customer';
import Car from './screens/Car';
import PrivateRoute from './assets/header/PrivateRoute';
import ProtectedRoute from './assets/header/ProtectedRoute';

import CarTable from './components/CarTable';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/one-day-trip" element={<PrivateRoute><Oneday /></PrivateRoute>} />
        <Route path="/local-trip" element={<PrivateRoute><LocalTrip /></PrivateRoute>} />
        <Route path="/hills-trip" element={<PrivateRoute><Hillstrip /></PrivateRoute>} />
        <Route path="/taxi-trip" element={<PrivateRoute><Taxi /></PrivateRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
            <Route path="customer" element={<ProtectedRoute><Customer /></ProtectedRoute>}/>
            <Route path="car" element={<ProtectedRoute><Car /></ProtectedRoute>}>
                  <Route path=":id" element={<ProtectedRoute><CarTable /></ProtectedRoute>}/>
            </Route>
        </Route>
      </Routes>
     
    </Router>
  );
}

export default App;
