const { User, Setting } = require('../models');
const env = require('../config/env');
const { ROLES } = require('../constants/roles');

async function ensureAdminUser() {
  const existingAdmin = await User.findOne({ where: { email: env.admin.email } });

  if (!existingAdmin) {
    await User.create({
      name: 'System Admin',
      email: env.admin.email,
      password: env.admin.password,
      role: ROLES.ADMIN,
    });
    console.log(`Default admin created: ${env.admin.email}`);
  }
}

async function ensureDefaultSettings() {
  const defaults = [
    { key: 'site_name', value: 'My eCommerce Store' },
    { key: 'currency', value: 'USD' },
    { key: 'support_email', value: 'support@example.com' },
  ];

  for (const item of defaults) {
    await Setting.findOrCreate({ where: { key: item.key }, defaults: item });
  }
}

async function bootstrapAppData() {
  await ensureAdminUser();
  await ensureDefaultSettings();
}

module.exports = { bootstrapAppData };
