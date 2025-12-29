import { getTotalQuantity } from "@/store/cart/selectors";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { FaLeaf, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function Header() {
  const totalQuantity = useSelector(getTotalQuantity);

  return (
    <>
      <div className="py-4 border-bottom">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center text-dark text-decoration-none">
            <FaLeaf size={24} className="me-2 text-success" />
            <span className="fs-5 fw-bold">Web Store</span>
          </div>

          {/* Cart Icon */}
          <div className="position-relative" style={{ cursor: "pointer" }}>
            <FaShoppingCart size={24} color="#333" />
            <Badge
              bg="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: "0.65rem" }}
            >
              {totalQuantity}
            </Badge>
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
}
