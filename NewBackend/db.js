const { createClient } = require('@libsql/client');

// This file is dedicated to creating and exporting the database connection.
// For local development or preview deployments without configured Turso env vars,
// we fall back to a simple in-memory store so the app still works.
let client;
const memoryStore = {
  feedback: [],
  orders: [],
};

function buildMemoryClient() {
  return {
    execute: async (query) => {
      if (typeof query === 'string') {
        if (query.includes('SELECT * FROM feedback')) {
          return { rows: [...memoryStore.feedback] };
        }

        if (query.includes('SELECT * FROM orders')) {
          return { rows: [...memoryStore.orders] };
        }

        return { rows: [] };
      }

      const { sql, args } = query;

      if (sql.includes('INSERT INTO feedback')) {
        const [name, email, message] = args;
        const entry = {
          id: memoryStore.feedback.length + 1,
          name,
          email,
          message,
          createdAt: new Date().toISOString(),
        };
        memoryStore.feedback.unshift(entry);
        return { lastInsertRowid: entry.id };
      }

      if (sql.includes('INSERT INTO orders')) {
        const [customerName, address, phone, paymentMethod, items, totalPrice] = args;
        const entry = {
          id: memoryStore.orders.length + 1,
          customerName,
          address,
          phone,
          paymentMethod,
          items,
          totalPrice,
          orderDate: new Date().toISOString(),
        };
        memoryStore.orders.unshift(entry);
        return { lastInsertRowid: entry.id };
      }

      return { lastInsertRowid: 0 };
    },
  };
}

function getDb() {
  if (!client) {
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
      client = buildMemoryClient();
    } else {
      client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
    }
  }
  return client;
}

async function ensureFeedbackTable() {
  // No-op for the in-memory fallback.
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    await getDb().execute(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
}

async function ensureOrdersTable() {
  // No-op for the in-memory fallback.
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    await getDb().execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        paymentMethod TEXT NOT NULL,
        items TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
}

module.exports = { getDb, ensureFeedbackTable, ensureOrdersTable };
