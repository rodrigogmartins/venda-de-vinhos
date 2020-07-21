import { PurchasesStats } from "../../src/classes/PurchasesStats";

describe("Tests getBiggestSinglePurchaseCustomersOfYear()", () => {
  it("Shold return object type customer with the biggest purchase customer of the year", () => {
    const customers = [
      {
        id: 1,
        nome: "Vinicius",
        cpf: "000.000.000-01",
      },
      {
        id: 2,
        nome: "Marcos",
        cpf: "000.000.000-02",
      },
    ];

    const purchasesHistorics = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-01-2015",
        cliente: "0000.000.000.07",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-10-2018",
        cliente: "0000.000.000.05",
        itens: [],
        valorTotal: 278,
      },
    ];

    const purchasesStats = new PurchasesStats(customers, purchasesHistorics);

    expect(
      purchasesStats.getBiggestSinglePurchaseCustomersOfYear("2015")
    ).toStrictEqual({
      cpf: "000.000.000-02",
      id: 2,
      itensComprados: 1,
      nome: "Marcos",
    });
  });
  it("Should return false", () => {
    const purchasesStats = new PurchasesStats([], []);

    expect(
      purchasesStats.getBiggestSinglePurchaseCustomersOfYear("2015")
    ).toStrictEqual(false);
  });
});

describe("Tests getPurchasesHistoricsOfYear()", () => {
  it("Shold return arry with purchases of the year", () => {
    const purchasesHistorics = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-01-2015",
        cliente: "0000.000.000.07",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-10-2018",
        cliente: "0000.000.000.05",
        itens: [],
        valorTotal: 278,
      },
    ];

    const purchasesStats = new PurchasesStats([], purchasesHistorics);

    expect(purchasesStats.getPurchasesHistoricsOfYear("2015")).toStrictEqual([
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-01-2015",
        cliente: "0000.000.000.07",
        itens: [],
        valorTotal: 278,
      },
    ]);
  });

  it("Should return empty array", () => {
    const purchasesStats = new PurchasesStats([], []);

    expect(purchasesStats.getPurchasesHistoricsOfYear("2015")).toStrictEqual(
      []
    );
  });
});

describe("Tests getBiggestSinglePurchaseOfYear()", () => {
  it("Should return object with the items quantity and the biggest single purchase", () => {
    const purchasesHistoricsOfYear = [
      {
        codigo: "4a7c9be2-5231-4dff-b8e7-9a639286726e",
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
          {
            produto: "Casa Silva Reserva",
            variedade: "Sauvignon Blanc",
            pais: "Chile",
            categoria: "Branco",
            safra: "2015",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        codigo: "4a7c9be2-5231-4dff-b8e7-9a639286726e",
        data: "22-10-2015",
        cliente: "0000.000.000.05",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
          {
            produto: "Casa Silva Reserva",
            variedade: "Sauvignon Blanc",
            pais: "Chile",
            categoria: "Branco",
            safra: "2015",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
    ];

    const purchasesStats = new PurchasesStats();

    expect(
      purchasesStats.getBiggestSinglePurchaseOfYear(purchasesHistoricsOfYear)
    ).toStrictEqual({
      biggestSinglePurchase: 3,
      biggestSinglePurchaseCustomerReference: "0000.000.000.02",
    });
  });

  it("Should return object with 0 and empty string", () => {
    const purchasesHistoricsOfYear = [];
    const purchasesStats = new PurchasesStats();

    expect(
      purchasesStats.getBiggestSinglePurchaseOfYear(purchasesHistoricsOfYear)
    ).toStrictEqual({
      biggestSinglePurchase: 0,
      biggestSinglePurchaseCustomerReference: "",
    });
  });
});

describe("Tests getPurchaseCustomer()", () => {
  it("Same length. Should return true", () => {
    const customers = [
      {
        id: 1,
        nome: "Vinicius",
        cpf: "000.000.000-01",
      },
      {
        id: 2,
        nome: "Marcos",
        cpf: "000.000.000-02",
      },
    ];
    const purchasesStats = new PurchasesStats(customers);
    const customerReference = "000.000.000.01";

    expect(purchasesStats.getPurchaseCustomer(customerReference)).toStrictEqual(
      [
        {
          id: 1,
          nome: "Vinicius",
          cpf: "000.000.000-01",
        },
      ]
    );
  });

  it("One zero on left more. Should return true", () => {
    const customers = [
      {
        id: 1,
        nome: "Vinicius",
        cpf: "000.000.000-01",
      },
      {
        id: 2,
        nome: "Marcos",
        cpf: "000.000.000-02",
      },
    ];
    const purchasesStats = new PurchasesStats(customers);
    const customerReference = "0000.000.000.01";

    expect(purchasesStats.getPurchaseCustomer(customerReference)).toStrictEqual(
      [
        {
          id: 1,
          nome: "Vinicius",
          cpf: "000.000.000-01",
        },
      ]
    );
  });

  it("Should return false", () => {
    const purchasesStats = new PurchasesStats();
    const customerReference = "000.000.000.01";

    expect(purchasesStats.getPurchaseCustomer(customerReference)).toStrictEqual(
      []
    );
  });
});

describe("Tests isCustomerPurchases()", () => {
  it("Same length. Should return true", () => {
    const purchasesStats = new PurchasesStats();
    const cpf = "000.000.000-01";
    const customer = "000.000.000.01";

    expect(purchasesStats.isCustomerPurchases(cpf, customer)).toStrictEqual(
      true
    );
  });

  it("One zero on left more. Should return true", () => {
    const purchasesStats = new PurchasesStats();
    const cpf = "000.000.000-01";
    const customer = "0000.000.000.01";

    expect(purchasesStats.isCustomerPurchases(cpf, customer)).toStrictEqual(
      true
    );
  });

  it("Should return false", () => {
    const purchasesStats = new PurchasesStats();
    const cpf = "";
    const customer = "0000.000.000.01";

    expect(purchasesStats.isCustomerPurchases(cpf, customer)).toStrictEqual(
      false
    );
  });
});

describe("Tests customerCpfToPurchaseReference()", () => {
  it("Should return cpf separate by dots", () => {
    const purchasesStats = new PurchasesStats();
    const cpf = "000.000.000-01";

    expect(purchasesStats.customerCpfToPurchaseReference(cpf)).toStrictEqual(
      "000.000.000.01"
    );
  });

  it("Should return cpf separate by dots", () => {
    const purchasesStats = new PurchasesStats();
    const cpf = "000.000.000.01";

    expect(purchasesStats.customerCpfToPurchaseReference(cpf)).toStrictEqual(
      "000.000.000.01"
    );
  });

  it("Should return empty string", () => {
    const purchasesStats = new PurchasesStats();
    const cpf = "";

    expect(purchasesStats.customerCpfToPurchaseReference(cpf)).toStrictEqual(
      ""
    );
  });
});
