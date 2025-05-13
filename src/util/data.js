//预制数据
//区域信息
export const region = [
  { id: "r0001", name: "市区与未提及区域", fillFee: 0, constructionFee: 0 },
  { id: "r0002", name: "眉山", fillFee: 100, constructionFee: 300 },
  { id: "r0003", name: "彭山", fillFee: 100, constructionFee: 240 },
  { id: "r0004", name: "彭州", fillFee: 100, constructionFee: 280 },
  { id: "r0005", name: "仁寿", fillFee: 100, constructionFee: 320 },
  { id: "r0006", name: "青白江", fillFee: 100, constructionFee: 220 },
  { id: "r0007", name: "蒲江", fillFee: 200, constructionFee: 300 },
  { id: "r0008", name: "雅安", fillFee: 300, constructionFee: 500 },
  { id: "r0009", name: "邛崃", fillFee: 200, constructionFee: 200 },
  { id: "r0010", name: "大邑", fillFee: 200, constructionFee: 200 },
  { id: "r0011", name: "德阳广汉", fillFee: 150, constructionFee: 220 },
  { id: "r0012", name: "都江堰", fillFee: 150, constructionFee: 240 },
  { id: "r0013", name: "简阳", fillFee: 100, constructionFee: 260 },
];
//湿式铺设数据
export const wetData = [
  // 地暖管道
  {
    name: "地暖管道",
    field: "floorHeatingPipe",
    items: [
      {
        id: "20001",
        productName: "PE-RT双色管（红白色）[Φ16]",
        settlementPrice: 17.02,
        terminalPrice: 29.09,
      },
      {
        id: "20002",
        productName: "超导热PE-RT（浅青色）[Φ16]",
        settlementPrice: 27.69,
        terminalPrice: 45.12,
      },
      {
        id: "20003",
        productName: "PE-RT内阻氧（五层红色）[Φ16]",
        settlementPrice: 35.59,
        terminalPrice: 53.56,
      },
      {
        id: "20004",
        productName: "PE-Xc外阻氧（三层本色）[Φ16]",
        settlementPrice: 66.53,
        terminalPrice: 80.0,
      },
    ],
  },
  // 分集水器
  {
    name: "分集水器",
    field: "manifold",
    items: [
      {
        id: "20005",
        productName: "MND-黄铜大流量分集水器[DN25]",
        settlementPrice: 20.16,
        terminalPrice: 30.34,
      },
      {
        id: "20006",
        productName: "MND-不锈钢方形分集水器[DN32]",
        settlementPrice: 29.25,
        terminalPrice: 45.0,
      },
      {
        id: "20007",
        productName: "DN25黄铜智能分集水器[DN25]",
        settlementPrice: 9.24,
        terminalPrice: 15.79,
      },
      {
        id: "20008",
        productName: "黄铜双球阀分集水器[DN25]",
        settlementPrice: 11.76,
        terminalPrice: 23.52,
      },
    ],
  },
  // 进回水套阀
  {
    name: "进回水套阀",
    field: "waterValve",
    items: [
      {
        id: "20009",
        productName: "高柄黄铜供回水排污套阀[DN25]",
        settlementPrice: 5.31,
        terminalPrice: 8.85,
      },
      {
        id: "20010",
        productName: "高柄白金供回水排污套阀[DN25]",
        settlementPrice: 5.31,
        terminalPrice: 8.85,
      },
      {
        id: "20011",
        productName: "小扳手进回水过滤排污套阀[DN25]",
        settlementPrice: 4.11,
        terminalPrice: 6.5,
      },
      {
        id: "20012",
        productName: "角式过滤器进回水套阀[DN25]",
        settlementPrice: 3.66,
        terminalPrice: 5.5,
      },
      {
        id: "20013",
        productName: "角式进回水套阀[DN25]",
        settlementPrice: 2.06,
        terminalPrice: 3.52,
      },
    ],
  },
  // 末端排气阀
  {
    name: "末端排气阀",
    field: "exhaustValve",
    items: [
      {
        id: "20014",
        productName: "自动末端排气泄水阀",
        settlementPrice: 2.2,
        terminalPrice: 3.76,
      },
      {
        id: "20015",
        productName: "MND-黄铜末端自动排气（泄水）阀",
        settlementPrice: 3.09,
        terminalPrice: 4.66,
      },
      {
        id: "20016",
        productName: "MND-白金末端自动排气（泄水）阀",
        settlementPrice: 3.09,
        terminalPrice: 4.66,
      },
    ],
  },
  // 温控器
  {
    name: "温控器",
    field: "thermostat",
    items: [
      {
        id: "20017",
        productName: "智能温控器",
        settlementPrice: 2.66,
        terminalPrice: 4.55,
      },
      {
        id: "20018",
        productName: "触摸温控器",
        settlementPrice: 7.22,
        terminalPrice: 11.75,
      },
      {
        id: "20019",
        productName: "WiFi-触摸温控器",
        settlementPrice: 12.89,
        terminalPrice: 19.82,
      },
      {
        id: "20020",
        productName: "MND-WiFi智能白色温控器",
        settlementPrice: 10.44,
        terminalPrice: 15.71,
      },
    ],
  },
  // 执行器
  {
    name: "执行器",
    field: "actuator",
    items: [
      {
        id: "20021",
        productName: "MND-蓝帽执行器（常闭）",
        settlementPrice: 9.45,
        terminalPrice: 14.22,
      },
      {
        id: "20022",
        productName: "电热执行器（常闭）",
        settlementPrice: 3.32,
        terminalPrice: 5.68,
      },
    ],
  },
  // 湿铺保温板
  {
    name: "湿铺保温板",
    field: "insulationBoard",
    items: [
      {
        id: "20023",
        productName: "挤塑板",
        settlementPrice: 5.51,
        terminalPrice: 9.42,
      },
      {
        id: "20024",
        productName: "高密白晶挤塑板",
        settlementPrice: 9.39,
        terminalPrice: 15.3,
      },
      {
        id: "20025",
        productName: "高密0甲醛钻石挤塑板",
        settlementPrice: 17.37,
        terminalPrice: 26.13,
      },
    ],
  },
  // 反射膜
  {
    name: "反射膜",
    field: "reflectiveFilm",
    items: [
      {
        id: "20026",
        productName: "镜面5丝反射膜",
        settlementPrice: 0.95,
        terminalPrice: 1.8,
      },
      {
        id: "20027",
        productName: "三层阻氧5丝纯铝反射膜",
        settlementPrice: 1.52,
        terminalPrice: 2.8,
      },
      {
        id: "20028",
        productName: "五层阻氧8丝纯铝反射膜",
        settlementPrice: 2.27,
        terminalPrice: 3.87,
      },
    ],
  },
  // 硅晶网
  {
    name: "硅晶网",
    field: "siliconMesh",
    items: [
      {
        id: "20029",
        productName: "环保特粗硅晶网",
        settlementPrice: 2.31,
        terminalPrice: 3.48,
      },
      {
        id: "20030",
        productName: "环保粗丝硅晶网",
        settlementPrice: 1.05,
        terminalPrice: 1.79,
      },
    ],
  },
  // 分集水器箱
  {
    name: "分集水器箱",
    field: "manifoldBox",
    items: [
      {
        id: "20031",
        productName: "烤漆分集水器箱",
        settlementPrice: 2.25,
        terminalPrice: 3.85,
      },
      {
        id: "20032",
        productName: "不锈钢分集水器箱",
        settlementPrice: 4.57,
        terminalPrice: 9.14,
      },
    ],
  },
];

//湿式铺设默认必带项目
export const wetDefaultData = [
  {
    id: "30001",
    productName: "地暖环保六件套",
    settlementPrice: 4.03,
    terminalPrice: 6.9,
  },
  {
    id: "30002",
    productName: "主管道25平米",
    settlementPrice: 3.38,
    terminalPrice: 5.78,
  },
  {
    id: "30003",
    productName: "挂网米石回填（麻面）",
    settlementPrice: 22,
    terminalPrice: 22,
  },
  {
    id: "30004",
    productName: "精细化施工管理费",
    settlementPrice: 22,
    terminalPrice: 22,
  },
];

//干式铺设数据
export const dryData = [
  // 地暖管道
  {
    name: "地暖管道",
    field: "floorHeatingPipe",
    items: [
      {
        id: "10001",
        productName: "PE-RT双色管（红白色）[Φ16]",
        settlementPrice: 17.02,
        terminalPrice: 29.09,
      },
      {
        id: "10002",
        productName: "超导热PE-RT（浅青色）[Φ16]",
        settlementPrice: 27.69,
        terminalPrice: 45.12,
      },
      {
        id: "10003",
        productName: "PE-RT内阻氧（五层红色）[Φ16]",
        settlementPrice: 35.59,
        terminalPrice: 53.56,
      },
      {
        id: "10004",
        productName: "PE-Xc外阻氧（三层本色）[Φ16]",
        settlementPrice: 66.53,
        terminalPrice: 80.0,
      },
    ],
  },
  // 分集水器
  {
    name: "分集水器",
    field: "manifold",
    items: [
      {
        id: "10005",
        productName: "MND-黄铜大流量分集水器[DN25]",
        settlementPrice: 20.16,
        terminalPrice: 30.34,
      },
      {
        id: "10006",
        productName: "MND-不锈钢方形分集水器[DN32]",
        settlementPrice: 29.25,
        terminalPrice: 45.0,
      },
      {
        id: "10007",
        productName: "DN25黄铜智能分集水器[DN25]",
        settlementPrice: 9.24,
        terminalPrice: 15.79,
      },
      {
        id: "10008",
        productName: "黄铜双球阀分集水器[DN25]",
        settlementPrice: 11.76,
        terminalPrice: 23.52,
      },
    ],
  },
  // 进回水套阀
  {
    name: "进回水套阀",
    field: "waterValve",
    items: [
      {
        id: "10009",
        productName: "高柄黄铜供回水排污套阀[DN25]",
        settlementPrice: 5.31,
        terminalPrice: 8.85,
      },
      {
        id: "10010",
        productName: "高柄白金供回水排污套阀[DN25]",
        settlementPrice: 5.31,
        terminalPrice: 8.85,
      },
      {
        id: "10011",
        productName: "小扳手进回水过滤排污套阀[DN25]",
        settlementPrice: 4.11,
        terminalPrice: 6.5,
      },
      {
        id: "10012",
        productName: "角式过滤器进回水套阀[DN25]",
        settlementPrice: 3.66,
        terminalPrice: 5.5,
      },
      {
        id: "10013",
        productName: "角式进回水套阀[DN25]",
        settlementPrice: 2.06,
        terminalPrice: 3.52,
      },
    ],
  },
  // 末端排气阀
  {
    name: "末端排气阀",
    field: "exhaustValve",
    items: [
      {
        id: "10014",
        productName: "自动末端排气泄水阀",
        settlementPrice: 2.2,
        terminalPrice: 3.76,
      },
      {
        id: "10015",
        productName: "MND-黄铜末端自动排气（泄水）阀",
        settlementPrice: 3.09,
        terminalPrice: 4.66,
      },
      {
        id: "10016",
        productName: "MND-白金末端自动排气（泄水）阀",
        settlementPrice: 3.09,
        terminalPrice: 4.66,
      },
    ],
  },
  // 温控器
  {
    name: "温控器",
    field: "thermostat",
    items: [
      {
        id: "10017",
        productName: "智能温控器",
        settlementPrice: 2.66,
        terminalPrice: 4.55,
      },
      {
        id: "10018",
        productName: "触摸温控器",
        settlementPrice: 7.22,
        terminalPrice: 11.75,
      },
      {
        id: "10019",
        productName: "WiFi-触摸温控器",
        settlementPrice: 12.89,
        terminalPrice: 19.82,
      },
      {
        id: "10020",
        productName: "MND-WiFi智能白色温控器",
        settlementPrice: 10.44,
        terminalPrice: 15.71,
      },
    ],
  },
  // 执行器
  {
    name: "执行器",
    field: "actuator",
    items: [
      {
        id: "10021",
        productName: "MND-蓝帽执行器（常闭）",
        settlementPrice: 9.45,
        terminalPrice: 14.22,
      },
      {
        id: "10022",
        productName: "电热执行器（常闭）",
        settlementPrice: 3.32,
        terminalPrice: 5.68,
      },
    ],
  },
  // 干铺地暖模块
  {
    name: "干铺地暖模块",
    field: "dryFloorModule",
    items: [
      {
        id: "10023",
        productName: "超薄高密度环保纯铝地暖模块[Φ16]",
        settlementPrice: 30.0,
        terminalPrice: 38.16,
      },
      {
        id: "10024",
        productName: "超薄高密度环保加厚纯铝地暖模块[Φ16]",
        settlementPrice: 53.49,
        terminalPrice: 66.87,
      },
      {
        id: "10025",
        productName: "高密度石墨烯超导模块",
        settlementPrice: 47.18,
        terminalPrice: 59.72,
      },
    ],
  },
  // 分集水器箱
  {
    name: "分集水器箱",
    field: "manifoldBox",
    items: [
      {
        id: "10026",
        productName: "烤漆分集水器箱",
        settlementPrice: 2.25,
        terminalPrice: 3.85,
      },
      {
        id: "10027",
        productName: "不锈钢分集水器箱",
        settlementPrice: 4.57,
        terminalPrice: 9.14,
      }
    ],
  },
];

//干式铺设默认必带项目
export const dryDefaultData = [
  {
    id: "30005",
    productName: "主管道25平米",
    settlementPrice: 3.38,
    terminalPrice: 5.78,
  },
  {
    id: "30006",
    productName: "精细化施工管理费",
    settlementPrice: 20,
    terminalPrice: 20,
  },
];

//系统优化数据
export const optimizeData = [
  {
    category: "循环泵",
    items: [
      { id: "40001", model: "MNDDRS100-25/6", packagePrice: 620, suggestedPrice: 1240 },
      { id: "40002", model: "MNDDRS200-25/8", packagePrice: 880, suggestedPrice: 1760 },
      { id: "40003", model: "MNDDRS300-25/15", packagePrice: 1080, suggestedPrice: 2160 },
    ],
  },
  {
    category: "方形耦合罐",
    items: [
      {
				id: "40004", 
        model: "MND-F-H-70*70*1F（DN25）",
        packagePrice: 1200,
        suggestedPrice: 2400,
      },
      {
				id: "40005", 
        model: "MND-F-H-70*70*1¼F（DN32）",
        packagePrice: 1600,
        suggestedPrice: 3200,
      },
    ],
  },
  {
    category: "圆形耦合罐",
    items: [
      { id: "40006", model: "2-2(DN25接口)", packagePrice: 950, suggestedPrice: 1900 },
      { id: "40007", model: "2-2(DN32接口)", packagePrice: 1350, suggestedPrice: 2700 },
      { id: "40008", model: "2-4(DN25接口)", packagePrice: 1600, suggestedPrice: 3200 },
    ],
  },
  {
    category: "不锈钢单盘管水箱（顶进顶出)壁挂炉系统专用",
    items: [
      { id: "40009", model: "150L", packagePrice: 3125, suggestedPrice: 6250 },
      { id: "40010", model: "200L", packagePrice: 3675, suggestedPrice: 7350 },
    ],
  },
  {
    category: "不锈钢单盘管水箱（侧出口)壁挂炉系统专用",
    items: [
      { id: "40011", model: "80L", packagePrice: 2425, suggestedPrice: 4850 },
      { id: "40012", model: "100L", packagePrice: 2575, suggestedPrice: 5150 },
      { id: "40013", model: "120L", packagePrice: 2775, suggestedPrice: 5550 },
      { id: "40014", model: "150L", packagePrice: 3075, suggestedPrice: 6150 },
      { id: "40015", model: "200L", packagePrice: 3525, suggestedPrice: 7050 },
      { id: "40016", model: "300L", packagePrice: 4125, suggestedPrice: 8250 },
    ],
  },
  {
    category: "缓冲不锈钢方形单胆上进下出",
    items: [
      { id: "40017", model: "40L", packagePrice: 1653, suggestedPrice: 3306 },
      { id: "40018", model: "60L", packagePrice: 1787, suggestedPrice: 3574 },
    ],
  },
  {
    category: "缓冲不锈钢水箱侧出口",
    items: [
      { id: "40019", model: "40L", packagePrice: 1764, suggestedPrice: 3528 },
      { id: "40020", model: "50L", packagePrice: 1792, suggestedPrice: 3584 },
      { id: "40021", model: "60L", packagePrice: 1817, suggestedPrice: 3634 },
      { id: "40022", model: "80L", packagePrice: 2050, suggestedPrice: 4100 },
      { id: "40023", model: "100L", packagePrice: 2200, suggestedPrice: 4400 },
      { id: "40024", model: "120L", packagePrice: 2384, suggestedPrice: 4768 },
			{ id: "40025", model: "200L", packagePrice: 2825, suggestedPrice: 5650 },
      { id: "40026", model: "300L", packagePrice: 3542, suggestedPrice: 7084 },
    ],
  },
  {
    category: "缓冲不锈钢水箱侧出口限高",
    items: [{ id: "40027", model: "150L", packagePrice: 2585, suggestedPrice: 5170 }],
  },
  {
    category: "背篓",
    items: [{ id: "40028", model: "背篓", packagePrice: 850, suggestedPrice: 1700 }],
  },
  {
    category: "系统优化",
    items: [
      { id: "40029", model: "DE25", packagePrice: 40, suggestedPrice: 60 },
      { id: "40030", model: "DE32", packagePrice: 50, suggestedPrice: 70 },
      { id: "40031", model: "DE40", packagePrice: 60, suggestedPrice: 80 },
      { id: "40032", model: "DE50", packagePrice: 70, suggestedPrice: 90 },
    ],
  },
  {
    category: "主管道",
    items: [
      { id: "40034", model: "25", packagePrice: 65, suggestedPrice: 130 },
      { id: "40035", model: "32", packagePrice: 85, suggestedPrice: 170 },
      { id: "40036", model: "40", packagePrice: 130, suggestedPrice: 260 },
      { id: "40037", model: "50", packagePrice: 160, suggestedPrice: 320 },
    ],
  },
  {
    category: "锅炉安装",
    items: [{ id: "40033", model: "锅炉安装", packagePrice: 500, suggestedPrice: 500 }],
  },
];
