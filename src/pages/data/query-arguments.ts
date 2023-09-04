import { IParamsQueryArgs, IParamsCategories } from "../../core/types/types";
import Products from "../../controller/products";

class QueryArgs {
  products: Products;
  constructor() {
    this.products = new Products();
  }

  async getQueryArgs(index: number, text?: string) {
    const id: string = await this.products.getCategoriesId(index);

    const queryArgs: IParamsQueryArgs = {
      productsAll: {
        limit: 21,
        filter: [`categories.id:"${id}"`],
      },
      filterLactoseYes: {
        limit: 21,
        filter: [`categories.id:"${id}"`, `variants.attributes.lactose:"yes"`],
      },
      filterLactoseNo: {
        limit: 21,
        filter: [`categories.id:"${id}"`, `variants.attributes.lactose:"no"`],
      },
      sortAlphabetically: {
        limit: 21,
        sort: [`name.en-US asc`],
        filter: [`categories.id:"${id}"`],
      },
      sortAscending: {
        limit: 21,
        sort: [`price asc`],
        filter: [`categories.id:"${id}"`],
      },
      sortDescending: {
        limit: 21,
        sort: [`price desc`],
        filter: [`categories.id:"${id}"`],
      },
      searchText: {
        limit: 21,
        filter: [`categories.id:"${id}"`],
        ["text.en-US"]: `"${text}"`,
        fuzzy: true,
      },
    };
    return queryArgs;
  }
  async getQueryArgsCategories(index: number): Promise<IParamsCategories> {
    const id: string = await this.products.getCategoriesId(index);
    const categories: IParamsCategories = {
      categoriesSushi: {
        limit: 21,
        filter: [`categories.id:"${id}"`],
      },
    };
    return categories;
  }
}

export default QueryArgs;
