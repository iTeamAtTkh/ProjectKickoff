//frontend/pages/dashboard.jsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce"; // use lodash debounce

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
      // If user has an unconfirmed order (cart), load its items
      const unconfirmedOrder = data.orders?.find((o) => !o.confirmed);
      if (unconfirmedOrder) {
        setCart(unconfirmedOrder.orderItems.map((oi) => oi.item));
      }
    },
  });

  // -------------------------
  // FETCH STORES
  // -------------------------
  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await axios.get(`${API}/stores`);
      return res.data;
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
      return res.data; // return entire updated order object
    },
    onSuccess: (updatedOrder) => {
      setCart(updatedOrder.orderItems.map((oi) => oi.item)); // reset cart from backend
    },
  });

  // -------------------------
  // REMOVE ITEMS FROM CART
  // -------------------------
  const removeMutation = useMutation({
    mutationFn: async (itemId) => {
      const res = await axios.delete(`${API}/orders/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // Entire updated order object
    },
    onSuccess: (updatedOrder) => {
      setCart(updatedOrder.orderItems.map((oi) => oi.item)); // Sync cart with backend
    },
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
      setOrderConfirmation(data); //save order confirmation details
      setCheckoutStage("confirmation");
      setCart([]);  // Clear cart on checkout 
    },
  });

  // -------------------------
  // RENDER
  // -------------------------
  if (userLoading) return <p>Loading user...</p>;
  if (userError)
    return (
      <p style={{ color: "red" }}>Error loading user: {userError.message}</p>
    );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Welcome, {user?.fullName || user?.email || "User"}</h2>

      {/* -------------------- SHOPPING STAGE -------------------- */}
      {checkoutStage === "shopping" && (
        <>
         {/* -------------------- SEARCH & FILTER -------------------- */}
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginRight: "1rem", padding: "0.25rem" }}
            />

            {/* DISCOUNT FILTER BUTTONS */}
            <button onClick={() => setDiscountFilter(15)}>15% Off</button>
            <button onClick={() => setDiscountFilter(30)}>30% Off</button>
            <button onClick={() => setDiscountFilter(100)}>FREE</button>
            <button onClick={() => setDiscountFilter(null)}>Clear Discount Filter</button>
          </div>

          {/* SEARCH RESULTS */}
          <div>
            <h3>Search Results</h3> 
            {searchLoading ? (
              <p>Searching...</p>
            ) : searchError ? (
              <p style={{ color: "red" }}>Error: {searchError.message}</p>
            ) : !searchResults?.length ? (
              <p>No items found.</p>
            ) : (
              <table
                border={1}
                cellPadding={5}
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Store</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Sell-By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        backgroundColor:
                          item.daysUntilSellBy <= 3 ? "#ffe6e6" : "transparent",
                      }}
                    >
                      <td>{item.name}</td>
                      <td>{item.store?.name || "Unknown"}</td>
                      <td>{item.store?.address || "Unknown"}</td>
                      <td>
                        {item.discount > 0 ? (
                          <>
                            {/* Show original price strikethrough */}
                            <span style={{ textDecoration: "line-through", color: "gray" }}>
                              ${item.originalPrice.toFixed(2)}
                            </span>{" "}
                            {/* Show discounted price (0 if 100% off) */}
                            <span>${(item.price ?? 0).toFixed(2)}</span>
                          </>
                        ) : (
                          <>${(item.price ?? 0).toFixed(2)}</>
                        )}
                      </td>
                      <td>
                        {item.discount > 0 
                          ? `${item.discount * 100}% off` 
                          : "—"}
                      </td>
                      <td 
                        style={{ 
                          color: item.daysUntilSellBy <= 3 ? "red" : "black", 
                        }}
                      >
                        {item.sellByDate
                          ? new Date(item.sellByDate).toLocaleDateString()
                          : "N/A"}
                      </td>
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

          {/* CART */}
          <div style={{ marginTop: "1rem" }}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${(item.price ?? 0).toFixed(2)}
                    <button onClick={() => removeMutation.mutate(item.id)} style={{ marginLeft: "0.5rem" }}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Add total */}
      <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
        Total: $
        {cart.reduce((sum, item) => sum + (item.price ?? 0), 0).toFixed(2)}
      </p>
    </>
            )}
          </div>

          {cart.length > 0 && (
            <button
              onClick={() => setCheckoutStage("checkout")}
              style={{ marginTop: "1rem" }}
            >
              Proceed to Checkout
            </button>
          )}
        </>
      )}

      {/* -------------------- CHECKOUT STAGE -------------------- */}
      {checkoutStage === "checkout" && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Checkout</h3>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Pickup Date:
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Pickup Store:
            <select
              value={selectedStore || ""}
              onChange={(e) => setSelectedStore(Number(e.target.value))}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="" disabled>
                Select a store
              </option>
              {stores?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name} — {store.address}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => checkoutMutation.mutate()}>
            Confirm Order
          </button>
        </div>
      )}

      {/* -------------------- CONFIRMATION STAGE -------------------- */}
      {checkoutStage === "confirmation" && orderConfirmation && (
        <div style={{ marginTop: "1rem" }}>
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