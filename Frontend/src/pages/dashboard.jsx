import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce"; // We'll use lodash debounce

const API = "http://localhost:3000"; // Backend URL

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  // -------------------------
  // LOCAL STATE
  // -------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [checkoutStage, setCheckoutStage] = useState("shopping");
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [discountFilter, setDiscountFilter] = useState(null); // 15, 30, 100 for free

  // -------------------------
  // FETCH USER PROFILE
  // -------------------------
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) throw new Error("No token in localStorage");
      const res = await axios.get(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: (data) => {
      const unconfirmedOrder = data.orders?.find((o) => !o.confirmed);
      if (unconfirmedOrder) {
        setCart(unconfirmedOrder.orderItems.map((oi) => oi.item));
      }
    },
  });

  // -------------------------
  // SEARCH ITEMS (DEBOUNCED)
  // -------------------------
  const {
    data: searchResults,
    refetch: refetchSearch,
    isFetching: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["search", searchQuery, discountFilter],
    queryFn: async () => {
      let url = `${API}/items/search?q=${encodeURIComponent(searchQuery)}`;
      if (discountFilter) url += `&discount=${discountFilter}`;
      const res = await axios.get(url);
      return res.data;
    },
    enabled: false, // manually refetch
  });

  // Debounce the search input so API isn’t called on every keystroke
  const debouncedSearch = debounce(() => {
    if (searchQuery.trim() !== "") refetchSearch();
  }, 400);

  useEffect(() => {
    debouncedSearch();
    return debouncedSearch.cancel; // cleanup
  }, [searchQuery, discountFilter]);

  // -------------------------
  // ADD & REMOVE ITEM MUTATIONS
  // -------------------------
  const addMutation = useMutation({
    mutationFn: async (itemId) => {
      const res = await axios.post(
        `${API}/orders/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.orderItem.item;
    },
    onSuccess: (item) => setCart((prev) => [...prev, item]),
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId) => {
      await axios.delete(`${API}/orders/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return itemId;
    },
    onSuccess: (itemId) =>
      setCart((prev) => prev.filter((i) => i.id !== itemId)),
  });

  // -------------------------
  // CHECKOUT
  // -------------------------
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${API}/orders/checkout`,
        { pickupDate, storeId: selectedStore },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: (data) => {
      setOrderConfirmation(data);
      setCheckoutStage("confirmation");
      setCart([]);
    },
  });

  // -------------------------
  // RENDER
  // -------------------------
  if (userLoading) return <p>Loading user...</p>;
  if (userError)
    return <p style={{ color: "red" }}>Error loading user: {userError.message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Welcome, {user?.fullName || user?.email || "User"}</h2>

      {/* -------------------- SEARCH & FILTER -------------------- */}
      {checkoutStage === "shopping" && (
        <>
          <div>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Discount Filter Buttons */}
            <button onClick={() => setDiscountFilter(15)}>15% Off</button>
            <button onClick={() => setDiscountFilter(30)}>30% Off</button>
            <button onClick={() => setDiscountFilter(100)}>FREE</button>
            <button onClick={() => setDiscountFilter(null)}>Clear Filter</button>
          </div>

          {/* Search Results Table */}
          <div>
            <h3>Search Results</h3>
            {searchLoading ? (
              <p>Searching...</p>
            ) : searchError ? (
              <p style={{ color: "red" }}>Error: {searchError.message}</p>
            ) : !searchResults?.length ? (
              <p>No items found.</p>
            ) : (
              <table border={1} cellPadding={5} style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Store</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.store?.name || "Unknown"}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.discount || 0}%</td>
                      <td>
                        <button onClick={() => addMutation.mutate(item.id)}>
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Cart */}
          <div>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price.toFixed(2)}
                    <button onClick={() => removeMutation.mutate(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <button onClick={() => setCheckoutStage("checkout")}>
              Proceed to Checkout
            </button>
          )}
        </>
      )}

      {/* -------------------- CHECKOUT -------------------- */}
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

      {/* -------------------- CONFIRMATION -------------------- */}
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
