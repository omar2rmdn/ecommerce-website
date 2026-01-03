import { Container, Nav, Navbar } from "react-bootstrap";
import { FaHeart, FaLeaf } from "react-icons/fa";
import { NavLink } from "react-router";
import CartBadge from "./cart-badge";
import HeaderIconItem from "./header-icon-item";

const Header = () => {
  return (
    <>
      <div className="py-4 border-bottom">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center text-dark text-decoration-none">
            <FaLeaf size={24} className="me-2 text-success" />
            <span className="fs-5 fw-bold">Web Store</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            {/* Wishlist Link */}
            <HeaderIconItem
              label="Wish List"
              icon={<FaHeart size={22} color="red" />}
              link="/wishlist"
            />

            {/* Separator */}
            <span className="text-secondary">|</span>

            {/* Cart Link */}
            <HeaderIconItem label="Cart" icon={<CartBadge />} link="/cart" />
          </div>
        </Container>
      </div>

      <Navbar bg="dark" data-bs-theme="dark" className="rounded">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/categories"}>
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/about"}>
              About
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to={"/login"}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/register"}>
              Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
