export const Constants = {
  message: {
    validEmail: 'Please enter valid email address',
    requiredEmail: 'Email is required !',
    requiredPwd: 'Password is required',
    minLengthPwd: 'Password must be longer than 6 letters',
    maxLengthPwd: 'Password must be less than 20 letters',
    duplicatedEmail: 'This email is already in use',
  },
  dashboardItems: [
    {
      label: 'Home',
      link: 'home',
      imageIcon: '/assets/image/icon/home.png',
    },
    {
      label: 'FEATURES',
      classname: 'no-menu',
    },
    {
      label: 'Sell',
      imageIcon: '/assets/image/icon/sell.png',
      items: [
        {
          label: 'Sell',
          link: 'sell',
        },
        {
          label: 'Open/Close',
          link: 'sell/open',
        },
        {
          label: 'Sales History',
          link: 'sell/sales-history',
        },
        {
          label: 'Cash Management',
          link: 'sell/cash-management',
        }
      ]
    },
    {
      label: 'Sales Ledger',
      link: 'sales-ledger',
      imageIcon: '/assets/image/icon/sales-ledger.png',
    },
    {
      label: 'Reporting',
      imageIcon: '/assets/image/icon/reporting.png',
      items: [
        {
          label: 'Sales Reports',
          link: 'reporting/sales',
        },
        {
          label: 'Inventory Reports',
          link: 'reporting/inventory',
        },
        {
          label: 'Payment Reports',
          link: 'reporting/payment',
        },
        {
          label: 'Register Closures',
          link: 'reporting/closures',
        },
        {
          label: 'Store Credit Reports',
          link: 'reporting/store-credit',
        }
      ]
    },
    {
      label: 'Products',
      imageIcon: '/assets/image/icon/products.png',
      items: [
        {
          label: 'Products',
          link: 'product',
        },
        {
          label: 'Price Books',
          link: 'product/price-books',
        },
        {
          label: 'Product Types',
          link: 'product/product-type',
        },
        {
          label: 'Suppliers',
          link: 'product/supplier',
        },
        {
          label: 'Brand',
          link: 'product/brand',
        },
        {
          label: 'Product Tags',
          link: 'product/product-tag',
        }
      ]
    },
    {
      label: 'Stock Control',
      imageIcon: '/assets/image/icon/stock-control.png',
      items: [
        {
          label: 'Stock Control',
          link: 'stock-control/stock-control',
        },
        {
          label: 'Manage Orders',
          link: 'stock-control/manage-orders',
        },
        {
          label: 'New Orders',
          link: 'stock-control/new-order',
        },
      ]
    },
    {
      label: 'Customers',
      imageIcon: '/assets/image/icon/customers.png',
      items: [
        {
          label: 'Customers',
          link: 'customers',
        },
        {
          label: 'Groups',
          link: 'customers/group',
        },
      ]
    },
    {
      label: 'Employees',
      imageIcon: '/assets/image/icon/employees.png',
      items: [
        {
          label: 'Employees',
          link: 'employees',
        },
        {
          label: 'Groups',
          link: 'employees/group',
        },
      ]
    },
    {
      label: 'Ecommerce',
      imageIcon: '/assets/image/icon/ecommerce.png',
      items: [
        {
          label: 'Dashboard',
          link: 'ecommerce/dashboard',
        },
        {
          label: 'Collections',
          link: 'ecommerce/collections',
        },
        {
          label: 'Products',
          link: 'ecommerce/product',
        },
        {
          label: 'Orders',
          link: 'ecommerce/orders',
        },
        {
          label: 'Settings',
          link: 'ecommerce/settings',
        },
        {
          label: 'Visit Online Store',
          link: '/error/coming-soon',
        },
      ]
    },
    // {
    //   label: 'Select Plan',
    //   imageIcon: '/assets/image/icon/select-plan.png',
    //   link: '/select-plan'
    // },
    {
      label: 'Setup',
      imageIcon: '/assets/image/icon/setup.png',
      items: [
        {
          label: 'General',
          link: 'setup/general',
        },
        {
          label: 'Billing&Subscriptions',
          link: 'setup/account',
        },
        {
          label: 'Outlets and Register',
          link: 'setup/outlets',
        },
        {
          label: 'Payment Types',
          link: 'setup/payment-types',
        },
        {
          label: 'Sales Taxes',
          link: 'setup/sales-taxes',
        },
        {
          label: 'Users',
          link: 'setup/users',
        },
        {
          label: 'Message Box',
          link: 'setup/message-box',
        },
      ]
    },
  ],
  dashboardConfig: {
    paddingAtStart: true,
    classname: 'capos-side-menu',
    collapseOnSelect: true,
    useDividers: false
  },
  baseUrl: {
    dev: '',
    prod: ''
  }

};
