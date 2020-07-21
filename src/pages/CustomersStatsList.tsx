import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";
import { CustomersStats } from "../classes/CustomersStats";
import {
  Container,
  Table,
  Tr,
  Th,
  Title,
  ListContainer,
  PageTitle,
} from "../components/CustomersTable";

const CustomersStatsList: React.FC = () => {
  let orderedCustomers: Customer[] = [];
  let loyalCustomers: Customer[] = [];
  const customersApiEndpoint = process.env.REACT_APP_ENDPOINT_USER || "";
  const historicsApiEndpoint = process.env.REACT_APP_ENDPOINT_HISTORIC || "";
  const customers = useFetch<Customer[]>(customersApiEndpoint).data;
  const purchasesHistorics = useFetch<Historic[]>(historicsApiEndpoint).data;

  if (!customers && !purchasesHistorics) {
    return <p>Carregando...</p>;
  } else {
    const customersStats = new CustomersStats(customers, purchasesHistorics);
    orderedCustomers = customersStats.getCustomersOrderedByHighestTotalPurchaseValue();
    loyalCustomers = customersStats.getLoyalCustomers();
  }

  const formatMoney = (value: number) => {
    return `R$ ${value.toFixed(2)}`.replace(".", ",");
  };

  return (
    <Container>
      <Link to={"/"}>Home</Link>
      <ListContainer>
        <PageTitle> Estatisticas dos clientes </PageTitle>
        <Title>Clientes ordenados pelo maior valor total em compras.</Title>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Total Gasto</Th>
            </tr>
          </thead>
          {orderedCustomers?.map((customer) => (
            <Tr key={customer.id}>
              <Th> {customer.nome}</Th>
              <Th> {customer.cpf}</Th>
              <Th> {formatMoney(customer.gastoTotal)} </Th>
            </Tr>
          ))}
        </Table>
      </ListContainer>
      <ListContainer>
        <Title>Clientes mais fiéis.</Title>
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th title="Total de itens comprados">Total itens comp.</Th>
            </tr>
          </thead>
          {loyalCustomers?.map((customer) => (
            <Tr key={customer.id}>
              <Th> {customer.nome}</Th>
              <Th> {customer.cpf}</Th>
              <Th> {customer.itensComprados} un.</Th>
            </Tr>
          ))}
        </Table>
      </ListContainer>
    </Container>
  );
};

export default CustomersStatsList;
