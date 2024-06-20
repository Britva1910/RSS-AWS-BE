const { handler } = require("../lambda-functions/getProductById");
const { products } = require("../lambda-functions/products");

jest.mock("../lambda-functions/products", () => ({
  products: [],
}));

describe("Get product by ID - getProductById", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should return 200 and the product when a valid ID is provided", async () => {
    const mockProducts = [{ id: "1", title: "Product 1", price: 100 }];

    require("../lambda-functions/products").products = mockProducts;

    const event = {
      pathParameters: {
        id: "1",
      },
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(
      JSON.stringify({ id: "1", title: "Product 1", price: 100 })
    );
  });

  test("should return 400 if product is not found", async () => {
    require("../lambda-functions/products").products = [];

    const event = {
      pathParameters: {
        id: "1",
      },
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(response.headers["Content-Type"]).toBe("application/json");
    expect(response.body).toBe(
      JSON.stringify({ message: "Products data doesn't exist" })
    );
  });

  test("should return 400 if no products data exists", async () => {
    require("../lambda-functions/products").products = [];

    const event = {
      pathParameters: {
        id: "",
      },
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(response.headers["Content-Type"]).toBe("application/json");
    expect(response.body).toBe(
      JSON.stringify({ message: "Products data doesn't exist" })
    );
  });
});
