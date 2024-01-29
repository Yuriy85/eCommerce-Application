import { IParamsQueryArgs, IParamsCategories } from "../../core/types/types";
import Products from "../../controller/products";

class QueryArgs {
  products: Products;
  constructor() {
    this.products = new Products();
  }

  async getQueryArgs(index: number, offset: number, text?: string) {
    const id: string = await this.products.getCategoriesId(index);
    const limit: number = 6;

    const queryArgs: IParamsQueryArgs = {
      productsAll: {
        limit: limit,
        offset: offset,
        filter: [`categories.id:"${id}"`],
      },
      filterLactoseYes: {
        limit: limit,
        offset: offset,
        filter: [`categories.id:"${id}"`, `variants.attributes.lactose:"yes"`],
      },
      filterLactoseNo: {
        limit: limit,
        offset: offset,
        filter: [`categories.id:"${id}"`, `variants.attributes.lactose:"no"`],
      },
      sortAlphabetically: {
        limit: limit,
        offset: offset,
        sort: [`name.en-US asc`],
        filter: [`categories.id:"${id}"`],
      },
      sortAscending: {
        limit: limit,
        offset: offset,
        sort: [`price asc`],
        filter: [`categories.id:"${id}"`],
      },
      sortDescending: {
        limit: limit,
        offset: offset,
        sort: [`price desc`],
        filter: [`categories.id:"${id}"`],
      },
      searchText: {
        limit: limit,
        offset: offset,
        filter: [`categories.id:"${id}"`],
        ["text.en-US"]: `"${text}"`,
        fuzzy: true,
      },
    };
    return queryArgs;
  }
  async getQueryArgsCategories(
    index: number,
    offset: number,
  ): Promise<IParamsCategories> {
    const id: string = await this.products.getCategoriesId(index);
    const categories: IParamsCategories = {
      categoriesSushi: {
        limit: 6,
        filter: [`categories.id:"${id}"`],
        offset: offset,
      },
    };
    return categories;
  }
}

export default QueryArgs;
