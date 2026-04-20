const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const bcrypt = require('bcrypt');
const {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
} = require('../models');
const env = require('./env');
const { ROLES } = require('../constants/roles');

AdminJS.registerAdapter({
  Database: AdminJSSequelize.Database,
  Resource: AdminJSSequelize.Resource,
});

const componentLoader = new AdminJS.ComponentLoader();
const Components = {
  Dashboard: componentLoader.add('Dashboard', '../admin/components/Dashboard.jsx'),
  Settings: componentLoader.add('Settings', '../admin/components/Settings.jsx'),
};

const isAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.role === ROLES.ADMIN;

const hidePasswordProperty = {
  password: {
    isVisible: {
      list: false,
      filter: false,
      show: false,
      edit: false,
    },
  },
};

function createAdminOptions() {
  return {
    rootPath: '/admin',
    componentLoader,
    branding: {
      companyName: 'eCommerce Admin',
      softwareBrothers: false,
    },
    resources: [
      {
        resource: User,
        options: {
          properties: hidePasswordProperty,
          actions: {
            list: { isAccessible: isAdmin, isVisible: isAdmin },
            show: { isAccessible: isAdmin, isVisible: isAdmin },
            new: { isAccessible: isAdmin, isVisible: isAdmin },
            edit: { isAccessible: isAdmin, isVisible: isAdmin },
            delete: { isAccessible: isAdmin, isVisible: isAdmin },
            bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
          },
        },
      },
      {
        resource: Category,
        options: {
          actions: {
            new: { isAccessible: isAdmin, isVisible: isAdmin },
            edit: { isAccessible: isAdmin, isVisible: isAdmin },
            delete: { isAccessible: isAdmin, isVisible: isAdmin },
            bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
          },
        },
      },
      {
        resource: Product,
        options: {
          properties: {
            categoryId: { reference: 'categories' },
          },
          actions: {
            new: { isAccessible: isAdmin, isVisible: isAdmin },
            edit: { isAccessible: isAdmin, isVisible: isAdmin },
            delete: { isAccessible: isAdmin, isVisible: isAdmin },
            bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
          },
        },
      },
      {
        resource: Order,
        options: {
          properties: {
            userId: { reference: 'users' },
          },
          actions: {
            new: { isAccessible: isAdmin, isVisible: isAdmin },
            edit: { isAccessible: isAdmin, isVisible: isAdmin },
            delete: { isAccessible: isAdmin, isVisible: isAdmin },
            bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
          },
        },
      },
      {
        resource: OrderItem,
        options: {
          properties: {
            orderId: { reference: 'orders' },
            productId: { reference: 'products' },
          },
          actions: {
            new: { isAccessible: isAdmin, isVisible: isAdmin },
            edit: { isAccessible: isAdmin, isVisible: isAdmin },
            delete: { isAccessible: isAdmin, isVisible: isAdmin },
            bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
          },
        },
      },
      {
        resource: Setting,
        options: {
          actions: {
            list: { isAccessible: isAdmin, isVisible: isAdmin },
            show: { isAccessible: isAdmin, isVisible: isAdmin },
            new: { isAccessible: isAdmin, isVisible: isAdmin },
            edit: { isAccessible: isAdmin, isVisible: isAdmin },
            delete: { isAccessible: isAdmin, isVisible: isAdmin },
            bulkDelete: { isAccessible: isAdmin, isVisible: isAdmin },
          },
        },
      },
    ],
    pages: {
      Dashboard: {
        component: Components.Dashboard,
        icon: 'Dashboard',
        handler: async (request, response, context) => {
          const { currentAdmin } = context;

          if (!currentAdmin) {
            throw new AdminJS.ValidationError({
              auth: { message: 'Not authenticated' },
            });
          }

          if (currentAdmin.role === ROLES.ADMIN) {
            const [totalUsers, totalProducts, totalOrders] = await Promise.all([
              User.count(),
              Product.count(),
              Order.count(),
            ]);

            const revenue = await Order.sum('totalAmount');

            return {
              role: currentAdmin.role,
              totalUsers,
              totalProducts,
              totalOrders,
              totalRevenue: Number(revenue || 0),
            };
          }

          const myOrders = await Order.count({ where: { userId: currentAdmin.id } });

          return {
            role: currentAdmin.role,
            myOrders,
            profile: {
              name: currentAdmin.name,
              email: currentAdmin.email,
            },
          };
        },
      },
      Settings: {
        component: Components.Settings,
        icon: 'Settings',
        handler: async (request, response, context) => {
          const { currentAdmin } = context;

          if (!currentAdmin) {
            throw new AdminJS.ValidationError({
              auth: { message: 'Not authenticated' },
            });
          }

          if (currentAdmin.role !== ROLES.ADMIN) {
            throw new AdminJS.ValidationError({
              auth: { message: 'Only admins can access settings' },
            });
          }

          if (request.method === 'post') {
            const payload = request.payload || {};
            const entries = Object.entries(payload);

            await Promise.all(
              entries.map(([key, value]) =>
                Setting.upsert({
                  key,
                  value: String(value),
                })
              )
            );
          }

          const settings = await Setting.findAll({ order: [['key', 'ASC']] });

          return {
            settings: settings.map((item) => ({
              id: item.id,
              key: item.key,
              value: item.value,
            })),
          };
        },
      },
    },
  };
}

async function authenticateAdmin(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

async function setupAdmin(app) {
  const admin = new AdminJS(createAdminOptions());

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: authenticateAdmin,
      cookieName: 'adminjs',
      cookiePassword: env.cookieSecret,
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: env.cookieSecret,
    }
  );

  app.use(admin.options.rootPath, adminRouter);
}

module.exports = { setupAdmin };
