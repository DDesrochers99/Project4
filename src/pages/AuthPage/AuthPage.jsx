import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center mt-5">
            <h1>Welcome, {showSignUp ? "Sign Up Below" : "Login In Below"}</h1>
          </div>
          <div className="text-center mt-3">
            <Button variant="info" onClick={() => setShowSignUp(!showSignUp)}>
              {showSignUp ? "Log In" : "Sign Up"}
            </Button>
          </div>
          <div className="mt-4">
            {showSignUp ? (
              <SignUpForm setUser={setUser} />
            ) : (
              <LoginForm setUser={setUser} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
