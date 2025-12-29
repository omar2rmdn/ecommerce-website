import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import Header from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Outlet } from "react-router";

const { mainContainer, wrapper } = styles;
export default function MainLayout() {
  return (
    <Container className={mainContainer}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}
