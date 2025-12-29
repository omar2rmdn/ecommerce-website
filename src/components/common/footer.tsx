import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5 rounded">
      <Container>
        <Row>
          <Col className="text-center text-secondary">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Web Store. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
