<template>
    <div style="width:100%;height:500px;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'sewerLineChartRange',
    data () {
        return {
            
        };
    },
    props: {
        deviceId: String,
        startDate: String,
        endDate: String
    },
    mounted () {
        // 根据ID获取到当前监控点水位/倾角+光照变化信息
        let data = {
            'deviceId': this.deviceId,
            'start': this.startDate,
            'end': this.endDate
        }
        let dataLight = []
        let dataAngle = []
        let dataDate = []

        this.$ajax.post('http://localhost/sewer-system/sewerPHP/detail/get-sewer-inrange.php',
        {
            data: data
        },
        {
            // 允许跨域
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( res => {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
                var item = res.data[i]
                dataLight.push(item.light)
                dataAngle.push(item.angle)
                dataDate.push(item.date)
            }

            var lineChart = echarts.init(document.getElementById('data_source_con'));
            const option = {
                title: {
                    text:'编号' + this.deviceId
                },
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data:['光照', '倾角']
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
                series: [
                    {
                        name:'光照/单位',
                        type:'line',
                        data:dataLight,
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
                        name:'倾角/单位',
                        type:'line',
                        data:dataAngle,
                        markPoint : {
                            data : [
                                {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            };
            lineChart.setOption(option);
            window.addEventListener('resize', function () {
                lineChart.resize();
            });
        })
    }
};
</script>
