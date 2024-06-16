const { handler } = require("../lambda-functions/getProductsList");
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

    products.length = 0;
    products.push(...mockProducts);

    const event = {
      pathParameters: {
        id: "1",
      },
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(response.headers["Content-Type"]).toBe("application/json");
    expect(response.body).toBe(
      JSON.stringify([{ id: "1", title: "Product 1", price: 100 }])
    );
  });

  test("should return 400 if product is not found", async () => {
    products.length = 0;

    const event = {
      pathParameters: {
        id: "1",
      },
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(response.headers["Content-Type"]).toBe("application/json");
    expect(response.body).toBe(
      JSON.stringify({ message: "Products not found" })
    );
  });

  test("should return 400 if no products data exists", async () => {
    products.length = 0;

    const event = {
      pathParameters: {
        id: "",
      },
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(response.headers["Content-Type"]).toBe("application/json");
    expect(response.body).toBe(
      JSON.stringify({ message: "Products not found" })
    );
  });
});
