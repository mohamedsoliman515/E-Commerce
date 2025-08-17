import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import HeaderLeftBar from "./headerLeftBar/HeaderLeftBar";
import styles from "./styles.module.css";
import { authLogout } from "@store/auth/authSlice";
import { useEffect } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";

const { headerContainer, headerLogo } = styles;

function Header() {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">eCom</Badge>
        </h1>
        <HeaderLeftBar />
      </div>

      {/* navbar  will alone component not in header*/}
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                about
              </Nav.Link>
            </Nav>
            <Nav className="me-end">
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={`welcome : ${user?.firstName}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="profile" end>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="profile/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={NavLink}
                      to="/"
                      onClick={() => {
                        dispatch(authLogout());
                      }}
                    >
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
