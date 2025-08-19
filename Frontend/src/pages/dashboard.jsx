import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = "http://localhost:3000";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [checkoutStage, setCheckoutStage] = useState("shopping");
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // -------------------------
  // FETCH USER
  // -------------------------
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) throw new Error("No token in localStorage");
      try {
        const res = await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
      } catch (err) {
        console.error("Error fetching /users/me:", err.response?.data || err.message);
        throw err;
      }
    },
    onSuccess: (data) => {
      console.log("User fetched successfully:", data);
      const unconfirmedOrder = data.orders.find((o) => !o.confirmed);
      if (unconfirmedOrder) {
        setCart(unconfirmedOrder.orderItems.map((oi) => oi.item));
      }
    },
  });

  // -------------------------
  // SEARCH
  // -------------------------
  const {
    data: searchResults,
    refetch: refetchSearch,
    isFetching: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      console.log("🔍 Searching for:", searchQuery);
      const res = await axios.get(`${API}/items/search?q=${searchQuery}`);
      return res.data;
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      console.warn("⚠️ Search query is empty");
      return;
    }
    refetchSearch();
  };

  // -------------------------
  // ADD / REMOVE CART
  // -------------------------
  const addMutation = useMutation({
    mutationFn: async (itemId) => {
      console.log("➕ Adding item to cart:", itemId);
      const res = await axios.post(
        `${API}/orders/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.orderItem.item;
    },
    onSuccess: (item) => {
      console.log("✅ Item added to cart:", item);
      setCart((prev) => [...prev, item]);
    },
    onError: (err) => {
      console.error("❌ Error adding item:", err.response?.data || err.message);
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId) => {
      console.log("➖ Removing item from cart:", itemId);
      await axios.delete(`${API}/orders/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return itemId;
    },
    onSuccess: (itemId) => {
      console.log("✅ Item removed:", itemId);
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    },
    onError: (err) => {
      console.error("❌ Error removing item:", err.response?.data || err.message);
    },
  });

  // -------------------------
  // CHECKOUT
  // -------------------------
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      console.log("🛒 Checkout started:", { pickupDate, selectedStore });
      const res = await axios.post(
        `${API}/orders/checkout`,
        { pickupDate, storeId: selectedStore },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("✅ Checkout success:", data);
      setOrderConfirmation(data);
      setCheckoutStage("confirmation");
      setCart([]);
    },
    onError: (err) => {
      console.error("❌ Checkout failed:", err.response?.data || err.message);
    },
  });

  // -------------------------
  // RENDER
  // -------------------------
  if (userLoading) return <p>Loading user...</p>;
  if (userError) return <p style={{ color: "red" }}>Error loading user: {userError.message}</p>;

  return (
    <div>
      <h2>Welcome, {user?.fullName || user?.email || "User"}</h2>

      {/* Debug JSON Dump */}
      <details style={{ margin: "1rem 0" }}>
        <summary>🛠 Debug User Data</summary>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </details>

      {checkoutStage === "shopping" && (
        <>
          <div>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div>
            <h3>Search Results</h3>
            {searchLoading ? (
              <p>Searching...</p>
            ) : searchError ? (
              <p style={{ color: "red" }}>Error: {searchError.message}</p>
            ) : !searchResults?.length ? (
              <p>No items found.</p>
            ) : (
              <ul>
                {searchResults.map((item) => (
                  <li key={item.id}>
                    {item.name} ({item.store?.name || "Unknown store"})
                    <button onClick={() => addMutation.mutate(item.id)}>Add to Cart</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name}
                    <button onClick={() => removeMutation.mutate(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <button onClick={() => setCheckoutStage("checkout")}>Proceed to Checkout</button>
          )}
        </>
      )}

      {checkoutStage === "checkout" && (
        <div>
          <h3>Checkout</h3>
          <label>
            Pickup Date:
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </label>
          <label>
            Store ID:
            <input
              type="number"
              value={selectedStore || ""}
              onChange={(e) => setSelectedStore(Number(e.target.value))}
            />
          </label>
          <button onClick={() => checkoutMutation.mutate()}>Confirm Order</button>
        </div>
      )}

      {checkoutStage === "confirmation" && orderConfirmation && (
        <div>
          <h3>Order Confirmed!</h3>
          <p>Pickup Date: {orderConfirmation.pickupDate}</p>
          <p>Store ID: {orderConfirmation.storeId}</p>
          <ul>
            {orderConfirmation.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
