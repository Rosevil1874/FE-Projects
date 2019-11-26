
<style lang="less">
    @import './detail.less';
</style>

<template>
    <div>
    	<Row>
    		<Col span="8">
    			<card class="options">
    				<p slot="title">
    				    <Icon type="flag"></Icon>
    				    {{ type }} - {{ id }}
    				</p>
                    <p slot="title"></p>
    				<div>
    					<Icon v-if='status==="正常"' type="happy" size=175 color='#64d572'></Icon>
    					<Icon v-if='status==="预警"' type="sad" size=175 color='#ffd572'></Icon>
    					<Icon v-if='status==="告警"' type="alert-circled" size=175 color='#f25e43'></Icon>
    					<table>
    						<tr>
    							<td>状态:</td>
    							<td>{{ status }}</td>
    						</tr>
    						<tr>
    							<td>事件:</td>
    							<td>{{ event ? event : '无' }}</td>
    						</tr>
    						<tr>
    							<td>区域:</td>
    							<td>{{ area }}</td>
    						</tr>
    						<tr>
    							<td>地址:</td>
    							<td>{{ address }}</td>
    						</tr>
    						<tr>
    							<td>负责人:</td>
    							<td>{{ principal }}</td>
    						</tr>
    						<tr>
    							<td>负责人电话:</td>
    							<td>{{ principalTel }}</td>
    						</tr>
    						<tr>
    							<td>备注:</td>
    							<td>{{ description ? description : '无' }}</td>
    						</tr>
    					</table>
    				</div>
    			</card>
    		</Col>
    		<Col span="16">
    			<card class="chart">
    				<p slot="title">
    				    <Icon type="podium"></Icon>
    				    状态走势
    				</p>
                    <p slot="title" style="width: 50%;">
                        <div class="datePicker">
                            <DatePicker type="date" placeholder="start date" style="width: 200px" @on-change="startDateChange"></DatePicker>
                            <DatePicker type="date" placeholder="end date" style="width: 200px" @on-change="endDateChange"></DatePicker>
                            <button @click="dateRangeChange"> {{ buttonMsg }} </button>
                        </div>
                    </p>
                    <component :is="waterView" v-if='type==="水位"'  :deviceId="id" :startDate="startDate" :endDate="endDate"></component>
                    <component :is="sewerView" v-if='type==="井盖"'  :deviceId="id" :startDate="startDate" :endDate="endDate"></component>
    			</card>
    		</Col>
    	</Row>
 		
    </div>
</template>

<script>
import waterLineChart from './components/waterLineChart.vue';
import waterLineChartRange from './components/waterLineChartRange.vue';
import sewerLineChart from './components/sewerLineChart.vue';
import sewerLineChartRange from './components/sewerLineChartRange.vue';
export default{
	components: {
		waterLineChart,
        waterLineChartRange,
		sewerLineChart,
        sewerLineChartRange
	},
    data(){
        return {
            // 动态子组件
            waterView: 'waterLineChart',
            sewerView: 'sewerLineChart',

            // 基本信息
        	id: '',
        	type: '',
        	status:'',
        	event:'',
        	area:'',
        	address:'',
        	principal:'',
        	principalTel:'',
        	description:'',

            // 日期选择
            startDate: '',
            endDate: '',
            reload: false,
            buttonMsg: '确定'
        }
    },
    methods: {
        startDateChange (date) {
            this.startDate = date
        },
        endDateChange (date) {
            this.endDate = date
        },
        dateRangeChange (){
            // 处理日期选择事件
            console.log(this.startDate)
            if (this.reload === false) {
                this.reload = true
                this.buttonMsg = '还原'
                if (this.type === '水位') {
                    this.waterView = 'waterLineChartRange'
                } else {
                    this.sewerView = 'sewerLineChartRange'
                }
            } else {
                this.reload = false
                this.buttonMsg = '确定'
                if (this.type === '水位') {
                    this.waterView = 'waterLineChart'
                } else {
                    this.sewerView = 'sewerLineChart'
                }
            }
        }
    },
    mounted(){
    	this.id = this.$route.params.id

    	// 根据ID获取到当前监控点基本信息
    	let data = {'deviceId': this.id}
        this.$ajax.post('http://localhost/sewer-system/sewerPHP/detail/get-basic.php',
        {
            data: data
        },
        {
            // 允许跨域
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( response => {
            // var entity = res.data[i]
            let res = response.data[0]
            this.id = res.id
            this.type= res.type
            this.status= res.status
            this.event= res.event
            this.area= res.area
            this.address= res.address
            this.principal= res.principal
            this.principalTel= res.principalTel
            this.description= res.description
        })
    }
}
</script>
