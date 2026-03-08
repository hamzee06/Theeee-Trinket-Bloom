const Order = require('../models/Order');

// Controller function to get all orders from the database.
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.status(200).json({ data: orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to create a new order in the database.
exports.createOrder = async (req, res) => {
    const { name, address, phone, paymentMethod, items, totalprice } = req.body;

    // Validate that all required fields are present.
    if (!name || !address || !phone || !paymentMethod || !items || !totalprice) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newOrder = new Order({
            customerName: name,
            address,
            phone,
            paymentMethod,
            items,
            totalPrice: totalprice
        });

        const savedOrder = await newOrder.save();
        console.log('Order created successfully with ID:', savedOrder._id);
        
        res.status(201).json({
            message: 'Order created successfully',
            id: savedOrder._id
        });
    } catch (err) {
        console.error('Error creating order:', err.message);
        res.status(500).json({ error: err.message });
    }
};


