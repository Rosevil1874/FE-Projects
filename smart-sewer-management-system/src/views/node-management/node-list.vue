<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Card>
                <span slot="title">
                    <button class="btn" @click="addItemModal = true">新增</button>
                </span>
                <span slot="title">
                    <Input v-model="searchConName" icon="search" @on-change="handleSearch" placeholder="请输入编号搜索..." style="width: 180px; float: right;" />
                </span>
                <span slot="title" style="float: right;">
                    选择状态： 
                    <RadioGroup v-model="status" type="button" @on-change="selectStatus">
                        <Radio label="正常"></Radio>
                        <Radio label="预警"></Radio>
                        <Radio label="告警"></Radio>
                    </RadioGroup>
                </span>
                
                <div class="edittable-table-height-con">
                    <nodes-table v-model="editData" :columns-list="editColumns" @on-change="handleChange" @on-delete="handleDel"></nodes-table>
                </div>

                <!-- 分页组件 -->
                <Page :total="itemTotal" :page-size='pageSize' show-total @on-change="handlePage"></Page>
            </Card>
        </Row>

        <!-- 新增条目模态窗口 -->
        <Modal v-model="addItemModal" :width="500">
            <h3 slot="header" style="color:#2D8CF0">新增节点</h3>
            <Form ref="addItemForm" :model="addItemForm" :label-width="100" label-position="right">
                <FormItem label="编号">
                    <Input v-model="addItemForm.id" placeholder="" ></Input>
                </FormItem>
                <FormItem label="节点类型">
                    <Input v-model="addItemForm.type" placeholder="" ></Input>
                </FormItem>
                <FormItem label="监控点">
                    <Input v-model="addItemForm.monitor" placeholder="" ></Input>
                </FormItem>
                <FormItem label="详细地址">
                    <Input v-model="addItemForm.address" placeholder="" ></Input>
                </FormItem>
                <FormItem label="安装时间">
                     <DatePicker type="date" placeholder="install date" @on-change="installDate"></DatePicker>
                </FormItem>
                
                <FormItem style="float: right; margin-top: 30px;">
                    <input type="reset" class="btn btn-reset">
                    <button class="btn" @click="addItem('addItemForm')">保存</button>
                </FormItem>
            </Form>
                
            <!-- 把footer撑开用来显示form中浮动的两个按钮 -->
            <div slot="footer" style="height: 35px;"></div>
        </Modal>
    </div>
</template>

<script>
import nodesTable from './components/nodesTable.vue';
import tableData from './components/nodes_data.js';
export default {
    name: 'editable-table',
    components: {
        nodesTable
    },
    data () {
        return {
             // 初始化
            status:'',
            searchConName: '',
            editColumns: [],
            editData: [],
            tempData: [],

            // 新增条目模态框
            addItemModal: false,
            addItemForm: {
                id: '',
                address: '',
                type:'',
                monitor:'',
                installDate: ''
            },

            // 分页
            currentPage: 1,
            pageSize: 8,
            pageTotal: 0,
            itemTotal: 0         
        };
    },
    methods: {
        // 初始化获取表格数据
        getData () {
            let data = []
            this.$ajax.get('http://localhost/sewer-system/sewerPHP/monitor-management/getNodes.php')
                .then(res => {
                    console.log(res.data.length)
                    for (var i = 0; i < res.data.length; i++) {
                        let obj = {
                            deviceId: res.data[i].deviceId,
                            type: res.data[i].type,
                            monitor: res.data[i].monitor,
                            status: res.data[i].status,
                            address: res.data[i].address,
                            installDate: res.data[i].installDate,
                            description: res.data[i].description
                        }
                        data.push(obj)
                    }

                    // 保证initData在异步获取数据结束后执行
                    this.totalData = data
                    this.initData()
                })
        },
        initData () {
            this.itemTotal = this.totalData.length
            this.pageTotal = Math.ceil( this.itemTotal / this.pageSize )
            this.editColumns = tableData.editColumns;

            if (this.itemTotal < this.pageSize) {
                this.tempData = this.editData = this.totalData
            } else {
                this.tempData = this.editData = this.totalData.slice(0, this.pageSize)
            }
        },
        installDate (data){
            this.installDate = date
        },
        // 搜索 + 选择
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        handleSearch () {
            this.editData = this.tempData
            this.editData = this.search(this.editData, {deviceId: this.searchConName});
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        selectStatus () {
            this.editData = this.tempData
            this.editData = this.search(this.editData, {status: this.status});
        },

        // 添加新条目
        addItem (name) {
            let data = {
                'id':this.addItemForm.id,
                'address':this.addItemForm.address,
                'type':this.addItemForm.type,
                'monitor':this.addItemForm.monitor,
                'installDate': this.addItemForm.installDate
            }
            this.$ajax.post('http://localhost/sewer-system/sewerPHP/monitor-management/add-node.php', 
                    {
                        data:data
                    },
                    {
                        // 允许跨域
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).then( res => {
                    console.log(res.data);
                    if (res.data === 1) {
                        this.addItemModal = false
                        this.$Message.success('新增成功')
                        this.getData()
                    } else{
                        this.$Message.error('新增失败，服务器端出错')
                    } 
                    this.addItemModal = false
            })
        },

        // 分页
        handlePage(page) {
            if (this.itemTotal < page * this.pageSize) {
                this.tempData = this.editData = this.totalData.slice((page - 1) * this.pageSize, this.itemTotal);
            } else {
                this.tempData = this.editData = this.totalData.slice((page - 1) * this.pageSize, page * this.pageSize);
            }
        }
    },
    created () {
        this.getData();
    }
};
</script>
