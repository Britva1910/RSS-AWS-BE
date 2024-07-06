type Product = {
  id: string;
  title: string;
  price: number;
  count: number;
  description: string;
};

export function getMessage(product: Product): string {
  const header = "Product Inventory Update:\n";
  const productDetails = `
    Product ID: ${product.id}
    - Title: ${product.title}
    - Price: $${product.price}
    - Description: ${product.description}
    - Initial Stock Count: ${product.count}\n`;

  const footer = "Total Products Added: 1";

  return `${header}\n${productDetails}\n${footer}`;
}
