class Products {
  async getCategoriesId() {}
  async getProductByID() {
    return {
      name: "Test",
      masterVariant: { images: "Test" },
      variants: ["Test"],
    };
  }
  getProducts() {
    return {
      body: {
        results: [
          {
            name: "Test",
            masterVariant: { images: "Test" },
            variants: ["Test"],
          },
        ],
      },
    };
  }
}
export default Products;
