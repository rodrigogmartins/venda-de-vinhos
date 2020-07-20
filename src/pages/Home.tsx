import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";
import { Wine } from "../interfaces/Wine";
import {
  Container,
  Table,
  Tr,
  Th,
  Title,
  ListContainer,
  PageTitle,
} from "../components/CustomersTable";
import { PurchasesStats } from "../classes/PurchasesStats";
import { WinesStats } from "../classes/WinesStats";

const Home: React.FC = () => {
  let biggestSinglePurchaseCustomer: Customer;
  let topFiveSaleWines: Wine[];
  const customersApiEndpoint = process.env.REACT_APP_ENDPOINT_USER || "";
  const historicsApiEndpoint = process.env.REACT_APP_ENDPOINT_HISTORIC || "";
  const customers = useFetch<Customer[]>(customersApiEndpoint).data;
  const purchasesHistorics = useFetch<Historic[]>(historicsApiEndpoint).data;

  if (!customers && !purchasesHistorics) {
    return <p>Carregando...</p>;
  } else {
    const purchasesStats = new PurchasesStats(customers, purchasesHistorics);
    const winesStats = new WinesStats(purchasesHistorics);

    biggestSinglePurchaseCustomer = purchasesStats.getBiggestSinglePurchaseCustomersOfYear(
      "2016"
    );

    topFiveSaleWines = winesStats.getTopSaleWines();
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
      <ListContainer>
        <Title>Top vinhos mais vendidos</Title>
        <Table>
          <thead>
            <tr>
              <Th>Produto</Th>
              <Th>Categoria</Th>
              <Th>Safra</Th>
              <Th>Total vendas</Th>
            </tr>
          </thead>
          {topFiveSaleWines?.map((wine: Wine, index: number) => (
            <Tr key={index}>
              <Th> {wine.produto}</Th>
              <Th> {wine.categoria}</Th>
              <Th> {wine.safra}</Th>
              <Th> {wine.quantidadeVendas} un.</Th>
            </Tr>
          ))}
        </Table>
      </ListContainer>
    </Container>
  );
};

export default Home;
