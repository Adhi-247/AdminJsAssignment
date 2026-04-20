require('dotenv').config();

const { connectDatabase, syncDatabase } = require('../config/database');
const { ROLES } = require('../constants/roles');
const { User, Category, Product, Order, OrderItem, Setting } = require('../models');

async function runSeed() {
  await connectDatabase();
  await syncDatabase();

  await User.findOrCreate({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    defaults: {
      name: 'System Admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: ROLES.ADMIN,
    },
  });

  const [regularUser] = await User.findOrCreate({
    where: { email: 'user@example.com' },
    defaults: {
      name: 'Regular User',
      email: 'user@example.com',
      password: 'user123',
      role: ROLES.USER,
    },
  });

  const [category] = await Category.findOrCreate({
    where: { name: 'Electronics' },
    defaults: { name: 'Electronics' },
  });

  const [product] = await Product.findOrCreate({
    where: { name: 'Wireless Mouse' },
    defaults: {
      name: 'Wireless Mouse',
      price: 25.5,
      stock: 100,
      categoryId: category.id,
    },
  });

  const [order] = await Order.findOrCreate({
    where: { userId: regularUser.id, status: 'completed' },
    defaults: {
      userId: regularUser.id,
      status: 'completed',
      totalAmount: 51.0,
    },
  });

  await OrderItem.findOrCreate({
    where: { orderId: order.id, productId: product.id },
    defaults: {
      orderId: order.id,
      productId: product.id,
      quantity: 2,
      unitPrice: 25.5,
    },
  });

  const defaultSettings = [
    { key: 'site_name', value: 'My eCommerce Store' },
    { key: 'currency', value: 'USD' },
    { key: 'tax_rate', value: '5' },
  ];

  for (const item of defaultSettings) {
    await Setting.findOrCreate({ where: { key: item.key }, defaults: item });
  }

  console.log('Seeding completed successfully.');
}

runSeed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
