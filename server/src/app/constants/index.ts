export const userRoles = {
  ADMIN: "admin",
  CONTRIBUTOR: "contributor",
  CUSTOMER: "customer",
};

export const userType = {
  BASIC: "basic",
  ESSENTIAL: "essential",
  PREMIUM: "premium",
  ADVANCE: "advance",
};

export const subscriptionType = {
  ESSENTIAL: {
    NAME: "essential",
    TYPE: {
      MONTHLY: {
        NAME: "monthly",
        PRICE: 99,
      },
      YEARLY: {
        NAME: "yearly",
        PRICE: 1000,
      },
    },
  },
  PREMIUM: {
    NAME: "premium",
    TYPE: {
      MONTHLY: {
        NAME: "monthly",
        PRICE: 199,
      },
      YEARLY: {
        NAME: "yearly",
        PRICE: 2000,
      },
    },
  },
  ADVANCE: {
    NAME: "advance",
    TYPE: {
      MONTHLY: {
        NAME: "monthly",
        PRICE: 499,
      },
      YEARLY: {
        NAME: "yearly",
        PRICE: 5000,
      },
    },
  },
};
