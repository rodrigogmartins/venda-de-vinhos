import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";
import {
  Container,
  Table,
  Tr,
  Th,
  Title,
  ListContainer,
  PageTitle,
} from "../components/CustomersTable";
import { PurchasesStats } from "../classes/PurchaseStats";

const Home: React.FC = () => {
  let biggestSinglePurchaseCustomer: Customer;
  const customersApiEndpoint = process.env.REACT_APP_ENDPOINT_USER || "";
  const historicsApiEndpoint = process.env.REACT_APP_ENDPOINT_HISTORIC || "";
  const customers = useFetch<Customer[]>(customersApiEndpoint).data;
  const purchasesHistorics = useFetch<Historic[]>(historicsApiEndpoint).data;

  if (!customers && !purchasesHistorics) {
    return <p>Carregando...</p>;
  } else {
    const purchasesStats = new PurchasesStats(customers, purchasesHistorics);

    biggestSinglePurchaseCustomer = purchasesStats.getBiggestSinglePurchaseCustomersOfYear(
      "2016"
    );
  }

  return (
    <Container>
      <Link to={"/customers-stats"}>Estatísticas dos clientes</Link>
      <ListContainer>
        <PageTitle>Titulo</PageTitle>
        <Title>Maior compra única em 2016</Title>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Itens</Th>
            </tr>
          </thead>
          <Tr key={biggestSinglePurchaseCustomer.id}>
            <Th> {biggestSinglePurchaseCustomer.nome}</Th>
            <Th> {biggestSinglePurchaseCustomer.cpf}</Th>
            <Th> {biggestSinglePurchaseCustomer.itensComprados} un.</Th>
          </Tr>
        </Table>
      </ListContainer>
    </Container>
  );
};

export default Home;
