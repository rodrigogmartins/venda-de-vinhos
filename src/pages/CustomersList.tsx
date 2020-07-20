import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";

const CustomerList: React.FC = () => {
  let orderedCustomers: Customer[] = [];
  let biggestSinglePurchaseCustomers: Customer;
  let loyalCustomers: Customer[] = [];
  const customersApiEndpoint = process.env.REACT_APP_ENDPOINT_USER || "";
  const historicsApiEndpoint = process.env.REACT_APP_ENDPOINT_HISTORIC || "";
  const customers = useFetch<Customer[]>(customersApiEndpoint).data;
  const purchasesHistorics = useFetch<Historic[]>(historicsApiEndpoint).data;

  if (!customers && !purchasesHistorics) {
    return <p>Carregando...</p>;
  } else {
    orderedCustomers = getCustomersOrderedByHighestTotalPurchaseValue(
      customers,
      purchasesHistorics
    );

    loyalCustomers = getLoyalCustomers(customers, purchasesHistorics);
    biggestSinglePurchaseCustomers = getBiggestSinglePurchaseCustomers2016(
      customers,
      purchasesHistorics
    );
  }

  return (
    <div>
      <div>
        <h2>#1 List Desc</h2>
        <ul>
          {orderedCustomers?.map((customer) => (
            <li key={customer.id}>
              <Link to={`/customer/${customer.id}`}>
                {customer.nome} - {customer.cpf} - R${" "}
                {customer.gastoTotal.toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>#2 Biggest Single Purchase (2016)</h2>
        <ul>
          {
            <li key={biggestSinglePurchaseCustomers.id}>
              <Link to={`/customer/${biggestSinglePurchaseCustomers.id}`}>
                {biggestSinglePurchaseCustomers.nome} -{" "}
                {biggestSinglePurchaseCustomers.cpf} -{" "}
                {biggestSinglePurchaseCustomers.itensComprados}
              </Link>
            </li>
          }
        </ul>
      </div>
      <div>
        <h2>#3 Loyal Customers</h2>
        <ul>
          {loyalCustomers?.map((customer) => (
            <li key={customer.id}>
              <Link to={`/customer/${customer.id}`}>
                {customer.nome} - {customer.cpf} - {customer.itensComprados}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getBiggestSinglePurchaseCustomers2016 = (
  customers: Customer[] = [],
  purchasesHistorics: Historic[] = []
): Customer => {
  const purchasesHistorics2016 = getPurchasesHistorics2016(purchasesHistorics);

  let biggestSinglePurchase = 0;
  let biggestSinglePurchaseCustomerReference = "";

  purchasesHistorics2016.forEach((historic: Historic) => {
    if (historic.itens.length > biggestSinglePurchase) {
      biggestSinglePurchase = historic.itens.length;
      biggestSinglePurchaseCustomerReference = historic.cliente;
    }
  });

  const biggestSinglePurchaseCustomer = customers.filter((customer) => {
    return isCustomerPurchases(
      customer.cpf,
      biggestSinglePurchaseCustomerReference
    );
  });

  return {
    ...biggestSinglePurchaseCustomer[0],
    itensComprados: biggestSinglePurchase,
  };
};

const getPurchasesHistorics2016 = (purchasesHistorics: Historic[] = []) => {
  return purchasesHistorics.filter(
    (purchaseHistoric) => purchaseHistoric.data.indexOf("2016") > -1
  );
};

const getLoyalCustomers = (
  customers: Customer[] = [],
  purchasesHistorics: Historic[] = []
): Customer[] => {
  const customersWithTotalItemsPurchased: Customer[] = [];

  customers.forEach((customer) => {
    const customerTotalItemsPurchased = getTotalItemsPurchased(
      customer,
      purchasesHistorics
    );

    customersWithTotalItemsPurchased.push({
      ...customer,
      itensComprados: customerTotalItemsPurchased,
    });
  });

  const mostLoyalCustomers = customersWithTotalItemsPurchased.sort(
    (a, b) => b.itensComprados - a.itensComprados
  );

  return mostLoyalCustomers.slice(0, 5);
};

const getCustomersOrderedByHighestTotalPurchaseValue = (
  customers: Customer[] = [],
  purchasesHistorics: Historic[] = []
): Customer[] => {
  const customersWithTotalSpend: Customer[] = [];

  customers.forEach((customer) => {
    const customerTotalPurchase = getTotalPurchaseValue(
      customer,
      purchasesHistorics
    );

    customersWithTotalSpend.push({
      ...customer,
      gastoTotal: customerTotalPurchase,
    });
  });

  return customersWithTotalSpend.sort((a, b) => b.gastoTotal - a.gastoTotal);
};

const getTotalItemsPurchased = (
  customer: Customer,
  purchasesHistorics: Historic[] = []
): number => {
  try {
    const customerPurchases = getCustomerPurchases(customer, purchasesHistorics)
      .length;

    return customerPurchases;
  } catch (error) {
    return 0;
  }
};

const getTotalPurchaseValue = (
  customer: Customer,
  purchasesHistorics: Historic[] = []
): number => {
  try {
    const customerPurchases = getCustomerPurchases(
      customer,
      purchasesHistorics
    );

    const purchasesValues = getTotalPurchasesValues(customerPurchases);

    return purchasesValues.reduce(
      (totalPurchaseValue: number = 0, purchaseValue: number) =>
        (totalPurchaseValue += purchaseValue)
    );
  } catch (error) {
    return 0;
  }
};

const getTotalPurchasesValues = (customerPurchases: Historic[]): number[] => {
  return customerPurchases.map(
    (customerPurchases) => customerPurchases.valorTotal
  );
};

const getCustomerPurchases = (
  customer: Customer,
  purchasesHistorics: Historic[] = []
): Historic[] => {
  return purchasesHistorics.filter((purchaseHistoric) =>
    isCustomerPurchases(customer.cpf, purchaseHistoric.cliente)
  );
};

const isCustomerPurchases = (cpf: string, cliente: string): boolean => {
  const normalizedCpf = customerCpfToPurchaseReference(cpf);

  return cliente.indexOf(normalizedCpf) > -1;
};

const customerCpfToPurchaseReference = (cpf: string): string => {
  return cpf?.replace("-", ".");
};

export default CustomerList;
