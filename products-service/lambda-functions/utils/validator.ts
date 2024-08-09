export const validateProductInput = (product: any): boolean => {
  if (!product || typeof product !== "object") {
    console.log("is object");
    return false;
  }
  if (typeof product.title !== "string" || product.title.length === 0) {
    console.log("title");
    return false;
  }

  if (
    typeof product.description !== "string" ||
    product.description.length === 0
  ) {
    console.log("description");
    return false;
  }

  if (typeof product.price !== "number" || product.price < 0) {
    console.log("price");
    return false;
  }

  if (typeof product.count !== "number" || product.count < 0) {
    console.log("count");
    return false;
  }

  return true;
};
