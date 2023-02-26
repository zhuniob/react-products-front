import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import ListProduct from "./ListProduct";
import FormProduct from './FormProduct';

function App() {
  const [pro, setPro] = useState([]);

  const cargaPro = () => {
    axios.get("https://react-products-back-production.up.railway.app/api/products/").then(({ data }) => setPro(data));
  };

  useEffect(() => {
    cargaPro();
    const interval = setInterval(() => cargaPro(), 1 * 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <ListProduct productos={pro} />
          </Col>

          <Col md={6}>
            <FormProduct />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
