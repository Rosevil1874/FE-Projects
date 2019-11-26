<style>
    @import './statistic.less';
</style>

<template>
    <div>
        <Row>
    		<Col span="8">
    			<card class="options">
    				<p slot="title">
    				    <Icon type="flag"></Icon>
    				    列表展示
    				</p>
    				<p slot="title"></p>
    				<div>
    					<table>
    						<tr>
    							<th>区域</th>
    							<th>预警</th>
    							<th>告警</th>
    						</tr>
    						<tr>
    							<td>岳麓区</td>
    							<td> {{ yuelu_warn }} </td>
    							<td> {{ yuelu_danger }} </td>
    						</tr>
    						<tr>
    							<td>天心区</td>
    							<td> {{ tianxin_warn }} </td>
    							<td> {{ tianxin_danger }} </td>
    						</tr>
    						<tr>
    							<td>雨花区</td>
    							<td> {{ yuhua_warn }} </td>
    							<td> {{ yuhua_danger }} </td>
    						</tr>
    						<tr>
    							<td>芙蓉区</td>
    							<td> {{ furong_warn }} </td>
    							<td> {{ furong_danger }} </td>
    						</tr>
    						<tr>
    							<td>开福区</td>
    							<td> {{ kaifu_warn }} </td>
    							<td> {{ kaifu_danger }} </td>
    						</tr>
    						<tr>
    							<td>望城区</td>
    							<td> {{ wangcheng_warn }} </td>
    							<td> {{ wangcheng_danger }} </td>
    						</tr>
    						<tr>
    							<td>平均</td>
    							<td> {{ avg_warn }} </td>
    							<td> {{ avg_danger }} </td>
    						</tr>
    						<tr>
    							<td>总计</td>
    							<td> {{ total_warn }} </td>
    							<td> {{ total_danger }} </td>
    						</tr>
    					</table>
    				</div>
    			</card>
    		</Col>
    		<Col span="16">
    			<card class="chart">
    				<p slot="title">
    				    <Icon type="podium"></Icon>
    				    图例展示
    				</p>
    				<p slot="title" style="width: 50%;">
    					<div class="datePicker">
				            <DatePicker type="date" placeholder="start date" style="width: 200px" @on-change="startDateChange"></DatePicker>
				            <DatePicker type="date" placeholder="end date" style="width: 200px" @on-change="endDateChange"></DatePicker>
    						<button @click="dateRangeChange"> {{ buttonMsg }} </button>
					    </div>
    				</p>
    				<component :is="currentView" :type="type" :startDate="startDate" :endDate="endDate"></component>
    				<!-- <line-chart :type="type" :datePicked="datePicked" :startDate="startDate" :endDate="endDate"></line-chart> -->
    			</card>
    		</Col>
    	</Row>
    </div>
</template>

<script>
import lineChart from './components/lineChart.vue';
import lineChartRange from './components/lineChartRange.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';

export default {
    components: {
        dataSourcePie,
        inforCard,
        countUp,
        lineChart,
        lineChartRange
    },
    data () {
        return {
        	type: '水位',
        	currentView: 'lineChart',

        	// 列表数据
            yuelu_warn: 0,
            yuelu_danger: 0,
            tianxin_warn: 0, 
            tianxin_danger: 0,
            yuhua_warn: 0,
            yuhua_danger: 0,
            furong_warn: 0,
            furong_danger: 0,
            kaifu_warn: 0,
            kaifu_danger: 0,
            wangcheng_warn: 0,
            wangcheng_danger: 0,
            avg_warn: 0,
            avg_danger: 0,
            total_warn: 0,
            total_danger: 0,

            // 圆饼图
            count: {
                normal: 496,
                earlyWarning: 32,
                warning: 24
            },

            // 日期选择
            startDate: '',
            endDate: '',
            reload: false,
            buttonMsg: '确定'
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
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
    		if (this.reload === false) {
    			this.reload = true
    			this.buttonMsg = '还原'
    			this.currentView = 'lineChartRange'
    		} else {
    			this.reload = false
    			this.buttonMsg = '确定'
    			this.currentView = 'lineChart'
    		}
    		
    		let data = {
    			start: this.startDate,
    			end: this.endDate
    		}
    		this.$ajax.post('http://localhost/sewer-system/sewerPHP/statistic/get-water-inrange.php',
    			{
    			    data:data
    			},
    			{
    			    // 允许跨域
    			    headers: {
    			        'Content-Type': 'application/x-www-form-urlencoded'
    			    }
    			}
    		).then( response => {
    		    let res = response.data[0]
    		    this.yuelu_warn = res.yuelu_warn
    		    this.yuelu_danger= res.yuelu_danger
    		    this.tianxin_warn= res.tianxin_warn
    		    this.tianxin_danger= res.tianxin_danger
    		    this.yuhua_warn= res.yuhua_warn
    		    this.yuhua_danger= res.yuhua_danger
    		    this.furong_warn= res.furong_warn
    		    this.furong_danger= res.furong_danger
    		    this.kaifu_warn= res.kaifu_warn
    		    this.kaifu_danger= res.kaifu_danger
    		    this.wangcheng_warn= res.wangcheng_warn
    		    this.wangcheng_danger= res.wangcheng_danger
    		    this.total_warn = Number(res.yuelu_warn) + Number(res.tianxin_warn) + Number(res.yuhua_warn) + Number(res.furong_warn) + Number(res.kaifu_warn) + Number(res.wangcheng_warn)
    		    this.total_danger = Number(res.yuelu_danger) + Number(res.tianxin_danger) + Number(res.yuhua_danger) + Number(res.furong_danger) + Number(res.kaifu_danger) + Number(res.wangcheng_danger)
    		    this.avg_warn = Math.ceil( this.total_warn / 6 )
    		    this.avg_danger = Math.ceil( this.total_danger / 6 )
    		})
    	}
    },
    mounted(){

        this.$ajax.get('http://localhost/sewer-system/sewerPHP/statistic/get-water.php',
        ).then( response => {
            let res = response.data[0]
            this.yuelu_warn = res.yuelu_warn
            this.yuelu_danger= res.yuelu_danger
            this.tianxin_warn= res.tianxin_warn
            this.tianxin_danger= res.tianxin_danger
            this.yuhua_warn= res.yuhua_warn
            this.yuhua_danger= res.yuhua_danger
            this.furong_warn= res.furong_warn
            this.furong_danger= res.furong_danger
            this.kaifu_warn= res.kaifu_warn
            this.kaifu_danger= res.kaifu_danger
            this.wangcheng_warn= res.wangcheng_warn
            this.wangcheng_danger= res.wangcheng_danger
            this.total_warn = Number(res.yuelu_warn) + Number(res.tianxin_warn) + Number(res.yuhua_warn) + Number(res.furong_warn) + Number(res.kaifu_warn) + Number(res.wangcheng_warn)
            this.total_danger = Number(res.yuelu_danger) + Number(res.tianxin_danger) + Number(res.yuhua_danger) + Number(res.furong_danger) + Number(res.kaifu_danger) + Number(res.wangcheng_danger)
            this.avg_warn = Math.ceil( this.total_warn / 6 )
            this.avg_danger = Math.ceil( this.total_danger / 6 )
        })
    }
};		

</script>