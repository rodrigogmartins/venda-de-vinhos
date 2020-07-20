import React from "react";
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
} from "../components/Container";

const CustomerList: React.FC = () => {
  let orderedCustomers: Customer[] = [];
  let loyalCustomers: Customer[] = [];
  /* 
  let biggestSinglePurchaseCustomers: Customer;
  */
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

    /*biggestSinglePurchaseCustomers = getBiggestSinglePurchaseCustomers2016(
      customers,
      purchasesHistorics
    );*/

    //getRecommendedWines(purchasesHistorics);
  }

  return (
    <Container>
      <ListContainer>
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
              <Th> R$ {customer.gastoTotal.toFixed(2)}</Th>
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
              <Th> {customer.itensComprados}</Th>
            </Tr>
          ))}
        </Table>
      </ListContainer>
    </Container>
  );
};

export default CustomerList;
