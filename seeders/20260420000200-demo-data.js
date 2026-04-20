'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'System Admin',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: adminPassword,
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: userPassword,
        role: 'user',
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('products', [
      {
        name: 'Wireless Mouse',
        price: 25.5,
        stock: 100,
        categoryId: 1,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('orders', [
      {
        userId: 2,
        status: 'completed',
        totalAmount: 51,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('order_items', [
      {
        orderId: 1,
        productId: 1,
        quantity: 2,
        unitPrice: 25.5,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('settings', [
      {
        key: 'site_name',
        value: 'My eCommerce Store',
        createdAt: now,
        updatedAt: now,
      },
      {
        key: 'currency',
        value: 'USD',
        createdAt: now,
        updatedAt: now,
      },
      {
        key: 'tax_rate',
        value: '5',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('settings', null, {});
    await queryInterface.bulkDelete('order_items', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
