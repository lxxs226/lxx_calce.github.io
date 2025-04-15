<template>
  <div class="calculator-index">
    <img src="../assets/logo.jpg" class="logo" @click="handleAdminView" alt="">
    <h1>地暖计算器</h1>
    <div>
      <el-form :model="calcuForm" :rules="rules" ref="calcuForm" label-width="150px" :label-position="'right'" class="calcu-form">
        <el-form-item label="所在地区:">
          <el-select v-model="calcuForm.region" placeholder="请选择施工地区" class="form-item" @change="changeMethod">
            <el-option
              v-for="region in regionOptions"
              :key="region.id"
              :label="region.name"
              :value="region.id"
            >
            <span>{{ region.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              <span v-if="region.fillFee > 0 || region.constructionFee > 0">
                回填远程费: {{ region.fillFee }}元 / 施工远程费: {{ region.constructionFee }}元
              </span>
              <span v-else>不收取费用</span>
            </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋面积(m²):">
          <el-input-number v-model="calcuForm.area" controls-position="right" :min="1" class="form-item" ></el-input-number>
        </el-form-item>
        <el-form-item label="铺设方式:">
          <el-select v-model="calcuForm.method" placeholder="请选择铺设方式" class="form-item" @change="changeMethod">
            <el-option label="湿式铺设" value="wet"></el-option>
            <el-option label="干式铺设" value="dry"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否跨层:">
          <el-radio v-model="calcuForm.crossLayer" label="1">是</el-radio>
          <el-radio v-model="calcuForm.crossLayer" label="2">否</el-radio>
        </el-form-item>
        <div v-if="chooseShow">
          <template v-for="(category, index) in filteredCategories" >
            <el-form-item 
              :key="index" 
              :label="category.name+':'" 
              v-if="category.items.length > 0"
            >
            <el-select 
                v-model="calcuForm[category.field]" 
                :placeholder="`请选择${category.name}`"
                class="form-item"
                filterable
              >
                <el-option
                  v-for="(item, itemIndex) in category.items"
                  :key="itemIndex"
                  :label="`${item.productName}（${item.terminalPrice} 元/m²）`"
                  :value="item.id"
                >
                  <span>{{ item.productName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    {{ item.terminalPrice }} 元/m²
                  </span>
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </div>
      </el-form>
      <!-- 结算表格 -->
      <div class="summary-table" v-if="showSummary">
        <el-table
          :data="summaryData"
          :props="summaryColumns"
          border
          style="width: 100%; margin-bottom: 20px"
          show-summary
          :summary-method="getTableSummaries"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            v-for="column in summaryColumns"
            :key="column.id"
            :prop="column.prop"
            :label="column.label"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-button type="primary" @click="onSubmit()" class="submit-button">{{ chooseShow ? '生成结算单':'确定信息' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorIndex',
  data() {
      return {
        //表单数据
        calcuForm: {
          region: '',
          area: '',
          method: '',
          crossLayer: '2'
        },
        rules: {
          region: [
            { required: true, message: '请选择地区', trigger: 'change' },
          ],
          area: [
            { required: true, message: '请输入面积', trigger: 'blur' },
            { type: 'number', message: '面积必须为数字值'}
          ],
          method: [
            { required: true, message: '请选择铺设方式', trigger: 'change' }
          ],
          crossLayer: [
            { required: true, message: '请确认是否跨层', trigger: 'change' }
          ]
        },
        //选项显示
        chooseShow: false,
        //数据源
        excelData: {
          wet: this.generateWetData(),
          dry: this.generateDryData()
        },
        filteredCategories: [],
        //默认项目
        defaultItems: [],
        //结算表格显示
        showSummary: false,
        // 是否显示结算价
        showSettlement: false, 
        // 管理员密码
        password: 'qaz123456',
        // 结算数据
        summaryData: [], 
        // 结算表格列
        summaryColumns: [],
        //管理员列
        adminColumn: [
          { prop: 'settlementPrice', id: 'settlementPrice', label: '结算价-单价', width: 200 },
          { prop: 'settlementAllPrice', id: 'settlementAllPrice', label: '结算价-小计(元)', width: 200 }
        ],
        //默认列
        defaultColumns: [
          { prop: 'productName', id: 'productName', label: '产品名称', 'min-width': 300 },
          { prop: 'unit', id: 'unit', label: '单位', width: 120 },
          { prop: 'terminalPrice', id: 'terminalPrice', label: '单价', width: 200 },
          { prop: 'terminalAllPrice', id: 'terminalAllPrice', label: '小计(元)', width: 200 },
        ],
        //地区选项
        regionOptions: [
          { id:'r0001', name: '市区与未提及区域', fillFee: 0, constructionFee: 0 },
          { id:'r0002', name: '眉山', fillFee: 100, constructionFee: 300 },
          { id:'r0003', name: '彭山', fillFee: 100, constructionFee: 240 },
          { id:'r0004', name: '彭州', fillFee: 100, constructionFee: 280 },
          { id:'r0005', name: '仁寿', fillFee: 100, constructionFee: 320 },
          { id:'r0006', name: '青白江', fillFee: 100, constructionFee: 220 },
          { id:'r0007', name: '蒲江', fillFee: 200, constructionFee: 300 },
          { id:'r0008', name: '雅安', fillFee: 300, constructionFee: 500 },
          { id:'r0009', name: '邛崃', fillFee: 200, constructionFee: 200 },
          { id:'r0010', name: '大邑', fillFee: 200, constructionFee: 200 },
          { id:'r0011', name: '德阳广汉', fillFee: 150, constructionFee: 220 },
          { id:'r0012', name: '都江堰', fillFee: 150, constructionFee: 240 },
          { id:'r0013', name: '简阳', fillFee: 100, constructionFee: 260 }
        ]
      }
    },
    methods: {
      onSubmit() {
        if(!this.chooseShow){
          this.chooseShow = true
          this.handleConstructionTypeChange(this.calcuForm.method)
        }else{
          this.generateSummary()
        }
        
      },
      // 生成湿式铺设数据
      generateWetData() {
        return [
          // 地暖管道
          {
            name: '地暖管道',
            field: 'floorHeatingPipe',
            items: [
              { id:'20001',productName: 'PE-RT双色管（红白色）[Φ16]', settlementPrice: 17.02, terminalPrice: 29.09 },
              { id:'20002',productName: '超导热PE-RT（浅青色）[Φ16]', settlementPrice: 27.69, terminalPrice: 45.12 },
              { id:'20003',productName: 'PE-RT内阻氧（五层红色）[Φ16]', settlementPrice: 35.59, terminalPrice: 53.56 },
              { id:'20004',productName: 'PE-Xc外阻氧（三层本色）[Φ16]', settlementPrice: 66.53, terminalPrice: 80.00 }
            ]
          },
          // 分集水器
          {
            name: '分集水器',
            field: 'manifold',
            items: [
              { id:'20005',productName: 'MND-黄铜大流量分集水器[DN25]', settlementPrice: 20.16, terminalPrice: 30.34 },
              { id:'20006',productName: 'MND-不锈钢方形分集水器[DN32]', settlementPrice: 29.25, terminalPrice: 45.00 },
              { id:'20007',productName: 'DN25黄铜智能分集水器[DN25]', settlementPrice: 9.24, terminalPrice: 15.79 },
              { id:'20008',productName: '黄铜双球阀分集水器[DN25]', settlementPrice: 11.76, terminalPrice: 23.52 }
            ]
          },
          // 进回水套阀
          {
            name: '进回水套阀',
            field: 'waterValve',
            items: [
              { id:'20009',productName: '高柄黄铜供回水排污套阀[DN25]', settlementPrice: 5.31, terminalPrice: 8.85 },
              { id:'20010',productName: '高柄白金供回水排污套阀[DN25]', settlementPrice: 5.31, terminalPrice: 8.85 },
              { id:'20011',productName: '小扳手进回水过滤排污套阀[DN25]', settlementPrice: 4.11, terminalPrice: 6.50 },
              { id:'20012',productName: '角式过滤器进回水套阀[DN25]', settlementPrice: 3.66, terminalPrice: 5.50 },
              { id:'20013',productName: '角式进回水套阀[DN25]', settlementPrice: 2.06, terminalPrice: 3.52 }
            ]
          },
          // 末端排气阀
          {
            name: '末端排气阀',
            field: 'exhaustValve',
            items: [
              { id:'20014',productName: '自动末端排气泄水阀', settlementPrice: 2.20, terminalPrice: 3.76 },
              { id:'20015',productName: 'MND-黄铜末端自动排气（泄水）阀', settlementPrice: 3.09, terminalPrice: 4.66 },
              { id:'20016',productName: 'MND-白金末端自动排气（泄水）阀', settlementPrice: 3.09, terminalPrice: 4.66 }
            ]
          },
          // 温控器
          {
            name: '温控器',
            field: 'thermostat',
            items: [
              { id:'20017',productName: '智能温控器', settlementPrice: 2.66, terminalPrice: 4.55 },
              { id:'20018',productName: '触摸温控器', settlementPrice: 7.22, terminalPrice: 11.75 },
              { id:'20019',productName: 'WiFi-触摸温控器', settlementPrice: 12.89, terminalPrice: 19.82 },
              { id:'20020',productName: 'MND-WiFi智能白色温控器', settlementPrice: 10.44, terminalPrice: 15.71 }
            ]
          },
          // 执行器
          {
            name: '执行器',
            field: 'actuator',
            items: [
              { id:'20021',productName: 'MND-蓝帽执行器（常闭）', settlementPrice: 9.45, terminalPrice: 14.22 },
              { id:'20022',productName: '电热执行器（常闭）', settlementPrice: 3.32, terminalPrice: 5.68 }
            ]
          },
          // 湿铺保温板
          {
            name: '湿铺保温板',
            field: 'insulationBoard',
            items: [
              { id:'20023',productName: '挤塑板', settlementPrice: 5.51, terminalPrice: 9.42 },
              { id:'20024',productName: '高密白晶挤塑板', settlementPrice: 9.39, terminalPrice: 15.30 },
              { id:'20025',productName: '高密0甲醛钻石挤塑板', settlementPrice: 17.37, terminalPrice: 26.13 }
            ]
          },
          // 反射膜
          {
            name: '反射膜',
            field: 'reflectiveFilm',
            items: [
              { id:'20026',productName: '镜面5丝反射膜', settlementPrice: 0.95, terminalPrice: 1.80 },
              { id:'20027',productName: '三层阻氧5丝纯铝反射膜', settlementPrice: 1.52, terminalPrice: 2.80 },
              { id:'20028',productName: '五层阻氧8丝纯铝反射膜', settlementPrice: 2.27, terminalPrice: 3.87 }
            ]
          },
          // 硅晶网
          {
            name: '硅晶网',
            field: 'siliconMesh',
            items: [
              { id:'20029',productName: '环保特粗硅晶网', settlementPrice: 2.31, terminalPrice: 3.48 },
              { id:'20030',productName: '环保粗丝硅晶网', settlementPrice: 1.05, terminalPrice: 1.79 }
            ]
          },
          // 分集水器箱
          {
            name: '分集水器箱',
            field: 'manifoldBox',
            items: [
              { id:'20031',productName: '烤漆分集水器箱', settlementPrice: 2.25, terminalPrice: 3.85 },
              { id:'20032',productName: '不锈钢分集水器箱', settlementPrice: 4.57, terminalPrice: 9.14 }
            ]
          }
        ]
      },
      // 生成干式铺设数据
      generateDryData() {
        return [
          // 地暖管道
          {
            name: '地暖管道',
            field: 'floorHeatingPipe',
            items: [
              { id:'10001',productName: 'PE-RT双色管（红白色）[Φ16]', settlementPrice: 17.02, terminalPrice: 29.09 },
              { id:'10002',productName: '超导热PE-RT（浅青色）[Φ16]', settlementPrice: 27.69, terminalPrice: 45.12 },
              { id:'10003',productName: 'PE-RT内阻氧（五层红色）[Φ16]', settlementPrice: 35.59, terminalPrice: 53.56 },
              { id:'10004',productName: 'PE-Xc外阻氧（三层本色）[Φ16]', settlementPrice: 66.53, terminalPrice: 80.00 }
            ]
          },
          // 分集水器
          {
            name: '分集水器',
            field: 'manifold',
            items: [
              { id:'10005',productName: 'MND-黄铜大流量分集水器[DN25]', settlementPrice: 20.16, terminalPrice: 30.34 },
              { id:'10006',productName: 'MND-不锈钢方形分集水器[DN32]', settlementPrice: 29.25, terminalPrice: 45.00 },
              { id:'10007',productName: 'DN25黄铜智能分集水器[DN25]', settlementPrice: 9.24, terminalPrice: 15.79 },
              { id:'10008',productName: '黄铜双球阀分集水器[DN25]', settlementPrice: 11.76, terminalPrice: 23.52 }
            ]
          },
          // 进回水套阀
          {
            name: '进回水套阀',
            field: 'waterValve',
            items: [
              { id:'10009',productName: '高柄黄铜供回水排污套阀[DN25]', settlementPrice: 5.31, terminalPrice: 8.85 },
              { id:'10010',productName: '高柄白金供回水排污套阀[DN25]', settlementPrice: 5.31, terminalPrice: 8.85 },
              { id:'10011',productName: '小扳手进回水过滤排污套阀[DN25]', settlementPrice: 4.11, terminalPrice: 6.50 },
              { id:'10012',productName: '角式过滤器进回水套阀[DN25]', settlementPrice: 3.66, terminalPrice: 5.50 },
              { id:'10013',productName: '角式进回水套阀[DN25]', settlementPrice: 2.06, terminalPrice: 3.52 }
            ]
          },
          // 末端排气阀
          {
            name: '末端排气阀',
            field: 'exhaustValve',
            items: [
              { id:'10014',productName: '自动末端排气泄水阀', settlementPrice: 2.20, terminalPrice: 3.76 },
              { id:'10015',productName: 'MND-黄铜末端自动排气（泄水）阀', settlementPrice: 3.09, terminalPrice: 4.66 },
              { id:'10016',productName: 'MND-白金末端自动排气（泄水）阀', settlementPrice: 3.09, terminalPrice: 4.66 }
            ]
          },
          // 温控器
          {
            name: '温控器',
            field: 'thermostat',
            items: [
              { id:'10017',productName: '智能温控器', settlementPrice: 2.66, terminalPrice: 4.55 },
              { id:'10018',productName: '触摸温控器', settlementPrice: 7.22, terminalPrice: 11.75 },
              { id:'10019',productName: 'WiFi-触摸温控器', settlementPrice: 12.89, terminalPrice: 19.82 },
              { id:'10020',productName: 'MND-WiFi智能白色温控器', settlementPrice: 10.44, terminalPrice: 15.71 }
            ]
          },
          // 执行器
          {
            name: '执行器',
            field: 'actuator',
            items: [
              { id:'10021',productName: 'MND-蓝帽执行器（常闭）', settlementPrice: 9.45, terminalPrice: 14.22 },
              { id:'10022',productName: '电热执行器（常闭）', settlementPrice: 3.32, terminalPrice: 5.68 }
            ]
          },
          // 干铺地暖模块
          {
            name: '干铺地暖模块',
            field: 'dryFloorModule',
            items: [
              { id:'10023',productName: '超薄高密度环保纯铝地暖模块[Φ16]', settlementPrice: 30.00, terminalPrice: 38.16 },
              { id:'10024',productName: '超薄高密度环保加厚纯铝地暖模块[Φ16]', settlementPrice: 53.49, terminalPrice: 66.87 },
              { id:'10025',productName: '高密度石墨烯超导模块', settlementPrice: 47.18, terminalPrice: 59.72 }
            ]
          },
          // 分集水器箱
          {
            name: '分集水器箱',
            field: 'manifoldBox',
            items: [
              { id:'10026',productName: '烤漆分集水器箱', settlementPrice: 2.25, terminalPrice: 3.85 },
              { id:'10027',productName: '不锈钢分集水器箱', settlementPrice: 4.57, terminalPrice: 9.14 },
              { id:'10028',productName: '地暖环保三件套', settlementPrice: 2.82, terminalPrice: 4.82 }
            ]
          }
        ]
      },
      // 切换铺设方式
      handleConstructionTypeChange(type) {
        // 根据铺设方式过滤品类
        this.filteredCategories = this.excelData[type] || [];
        
        // 初始化表单字段
        this.filteredCategories.forEach(category => {
          this.$set(this.calcuForm, category.field, null);
        });

        // 设置默认项目
        if (type === 'wet') {
          this.defaultItems = [
            { id:'30001',productName: '地暖环保六件套', settlementPrice: 4.03, terminalPrice: 6.90 },
            { id:'30002',productName: '主管道25平米', settlementPrice: 3.38, terminalPrice: 5.78 },
            { id:'30003',productName: '挂网米石回填（麻面）', settlementPrice: 22, terminalPrice: 22 },
            { id:'30004',productName: '精细化施工管理费', settlementPrice: 22, terminalPrice: 22 }
          ];
        } else {
          this.defaultItems = [
            { id:'30005',productName: '主管道25平米', settlementPrice: 3.38, terminalPrice: 5.78 },
            { id:'30006',productName: '精细化施工管理费', settlementPrice: 20, terminalPrice: 20 }
          ];
        }
      },
      //切换铺设方式
      changeMethod(){
        this.chooseShow = false
      },
      // 生成结算单
      generateSummary() {
        this.summaryData = [];
        // 添加选择的产品
        this.filteredCategories.forEach(category => {
          let value = this.calcuForm[category.field];
          let item = value? category.items.find(item => item.id === value): {}
          if (value) {
            this.summaryData.push({
              id: item.id,
              value: value,
              productName: item.productName,
              unit: '元/m²', // 默认项目按平米计算
              terminalPrice: item.terminalPrice.toFixed(2),
              terminalAllPrice: (item.terminalPrice * this.calcuForm.area).toFixed(2),
              settlementPrice: item.settlementPrice.toFixed(2),
              settlementAllPrice: (item.settlementPrice * this.calcuForm.area).toFixed(2),
            });
          }
        });
        // 添加默认项目
        this.defaultItems.forEach(item => {
          this.summaryData.push({
            id: item.id,
            productName: item.productName,
            settlementPrice: item.settlementPrice.toFixed(2),
            settlementAllPrice: (item.settlementPrice * this.calcuForm.area).toFixed(2),
            terminalPrice: item.terminalPrice.toFixed(2),
            terminalAllPrice: (item.terminalPrice * this.calcuForm.area).toFixed(2),
            unit: '元/m²' // 默认项目按平米计算
          });
        });
        //添加区域施工费用
        if(this.calcuForm.region){
          let regionData = this.regionOptions.find(item => item.id == this.calcuForm.region);
          this.summaryData.push({
            id: regionData.id,
            productName: '回填远程费',
            settlementPrice: regionData.fillFee,
            settlementAllPrice: regionData.fillFee,
            terminalPrice: regionData.fillFee,
            terminalAllPrice: regionData.fillFee,
            unit: '元' 
          },{
            id: regionData.id,
            productName: '施工远程费',
            settlementPrice: regionData.constructionFee,
            settlementAllPrice: regionData.constructionFee,
            terminalPrice: regionData.constructionFee,
            terminalAllPrice: regionData.constructionFee,
            unit: '元' 
          });
        }
        //添加跨层费用
        if(this.calcuForm.crossLayer == '2'){
          this.summaryData.push({
            id: 'kc',
            productName: '跨层费',
            settlementPrice: 2.00,
            settlementAllPrice: 2.00,
            terminalPrice: 2.00,
            terminalAllPrice: 2.00,
            unit: '元/m²' 
          })
        }
        console.log(this.summaryData)
        this.summaryColumns = this.defaultColumns
        this.showSummary = true;

      },
      //表格合计列
      getTableSummaries(param){
        const { columns, data } = param;
        console.log(columns, data)
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          console.log(values);
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2) + ' 元';
          } else {
            sums[index] = '--';
          }
        });

        return sums;
      },
      //管理员查看
      handleAdminView(){
        if (this.showSettlement) {
          this.showSettlement = false;
          this.summaryColumns = this.defaultColumns
          return;
        }
        
        this.$prompt('请输入管理员密码', '权限验证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password',
          inputPattern: /^.{6,}$/,
          inputErrorMessage: '密码至少6位字符'
        }).then(({ value }) => {
          if (value === this.password) {
            this.setAdminColumn()
          } else {
            this.$message.error('密码错误，请重试');
          }
        }).catch(() => {
          // this.$message.info('已取消操作');
        });
      },
      setAdminColumn() {
        this.showSettlement = true
        this.summaryColumns = [...this.defaultColumns, ...this.adminColumn]
      }
    },
}
</script>

<style lang="scss" scoped>
.calculator-index{
  width: 50%;
  margin: 0 auto;
  box-shadow: 0 3px 15px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 15px 25px;
  font-size: 16px;
  .logo {
    width: 80px;
    float: left;
  }
  .calcu-form {
    margin-top: 40px;
  }
  .calcu-form .form-item {
    width: 85%;
  }
  .submit-button {
    margin-bottom: 40px;
    margin-top: 30px;
    width: 30%;
  }
}

</style>
