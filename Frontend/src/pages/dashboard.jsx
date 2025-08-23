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
    <div className="p-6 max-w-7xl mx-auto ">
      <h2 className="test-xl font-bold" >Welcome, {user?.fullName || user?.email || "User"}</h2>

      {/* -------------------- SHOPPING STAGE -------------------- */}
      {checkoutStage === "shopping" && (
        <>
         {/* -------------------- SEARCH & FILTER -------------------- */}
          <div className="flex flex-wrap justify-items-center gap-5 mb-6 items-center ">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // style={{ marginRight: "1rem", padding: "0.25rem" }}
              className=" object-center  border rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring focus:ring-orange-300 items-center"
            />
            <div className="flex gap-3 object-bottom">

            {/* DISCOUNT FILTER BUTTONS */}
            <button className="py-1 space-x-1" onClick={() => setDiscountFilter(15)}>15% Off</button>
            <button className="p-1 space-x-1" onClick={() => setDiscountFilter(30)}>30% Off</button>
            <button className="p-1 space-x-1" onClick={() => setDiscountFilter(100)}>FREE</button>
            <button className="p-1 space-x-1" onClick={() => setDiscountFilter(null)}>Clear Discount Filter</button>
            </div>
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
                <thead className="items-center border-b m-1 p-0">
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
                      <td className="text-red-700">
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
                        <button className="btn btn-primary w-full bg-orange-500 rounded-sm hover:bg-orange-800 m-1 px-3 py-1  text-white" onClick={() => addMutation.mutate(item.id)}>
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
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border" key={item.id}>
                    
                    {item.name} - ${(item.price ?? 0).toFixed(2)}
                    <button className="px-3 py-1 text-sm text-red-600 border border-red-500 rounded hover:bg-red-50" onClick={() => removeMutation.mutate(item.id)} style={{ marginLeft: "0.5rem" }}>
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
            <button className="btn btn-primary w-full bg-orange-500 rounded-sm hover:bg-orange-800 m-1 px-3 py-1  text-white"
              onClick={() => setCheckoutStage("checkout")}
              // style={{ marginTop: "1rem" }}
            >
              Proceed to Checkout
            </button>
          )}
        </>
      )}

      {/* -------------------- CHECKOUT STAGE -------------------- */}
      {checkoutStage === "checkout" && (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold border-b py-1 m-1 justify-center ">Checkout</h3>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Pickup Date:
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </label>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Pickup Store:
            <select
              value={selectedStore || ""}
              onChange={(e) => setSelectedStore(Number(e.target.value))}
               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
          <button  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-200" onClick={() => checkoutMutation.mutate()}>
            Confirm Order
          </button>
        </div>
      )}

      {/* -------------------- CONFIRMATION STAGE -------------------- */}
      {checkoutStage === "confirmation" && orderConfirmation && (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold border-b py-1 m-1 justify-center " >Order Confirmed!</h3>
          <p className="font-semibold">Pickup Date: {orderConfirmation.pickupDate}</p>
          <p className="font-semibold">Store ID: {orderConfirmation.storeId}</p>
          <ul className="gap-2 py-1 m-1">
            {orderConfirmation.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}