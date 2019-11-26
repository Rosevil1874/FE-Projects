<template>
    <div style="width:100%;height:500px;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'lineChart',
    data () {
        return {
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
            wangcheng_danger: 0
        };
    },
    props: {
        type: String,
        datePicked: Boolean,
        startDate: String,
        endDate: String
    },
    mounted () {
        let phpURL = ''
        if (this.type === '水位') {
            phpURL = 'http://localhost/sewer-system/sewerPHP/statistic/get-water.php'
        } else{
             phpURL = 'http://localhost/sewer-system/sewerPHP/statistic/get-sewer.php'
        }
        this.$ajax.get( phpURL,
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

            // 将回调延迟到下次 DOM 更新循环之后执行

            this.$nextTick(() => {

                var lineChart = echarts.init(document.getElementById('data_source_con'));
                const option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['预警次数', '告警次数']
                    },
                    toolbox: {
                        show:true,
                        feature: {
                            mark: {show: true},
                            magicType: {show:true, type:['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['岳麓','天心','雨花','芙蓉', '开福', '望城']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'预警次数',
                            type:'line',
                            smooth: true,
                            data:[this.yuelu_warn, this.tianxin_warn, this.yuhua_warn, this.furong_warn, this.kaifu_warn, this.wangcheng_warn],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'告警次数',
                            type:'line',
                            smooth: true,
                            data:[this.yuelu_danger, this.tianxin_danger, this.yuhua_danger, this.furong_danger, this.kaifu_danger, this.wangcheng_danger],
                             markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                }

                lineChart.setOption(option);
                window.addEventListener('resize', function () {
                    lineChart.resize();
                });
            });
        })  
    }
};
</script>
