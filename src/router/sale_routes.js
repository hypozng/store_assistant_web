export default [{
    path: "/sale_commodity",
    component: () => import("@/views/sale/commodity/index.vue"),
    meta: {
      title: "商品管理"
    }
  },
  {
    path: "/sale_commodity_brand",
    component: () => import("@/views/sale/commodityBrand/index.vue"),
    meta: {
      title: "品牌管理"
    }
  },
  {
    path: "/sale_commodity_category",
    component: () => import("@/views/sale/commodityCategory/index.vue"),
    meta: {
      title: "商品种类管理"
    }
  },
  {
    path: "/sale",
    component: () => import("@/views/sale/sale/index.vue"),
    meta: {
      title: "销售"
    }
  },
  {
    path: "/sale_order",
    component: () => import("@/views/sale/order/index.vue"),
    meta: {
      title: "订单管理"
    }
  },
  {
    path: "/warehouse_order",
    component: () => import("@/views/sale/warehouseOrder/index.vue"),
    meta: {
      title: "库存管理"
    }
  }
];