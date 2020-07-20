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
      purchaseHistoric.itens.forEach((purchaseItem) => {
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
    const topSaledItems = this.getSaledItemsOnDescOrder(itemsObject).slice(
      0,
      wantedItems
    );

    topSaledItems.forEach((itemKey) => {
      items.push(this.parseItemStringToObject(itemKey, itemsObject));
    });

    return items;
  };

  getSaledItemsOnDescOrder = (items: any) => {
    return Object.keys(items).sort((a, b) => items[b] - items[a]);
  };

  parseItemStringToObject = (itemKey: string, itemsObject: any) => {
    const item = itemKey.split("**");

    return {
      produto: item[0],
      variedade: item[1],
      pais: item[2],
      categoria: item[3],
      safra: item[4],
      preco: parseFloat(item[5]),
      quantidadeVendas: itemsObject[itemKey],
    };
  };
}
