// The database connection is now imported from db.js,
// which prevents the circular dependency with server.js.
const db = require('../db'); 

// Controller function to get all orders from the database.
exports.getAllOrders = (req, res) => {
    // Query the orders table
    const sql = 'SELECT * FROM orders ORDER BY orderDate DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // Parse the JSON string back into an array for each row
        const ordersWithParsedItems = rows.map(row => ({
          ...row,
          items: JSON.parse(row.items)
        }));

        res.status(200).json({ data: ordersWithParsedItems });
    });
};

// Controller function to create a new order in the database.
exports.createOrder = (req, res) => {
    // Destructure using 'name' to match the request body.
    const { name, address, phone, paymentMethod, items, totalprice } = req.body;

    // Validate that all required fields are present.
    if (!name || !address || !phone || !paymentMethod || !items || !totalprice) {
        res.status(400).json({ error: 'All fields are required.' });
        return;
    }

    // Convert the 'items' array into a single JSON string for storage.
    const itemsString = JSON.stringify(items);

    // Use the new 'orders' table name and ensure proper data insertion
    const sql = 'INSERT INTO orders (customerName, address, phone, paymentMethod, items, totalPrice) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [name, address, phone, paymentMethod, itemsString, totalprice];

    // Run the SQL command to insert the new order.
    db.run(sql, params, function(err) {
        if (err) {
            console.error('Error inserting order:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Order inserted successfully with ID:', this.lastID);
        res.status(201).json({
            message: 'Order created successfully',
            id: this.lastID
        });
    });
};


