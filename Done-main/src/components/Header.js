import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";
function Header({ active, setActive }) {
  return (
    <Container>
      <header
        className={
          active ? "sidebar_active p-3 d-flex justify-content-between" : "p-3 sidebar d-flex justify-content-between"
        }
      >
        <Button
          id="sidebarCollapse"
          type="button"
          className="btn shadow-sm fw-bold"
          onClick={() => {
            setActive(!active);
          }}
        >
          <i className="fas fa-bars"></i>
        </Button>
        <div className={active ? "" : "n-active"}>
          <Navbar.Text className="text-end">
            Ida ayu made dyah kusuma
          </Navbar.Text>
          <img
            width="40"
            height="40"
            className="justify-content-end me-3 rounded-circle img-thumbnail shadow-sm"
            src="https://rashed-abir.web.app/static/media/rashed%20abir.bad348d4.JPEG"
            alt="l"
          />
        </div>
      </header>
    </Container>
  );
}

export default Header;
