import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { Provider } from 'react-redux';
import store from './Store';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import AddCommunication from './Components/AddCommunication';
import CommunicationHistory from './Components/CommunicationHistory';
import Analytics from './Components/Analytics';
import CustomerManagement from './Components/CustomerManagement';
import Feedback from './Components/Feedback';
import Customers from './Pages/Customers';
import NewCustomer from './Pages/NewCustomer';
import EditCustomer from './Pages/EditCustomer';
import DeleteCustomer from './Pages/DeleteCustomer';
import Footer from './Components/Footer';


function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/new" element={<NewCustomer />} />
              <Route path="/customers/edit/:id" element={<EditCustomer />} />
              <Route path="/customers/delete/:id" element={<DeleteCustomer />} />
              <Route path="/add-communication" component={AddCommunication} />
              <Route path="/communication-history/:customerId" component={CommunicationHistory} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/customer-management" component={CustomerManagement} />
              <Route path="/feedback" component={Feedback} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
