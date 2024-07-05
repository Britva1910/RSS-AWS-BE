export const validateProductInput = (product: any): boolean => {
  if (!product || typeof product !== "object") {
    return false;
  }
  if (typeof product.title !== "string" || product.title.length === 0) {
    return false;
  }

  if (
    typeof product.description !== "string" ||
    product.description.length === 0
  ) {
    return false;
  }

  if (typeof product.price !== "number" || product.price < 0) {
    return false;
  }

  if (typeof product.count !== "number" || product.count < 0) {
    return false;
  }

  return true;
};
