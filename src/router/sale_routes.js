export default [{
    name: "商品管理",
    path: "/sale_commodity",
    component: () => import("@/views/sale/commodity/index.vue")
  },
  {
    name: "品牌管理",
    path: "/sale_commodity_brand",
    component: () => import("@/views/sale/commodityBrand/index.vue")
  },
  {
    name: "种类管理",
    path: "/sale_commodity_category",
    component: () => import("@/views/sale/commodityCategory/index.vue")
  }
];