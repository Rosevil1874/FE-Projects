<template>
    <div style="width:100%;height:500px;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'waterLineChart',
    data () {
        return {
        };
    },
    props: {
        deviceId: String
    },
    mounted () {

        // 根据ID获取到当前监控点水位/倾角+光照变化信息
        let data = {'deviceId': this.deviceId}
        let dataValue = []
        let dataDate = []

        this.$ajax.post('http://localhost/sewer-system/sewerPHP/detail/get-water-change.php',
        {
            data: data
        },
        {
            // 允许跨域
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( res => {
            // console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                var item = res.data[i]
                dataValue.push(item.value)
                dataDate.push(item.date)
            }

            var lineChart = echarts.init(document.getElementById('data_source_con'));
            const option = {
                title: {
                    text:'编号' + this.deviceId
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['水位']
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

                        // 横坐标为日期
                        data : dataDate
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} cm'
                        }
                    }
                ],
                series: {
                    name:'水位',
                    type:'line',

                    // 数据为水位值
                    data:dataValue,
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
            }
            
            lineChart.setOption(option);
            window.addEventListener('resize', function () {
                lineChart.resize();
            });
        })
    }
};
</script>
