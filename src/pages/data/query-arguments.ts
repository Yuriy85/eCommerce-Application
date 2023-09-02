import { IParamsQueryArgs, IParamsCategories } from "../../core/types/types";
import Products from "../../controller/products";

class QueryArgs {
  products: Products;
  constructor() {
    this.products = new Products();
  }
  getQueryArgs(text?: string): IParamsQueryArgs {
    const queryArgs: IParamsQueryArgs = {
      productsAll: {
        limit: 21,
      },
      filterLactoseYes: {
        limit: 21,
        filter: [`variants.attributes.lactose:"yes"`],
      },
      filterLactoseNo: {
        limit: 21,
        filter: [`variants.attributes.lactose:"no"`],
      },
      sortAlphabetically: {
        limit: 21,
        sort: [`name.en-US asc`],
      },
      sortAscending: {
        limit: 21,
        sort: [`name.en-US asc`],
      },
      sortDescending: {
        limit: 21,
        sort: [`name.en-US desc`],
      },
      searchText: {
        limit: 21,
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
