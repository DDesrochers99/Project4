import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AdminPage from '../AdminPage/AdminPage';
import { Container, Row } from 'react-bootstrap';
import BootstrapNavbar from '../../components/BootstrapNavbar/BootstrapNavbar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <BootstrapNavbar user={user} setUser={setUser} />
      <Container>
        <Row>
          {user ? (
            <>
              <Routes>
                <Route
                  path="/orders/new"
                  element={<NewOrderPage user={user} setUser={setUser} />}
                />
                <Route
                  path="/orders"
                  element={<OrderHistoryPage user={user} setUser={setUser} />}
                />
                <Route
                  path="/admin-page"
                  element={<AdminPage user={user} setUser={setUser} />}
                />
                <Route path="/*" element={<Navigate to="/orders/new" />} />
              </Routes>
            </>
          ) : (
            <AuthPage setUser={setUser} />
          )}
        </Row>
      </Container>
    </>
  );
}
