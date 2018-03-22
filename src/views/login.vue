
<style lang="less">
    @import './login.less';
</style>

<template>
    <div id="login-register-wrap">

        <!-- 主背景 -->
        <div id="top-content">
            <div id="inner-content">
                <img id="logo" src="../images/logo.png" alt="logo">
                <h1>智能下水道监测系统</h1>
                <h2><strong>S</strong>mart <strong>S</strong>ewer <strong>M</strong>onitoring <strong>S</strong>ystem</h2>
                <div id="description">
                    <p>远离城市内涝 人人放心出行</p>
                </div>
                
                <button @click="modalLogin=true" class="btn-red">登录</button>
                <button @click="modalRegister=true" class="btn-red btn-reg">注册</button>
            </div>
        </div>

        <!-- 登录 -->
        <modal v-model='modalLogin'
            title='立即登录'>
                
            <div slot="header">
                <Icon type="log-in" size="18"></Icon>
                <span>立即登录</span>
            </div>
            <div>
	        	<Form ref="loginForm" :model="loginItem" :rules="loginRules">
	    	        <FormItem prop="username">
	    	            <Input type="text" v-model="loginItem.username" placeholder="用户名">
	    	                <Icon type="ios-person" slot="prepend"></Icon>
	    	            </Input>
	    	        </FormItem>
	    	        <FormItem prop="password">
	    	            <Input type="password" v-model="loginItem.password" placeholder="密码">
	    	                <Icon type="ios-locked" slot="prepend"></Icon>
	    	            </Input>
	    	        </FormItem>
	    	        <FormItem>
	    	        	<input type="reset" class="btn-red btn-transperant btn-form">
	    	            <button class="btn-red btn-submit btn-form" @click="toLogin('loginForm')">登录</button>
	    	        </FormItem>
	    	    </Form>
            </div>
            <div slot="footer"></div>
        </modal>


        <!-- 注册 -->
        <modal
            v-model='modalRegister'
            title='立即注册'>
                
            <div slot="header">
                <Icon type="log-in" size="18"></Icon>
                <span>立即注册</span>
            </div>
            <div>
    	    	<Form ref="registerForm" :model="registerItem" :rules="registerRules">
    		        <FormItem prop="newUsername">
    		            <Input type="text" v-model="registerItem.newUsername" placeholder="用户名">
    		                <Icon type="ios-person" slot="prepend"></Icon>
    		            </Input>
    		        </FormItem>
    		        <FormItem prop="newPassword">
    		            <Input type="password" v-model="registerItem.newPassword" placeholder="密码">
    		                <Icon type="ios-locked" slot="prepend"></Icon>
    		            </Input>
    		        </FormItem>
    		        <FormItem prop="newPassword">
    		            <Input type="tel" v-model="registerItem.phoneNumber" placeholder="联系电话">
    		                <Icon type="ios-telephone" slot="prepend"></Icon>
    		            </Input>
    		        </FormItem>
    		        <FormItem prop="newPassword">
    		            <Input type="email" v-model="registerItem.email" placeholder="邮箱">
    		                <Icon type="ios-email" slot="prepend"></Icon>
    		            </Input>
    		        </FormItem>
    		         部门
    		         <RadioGroup v-model="registerItem.department" type="button">
    		            <Radio label="水位监控"></Radio>
    		            <Radio label="井盖维护"></Radio>
    		        </RadioGroup>
    		         
    		         管理员 
    		         <RadioGroup v-model="registerItem.isManager" type="button">
    		            <Radio label="是"></Radio>
    		            <Radio label="否"></Radio>
    		        </RadioGroup>
    		        <FormItem>
    		        	<input type="reset" class="btn-red btn-transperant btn-form">
                    	<button class="btn-red btn-submit btn-form" @click="toRegister('registerForm')">注册</button>
    		        </FormItem>
    		    </Form>
            </div>
            <div slot="footer"></div>
        </modal>
        
    </div>
</template>

<script>
	import Cookies from 'js-cookie';
    export default{
        data(){
            const validePhone = (rule, value, callback) => {
                var re = /^1[0-9]{10}$/;
                if (!re.test(value)) {
                    callback(new Error('请输入正确格式的手机号'));
                } else {
                    callback();
                }
            };
            return {
            	// modal显示与否
            	modalLogin: false,
            	modalRegister: false,

            	// 表单中v-model绑定的初始值
                userId:0,
            	loginItem: {
            		username:'',
            		password:''
            	},
            	registerItem: {
            		newUsername:'',
            		newPassword:'',
            		phoneNumber:'',
            		email:'',
            		department:'',
            		isManager:''
            	},
            	// 表单验证规则
            	loginRules: {
            		username: [
            			{required: true, message: '请填写用户名', trigger: 'blur'},
            			{type:'string', min: 2, message: '用户名不能小于2位', trigger: 'blur'}
            		],
            		password: [
            			{required: true, message: '请输入密码', trigger: 'blur'},
            			{type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
            		]
            	},
            	registerRules: {
            		newUsername: [
            			{required: true, message: '请填写用户名', trigger: 'blur'}
            		],
            		newPassword: [
            			{required: true, message: '请输入密码', trigger: 'blur'},
            			{type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
            		],
                    phoneNumber: [
                        { validator: validePhone }
                    ],
            		email: [
            			{type: 'email', message: '邮箱格式不规范', trigger: 'blur'}
            		]
            	}
            }
        },
        mounted(){
         /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
           if(Cookies.get('this.loginItem.username')){
               this.$router.push('/home')
           }
        },
        methods: {
            toLogin: function(name){
            	this.$refs[name].validate((valid) => {
            		if (!valid) {
            			this.$Message.error('登录失败，请正确填写登录信息');
            		} else {
            			let username = this.loginItem.username
            			let password = this.loginItem.password
            			/*接口的传值是(-1,该用户不存在),(0,密码错误)*/
            			let data = {'username':username, 'password': password}
            			this.$ajax.post('http://localhost/sewer-system/sewerPHP/login.php', 
        			        {
        			            data:data
        			        },
        			        {
        			            // 允许跨域
        			            headers: {
        			                'Content-Type': 'application/x-www-form-urlencoded'
        			            }
        			        }
        			    ).then(res => {
        			        console.log(res.data)
        			        if (res.data === -2) {
        			            this.$Message.error('该用户不存在');
        			        } else if (res.data === -1) {
        			            this.$Message.error('密码输入错误');
        			        } else {
        			        	Cookies.set('user', username)
        			        	Cookies.set('password', password)
                                
                                // 管理员权限
                                if (res.data === 0) {
                                    Cookies.set('access', 0)           // 管理员
                                } else {
                                    Cookies.set('access', 1)           // 非管理员
                                }

        			        	this.$store.commit('setAvator', 'http://img1.imgtn.bdimg.com/it/u=2786575315,1949106214&fm=27&gp=0.jpg');
    			                this.$router.push({
    			                	name: 'home_index'
    			                })
        			        }
        			    })
            		}
            	})
            },
            toRegister: function(name){
               this.$refs[name].validate((valid) => {
            		if (!valid) {
            			this.$Message.error('登录失败，请正确填写登录信息');
            		} else {
	                    let data = {
	                        'userId':this.userId,
	                        'newUsername':this.registerItem.newUsername,
	                        'newPassword':this.registerItem.newPassword,
	                        'phoneNumber':this.registerItem.phoneNumber,
	                        'email':this.registerItem.email,
	                        'department':this.registerItem.department,
	                        'isManager': this.registerItem.isManager
	                    }
	                    this.$ajax.post('http://localhost/sewer-system/sewerPHP/register.php', 
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
	                            this.userId++
	                            this.modalRegister = false
	                            this.$Message.success('注册成功，请登录')
	                        } else{
	                            this.$Message.error('注册失败，服务器端出错')
	                        } 
	                    })
            		}
        	})
        }
    }
}
</script>
