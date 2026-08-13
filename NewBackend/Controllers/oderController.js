const { getDb, ensureOrdersTable } = require('../db');

// Controller function to get all orders from the database.
exports.getAllOrders = async (req, res) => {
    try {
        await ensureOrdersTable();
        const result = await getDb().execute('SELECT * FROM orders ORDER BY orderDate DESC');

        const ordersWithParsedItems = result.rows.map(row => ({
          ...row,
          items: JSON.parse(row.items)
        }));

        res.status(200).json({ data: ordersWithParsedItems });
    } catch (err) {
        console.error('Error fetching orders:', err.message);
        res.status(500).json({ error: err.message });
    }
};

// Controller function to create a new order in the database.
exports.createOrder = async (req, res) => {
    console.log('Received order request:', req.body);
    const { name, address, phone, paymentMethod, items, totalprice } = req.body;

    if (!name || !address || !phone || !paymentMethod || !items || !totalprice) {
        console.log('Missing fields:', { name: !!name, address: !!address, phone: !!phone, paymentMethod: !!paymentMethod, items: !!items, totalprice: !!totalprice });
        res.status(400).json({ error: 'All fields are required.' });
        return;
    }

    const itemsString = JSON.stringify(items);

    try {
        await ensureOrdersTable();
        const result = await getDb().execute({
            sql: 'INSERT INTO orders (customerName, address, phone, paymentMethod, items, totalPrice) VALUES (?, ?, ?, ?, ?, ?)',
            args: [name, address, phone, paymentMethod, itemsString, totalprice],
        });

        console.log('Order inserted successfully with ID:', result.lastInsertRowid);
        res.status(201).json({
            message: 'Order created successfully',
            id: Number(result.lastInsertRowid)
        });
    } catch (err) {
        console.error('Error inserting order:', err.message);
        res.status(500).json({ error: err.message });
    }
};
