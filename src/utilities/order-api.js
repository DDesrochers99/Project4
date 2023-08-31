import sendRequest from "./send-request";

const BASE_URL = "/api/orders";

export function addItemToCart(productId) {
  return sendRequest(`${BASE_URL}/cart/products/${productId}`, "POST");
}

export function setProductQtyInCart(productId, newQty) {
  return sendRequest(`${BASE_URL}/cart/qty`, "PUT", { productId, newQty });
}

export function checkout(lineProducts) {
  return sendRequest(`${BASE_URL}/cart/checkout`, "POST", { lineProducts });
}

export function getOrderById(orderId) {
  return sendRequest(`${BASE_URL}/${orderId}`);
}

export function getOrderHistory() {
  return sendRequest(`${BASE_URL}/history`);
}
