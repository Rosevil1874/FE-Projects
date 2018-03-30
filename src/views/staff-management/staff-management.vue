<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <div id="staff-card">
                <Card>
                    <span slot="title">
                        <button class="btn" @click="addItemModal = true">新增</button>
                    </span>
                    <span slot="title">
                        <Input v-model="searchConName" icon="search" @on-change="handleSearch" placeholder="请输入姓名搜索..." style="width: 180px; float: right;" />
                    </span>
                    <span slot="title" style="float: right;">
                        选择部门： 
                        <RadioGroup v-model="department" type="button" @on-change="selectDepartment">
                            <Radio label="水位监控"></Radio>
                            <Radio label="井盖维护"></Radio>
                        </RadioGroup>
                    </span>
                    
                    <div class="edittable-table-height-con">
                        <can-edit-table v-model="editData" :columns-list="editColumns" @on-change="handleChange" @on-delete="handleDel"></can-edit-table>
                    </div>

                    <!-- 分页组件 -->
                    <Page :total="itemTotal" :page-size='pageSize' show-total @on-change="handlePage"></Page>
                </Card>
            </div>
            
        </Row>
        <!-- 新增条目模态窗口 -->
        <Modal v-model="addItemModal" :width="550">
            <h3 slot="header" style="color:#2D8CF0">新增员工</h3>
            <Form ref="addItemForm" :model="addItemForm" :rules="addItemRules" style="padding: 0 50px;">
                <FormItem prop="username">
                    <Input type="text" v-model="addItemForm.username" placeholder="用户名">
                        <Icon type="ios-person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="phoneNumber">
                    <Input type="tel" v-model="addItemForm.phoneNumber" placeholder="联系电话">
                        <Icon type="ios-telephone" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="email">
                    <Input type="email" v-model="addItemForm.email" placeholder="邮箱">
                        <Icon type="ios-email" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                 部门
                 <RadioGroup v-model="addItemForm.department" type="button">
                    <Radio label="水位监控"></Radio>
                    <Radio label="井盖维护"></Radio>
                </RadioGroup>
                 
                 管理员 
                 <RadioGroup v-model="addItemForm.isManager" type="button">
                    <Radio label="是"></Radio>
                    <Radio label="否"></Radio>
                </RadioGroup>
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
import canEditTable from './components/canEditTable.vue';
import tableData from './components/table_data.js';
export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        return {
            // 初始化
        	department: '',
            searchConName: '',
            editColumns: [],
            editData: [],
            tempData: [],
            totalData: [],

            // 新增条目模态框
            addItemModal: false,
            addItemForm: {
                username: '',
                phoneNumber: '',
                email: '',
                newDepartment: '',
                isManager: ''
            },
            addItemRules: {
                username: [
                    {required: true, message: '请填写用户名', trigger: 'blur'}
                ],
                phoneNumber: [
                    { validator: validePhone }
                ],
                email: [
                    {type: 'email', message: '邮箱格式不规范', trigger: 'blur'}
                ]
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
            this.$ajax.get('http://localhost/sewer-system/sewerPHP/staff-management/getStaff.php')
                .then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        let obj = {
                            name: res.data[i].username,
                            department: res.data[i].department,
                            isManager: res.data[i].isManager,
                            tel: res.data[i].phoneNumber,
                            email: res.data[i].email
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
            this.editData = this.search(this.editData, {name: this.searchConName});
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        selectDepartment () {
        	this.editData = this.tempData
            this.editData = this.search(this.editData, {department: this.department});
        },
        addItem (name) {
            this.$refs[name].validate((valid) => {
                if (!valid) {
                    this.$Message.error('新增员工失败，请正确填写信息');
                } else {
                    let data = {
                        'username':this.addItemForm.username,
                        'phoneNumber':this.addItemForm.phoneNumber,
                        'email':this.addItemForm.email,
                        'department':this.addItemForm.department,
                        'isManager': this.addItemForm.isManager
                    }
                    this.$ajax.post('http://localhost/sewer-system/sewerPHP/staff-management/add-staff.php', 
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
                }
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
        this.getData()
    }
};
</script>
