const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");

let db;
const app = express();
app.use(express.json());
app.use(cors());

const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, "users.db"),
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Database error is ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();

// ----------------------------------------------------
// Customer Routes

// POST /api/customers - Create a new customer
app.post("/api/customers", async (req, res) => {
  const customerDetails = req.body;
  const { id, firstName, lastName, phoneNumber } = customerDetails;
  const addCustomerQuery = `
    INSERT INTO customers(id, first_name, last_name, phone_number)
    VALUES
    (
      '${id}',
      '${firstName}',
      '${lastName}',
      '${phoneNumber}'
      );
  `;
  await db.run(addCustomerQuery);
  res.send("Successfully Created");
});

// GET /api/customers - Get a list of all customers (should support searching, sorting, and pagination)
app.get("/api/customers", async (req, res) => {
  const getApiCustomersQuery = `
    SELECT *
    FROM customers
    ORDER BY id;
  `;
  const customersArray = await db.all(getApiCustomersQuery);
  res.send(customersArray);
});

// GET /api/customers/:id - Get details for a single customer
app.get("/api/customers/:id", async (req, res) => {
  const { id } = req.params;
  const getApiCustomerQuery = `
    SELECT *
    FROM customers
    WHERE id = ${id};
  `;
  const customer = await db.get(getApiCustomerQuery);
  res.send(customer);
});

// PUT /api/customers/:id - Update a customer's information
app.put("/api/customers/:id", async (req, res) => {
  const { id } = req.params;
  const customerDetails = req.body;
  const { firstName, lastName, phoneNumber } = customerDetails;
  const updateCustomerQuery = `
    UPDATE customers
    SET
      first_name = '${firstName}',
      last_name = '${lastName}',
      phone_number = '${phoneNumber}'
    WHERE id = ${id};
  `;
  await db.run(updateCustomerQuery);
  res.send("Customer Details Updated Successfully");
});

// DELETE /api/customers/:id - Delete a customer
app.delete("/api/customers/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCustomerQuery = `
    DELETE FROM customers
    WHERE id = ${id};
  `;
  await db.run(deleteCustomerQuery);
  res.send("Customer Deleted Successfully");
});

// ----------------------------------------------------
// Address Routes

// POST /api/customers/:id/addresses - Add a new address for a specific customer
app.post("/api/customers/:customerId/addresses", async (req, res) => {
  const { customerId } = req.params;
  const addressData = req.body;
  const { id, addressDetails, city, state, pinCode } = addressData;
  const addAddressQuery = `
    INSERT INTO addresses(id, customer_id, address_details, city, state, pin_code)
    VALUES
    (
      '${id}',
      '${customerId}',
      '${addressDetails}',
      '${city}',
      '${state}',
      '${pinCode}'
    );
  `;
  await db.run(addAddressQuery);
  res.send("Address Successfully Created");
});

// GET /api/customers/:id/addresses - Get all addresses for a specific customer
app.get("/api/customers/:customerId/addresses", async (req, res) => {
  const { customerId } = req.params;
  const getCustomerAddressesQuery = `
    SELECT  *
    FROM  addresses
    WHERE customer_id = ${customerId};
  `;
  const addressArray = await db.all(getCustomerAddressesQuery);
  res.send(addressArray);
});

// PUT /api/addresses/:addressId - Update a specific address
app.put("/api/addresses/:addressId", async (req, res) => {
  const { addressId } = req.params;
  const customerAddressDetails = req.body;
  const { customerId, addressDetails, city, state, pinCode } =
    customerAddressDetails;
  const updateAddressQuery = `
    UPDATE addresses
    SET
      customer_id = ${customerId},
      address_details = '${addressDetails}',
      city = '${city}',
      state = '${state}',
      pin_code = '${pinCode}'
    WHERE id = ${addressId};
  `;
  await db.run(updateAddressQuery);
  res.send("Address Updated Successfully");
});

// DELETE /api/addresses/:addressId - Delete a specific address
app.delete("/api/addresses/:addressId", async (req, res) => {
  const { addressId } = req.params;
  const deleteAddressQuery = `
    DELETE FROM addresses
    WHERE id = ${addressId};
  `;
  await db.run(deleteAddressQuery);
  res.send("Address Deleted Successfully");
});
