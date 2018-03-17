<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Row>
            <Col span="14">
                <Card class='own-space'>
                    <p slot="title">
                        <Icon type="person"></Icon>
                        个人信息
                    </p>
                    <div>
                        <Form 
                            ref="userForm"
                            :model="userForm" 
                            :label-width="100" 
                            label-position="right"
                            :rules="inforValidate"
                        >
                            <FormItem label="用户姓名：">
                                <div style="display:inline-block;width:300px;">
                                    <span>{{ userForm.name }}</span>
                                </div>
                            </FormItem>
                            <FormItem label="用户手机：" prop="cellphone" >
                                <div style="display:inline-block;width:300px;">
                                    <Input v-model="userForm.cellphone"></Input>
                                </div>
                            </FormItem>
                            <FormItem label="用户邮箱：" prop="email">
                                <div style="display:inline-block;width:300px;">
                                    <Input v-model="userForm.email"></Input>
                                </div>
                            </FormItem>
                            <FormItem label="部门：">
                                <RadioGroup v-model="userForm.department" type="button">
                                    <Radio label="水位监控"></Radio>
                                    <Radio label="井盖维护"></Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="登录密码：">
                                <Button type="text" style="color: green; margin-left: -15px;" @click="showEditPassword">修改密码</Button>
                            </FormItem>
                            <div>
                                <Button type="info" style="width: 100px;margin:0 60px;" @click="cancelEditUserInfor">取消</Button>
                                <Button type="success" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                            </div>
                        </Form>
                    </div>
                </Card>
                <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
                    <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
                    <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                        <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                            <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                        </FormItem>
                        <FormItem label="新密码" prop="newPass">
                            <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                        </FormItem>
                        <FormItem label="确认新密码" prop="rePass">
                            <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button type="text" @click="cancelEditPass">取消</Button>
                        <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
                    </div>
                </Modal>
            </Col>
            <Col span="10">
                <Card class='access'>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">
                        <p>当前用户权限值:<b>{{ accessCode }}</b></p>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                name: '',
                cellphone: '',
                email: '',
                department: ''
            },
            // 权限
            accessCode: parseInt(Cookies.get('access')),
            switchValue: parseInt(Cookies.get('access')) === 1,
            uid: '', // 登录用户的userId
            save_loading: false,
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            // checkIdentifyCodeLoading: false,
            inforValidate: {
                cellphone: [
                    { validator: validePhone }
                ],
                email: [
                    {type: 'email', message: '邮箱格式不规范', trigger: 'blur'}
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        showEditPassword () {
            this.editPasswordModal = true;
        },
        // 取消修改个人信息，返回主页
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        // 保存修改
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    let data = {
                        'username': Cookies.get('user'),
                        'phoneNumber': this.userForm.cellphone,
                        'email': this.userForm.email,
                        'department': this.userForm.department
                    }
                    this.$ajax.post('http://localhost/sewerPHP/save-own-message.php',
                        {
                            data: data
                        },
                        {
                            // 允许跨域
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    ).then(res => {
                        console.log(res.data)
                        if (res.data === 1) {
                            this.saveInfoAjax()
                        } else {
                            this.$Message.error('保存失败，服务器错误')
                        }
                    })
                }
            })
        },
        // 取消修改密码
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        // 保存密码更改
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    let data = {
                        'username': Cookies.get('user'),
                        'password': this.editPasswordForm.newPass
                    }
                    this.$ajax.post('http://localhost/sewerPHP/save-password.php',
                        {
                            data: data
                        },
                        {
                            // 允许跨域
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    ).then(res => {
                        if (res.data === 1) {
                            this.saveInfoAjax()
                        } else {
                            this.$Message.error('保存失败，服务器错误')
                        }
                    })
                }
            });
        },
        // 初始化，获取用户信息
        init () {
            let data = {'username': Cookies.get('user')}
            this.$ajax.post('http://localhost/sewerPHP/own-space.php',
                {
                    data: data
                },
                {
                    // 允许跨域
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(response => {
                let res = response.data[0]
                this.userForm.name = res.username;
                this.userForm.cellphone = res.phoneNumber;
                this.userForm.email = res.email;
                this.userForm.department = res.department;
            })
        },
        // 保存修改个人信息
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.success('保存成功');
                this.save_loading = false;
            }, 1000);
        }
    },
    // 用户头像
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    mounted () {
        // 跨域问题，暂时注释
        this.init();
    }
};
</script>
