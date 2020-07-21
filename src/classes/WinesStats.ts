import { Historic } from "../interfaces/Historic";
import { Wine } from "../interfaces/Wine";

export class WinesStats {
  purchasesHistorics: Historic[] = [];

  constructor(purchasesHistorics: Historic[] = []) {
    this.purchasesHistorics = purchasesHistorics;
  }

  getTopSaleWines = (wantedItems: number = 5): Wine[] => {
    let quantityOfEachItem: any = {};

    this.purchasesHistorics.map((purchaseHistoric) => {
      return purchaseHistoric.itens.forEach((purchaseItem) => {
        const item = purchaseItem;
        delete item.codigo;

        const itemReference: string = Object.values(item).join("**");

        if (!(itemReference in quantityOfEachItem)) {
          quantityOfEachItem[itemReference] = 1;
        } else {
          quantityOfEachItem[itemReference]++;
        }
      });
    });

    return this.getTopSaledItems(quantityOfEachItem, wantedItems);
  };

  getTopSaledItems = (itemsObject: any = {}, wantedItems: number) => {
    const items: Wine[] = [];
    const topSaledItems = this.getSaledItemsReferenceOnDescOrder(
      itemsObject
    ).slice(0, wantedItems);

    topSaledItems.forEach((itemKey) => {
      const salesQuantity = itemsObject[itemKey];
      itemKey += `**${salesQuantity}`;
      const itemObject = this.parseItemStringToObject(itemKey);

      if (itemObject) {
        items.push(itemObject);
      }
    });

    return items;
  };

  getSaledItemsReferenceOnDescOrder = (items: any) => {
    return Object.keys(items).sort((a, b) => items[b] - items[a]);
  };

  parseItemStringToObject = (itemKey: string) => {
    const itemProps = itemKey.split("**");
    const itemObject = {
      produto: itemProps[0],
      variedade: itemProps[1],
      pais: itemProps[2],
      categoria: itemProps[3],
      safra: itemProps[4],
      preco: parseFloat(itemProps[5]),
      quantidadeVendas: parseInt(itemProps[6]),
    };

    const objectFinelValues = Object.values(itemObject);

    for (const property of objectFinelValues) {
      if (!property) {
        return false;
      }

      if (typeof property === "number" && isNaN(property)) {
        return false;
      }
    }

    return itemObject;
  };
}
