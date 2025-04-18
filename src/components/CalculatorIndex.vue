<template>
  <div class="calculator-index">
    <img src="../assets/logo.jpg" class="logo" @click="handleAdminView" alt="">
    <h1>地暖计算器</h1>
    <div>
      <el-form :model="calcuForm" :rules="rules" ref="calcuForm" :label-position="'right'" class="calcu-form">
        <el-form-item label="所在地区:" prop="region">
          <el-select v-model="calcuForm.region" placeholder="请选择施工地区" class="form-item" @change="changeMethod">
            <el-option
              v-for="region in regionOptions"
              :key="region.id"
              :label="region.name"
              :value="region.id"
            >
            <span>{{ region.name }}</span>
            <span class="select-option-right">
              <span v-if="region.fillFee > 0 || region.constructionFee > 0">
                回填远程费: {{ region.fillFee }}元 / 施工远程费: {{ region.constructionFee }}元
              </span>
              <span v-else>不收取费用</span>
            </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋面积(m²):" prop="area">
          <el-input-number v-model="calcuForm.area" controls-position="right" :min="1" class="form-item" ></el-input-number>
        </el-form-item>
        <el-form-item label="铺设方式:" prop="method">
          <el-select v-model="calcuForm.method" placeholder="请选择铺设方式" class="form-item" @change="changeMethod">
            <el-option label="湿式铺设" value="wet"></el-option>
            <el-option label="干式铺设" value="dry"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否跨层:" prop="crossLayer">
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
                  <span class="select-option-right">
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
      <!-- 系统优化表格 -->
      <div class="optimize-table" v-if="showOtherTable">
        <el-table
          :data="optimizeData"
          :props="optimizeColumns"
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
            v-for="column in optimizeColumns"
            :key="column.id"
            :prop="column.prop"
            :label="column.label"
          >
            <template slot-scope="scope">
              <!-- 型号 -->
              <template v-if="scope.column.property == 'model'">
                <el-select 
                  v-model="row.selectedModel" 
                  placeholder="请选择型号"
                  @change="handleModelChange(row)"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in row.models"
                    :key="item.id"
                    :label="`${item.model} (建议零售价: ¥${item.suggestedPrice})`"
                    :value="item.id"
                  >
                    <span>{{ item.model }}</span>
                    <span class="select-option-right">
                      建议零售价: ¥{{ item.suggestedPrice }}
                    </span>
                  </el-option>
                </el-select>
              </template>
              <!-- 数量 -->
              <span v-else-if="scope.column.property === 'quantity'">

              </span>
              <!-- 销售价小计 -->
              <span v-else-if="scope.column.property === 'suggestedPrice'">

              </span>
              <span v-else>
                {{scope.row}}
                {{ scope.row[scope.column.property] }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button @click="showOther()" class="other-button">选择系统优化项目</el-button>
      <el-button type="primary" @click="onSubmit()" class="submit-button">{{ chooseShow ? '生成结算单':'确定信息' }}</el-button>
    </div>
  </div>
</template>

<script>
import { region, wetData, dryData, wetDefaultData, dryDefaultData, optimizeData } from '@/util/data.js';
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
          wet: wetData,
          dry: dryData
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
        regionOptions: region,  
        //优化产品数据源
        optimizeExcelData: optimizeData,
        //系统优化show
        showOtherTable: false,
        //系统优化数据
        optimizeData: [],
        optimizeColumns: [
          { prop: 'category', id: 'category', label: '产品名称', 'min-width': 300 },
          { prop: 'model', id: 'model', label: '型号', 'min-width': 300 },
          { prop: 'quantity', id: 'quantity', label: '数量', width: 200 },
          { prop: 'packagePrice', id: 'packagePrice', label: '单价', width: 200 },
          { prop: 'suggestedPrice', id: 'suggestedPrice', label: '小计(元)', width: 200 },
        ]
      }
    },
    methods: {
      onSubmit() {
        this.$refs['calcuForm'].validate((valid) => {
          if (valid) {
            if(!this.chooseShow){
              this.chooseShow = true
              this.handleConstructionTypeChange(this.calcuForm.method)
            }else{
              this.generateSummary()
            }
          }else {
            this.$message.error('请填写完整');
            return false;
          }
        })
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
        if (type === 'wet') this.defaultItems = wetDefaultData
        else this.defaultItems = dryDefaultData
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
            settlementPrice: '-',
            settlementAllPrice: regionData.fillFee,
            terminalPrice: '-',
            terminalAllPrice: regionData.fillFee,
            unit: '元' 
          },{
            id: regionData.id,
            productName: '施工远程费',
            settlementPrice: '-',
            settlementAllPrice: regionData.constructionFee,
            terminalPrice: '-',
            terminalAllPrice: regionData.constructionFee,
            unit: '元' 
          });
        }
        //添加跨层费用
        if(this.calcuForm.crossLayer == '1'){
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
      },
      //显示系统优化table
      showOther(){
        this.showOtherTable = !this.showOtherTable
        if(this.showOtherTable) this.getOptimizeTableData()
      },
      getOptimizeTableData(){
        this.optimizeData = this.optimizeExcelData.map(category => ({
          category: category.category,
          models: category.items,
          selectedModel: '',
          packagePrice: 0,
          suggestedPrice: 0,
          quantity: 1,
          total: 0,
          isCategoryRow: true
        }));
        console.log(this.optimizeData)
      },
      handleModelChange(row) {
        const selectedItem = row.models.find(item => item.model === row.selectedModel);
        if (selectedItem) {
          row.packagePrice = selectedItem.packagePrice;
          row.suggestedPrice = selectedItem.suggestedPrice;
        }
      },
    },
}
</script>

<style lang="scss" scoped>
/* 针对手机（宽度小于 768px） */
@media (max-width: 767px) {
  .calculator-index {
    width: 80%;
  }
}
@media (min-width: 768px) {
  .calculator-index {
    width: 50%;
  }
}
.calculator-index{
  margin: 0 auto;
  box-shadow: 0 3px 15px rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 15px 25px;
  font-size: 16px;
  .logo {
    width: 80px;
    height: 55px;
    float: left;
  }
  .calcu-form {
    margin-top: 40px;
    ::v-deep .el-form-item .el-form-item__label {
      width: 120px !important;
    }
  }
  .calcu-form .form-item {
    width: 80%;
  }
  .submit-button {
    margin-bottom: 40px;
    margin-top: 30px;
    width: 30%;
  }
}
.select-option-right {
  float: right; 
  color: #8492a6; 
  font-size: 13px;
}
</style>
