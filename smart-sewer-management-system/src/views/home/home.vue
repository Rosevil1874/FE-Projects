<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <!-- 地图 -->
        <Row>
            <Card class="home-card">
                <b-map-component></b-map-component>
            </Card>
        </Row>
        <!-- 统计监控点状态 -->
        <Row :gutter="5">
            <Col span='8' :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="visit_count"
                    :end-val="count.normal"
                    iconType="happy"
                    color="#64d572"
                    :iconSize="50"
                    intro-text="正常"
                ></infor-card>
            </Col>
            <Col span='8' :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="collection_count"
                    :end-val="count.warning"
                    iconType="sad"
                    color="#ffd572"
                    intro-text="预警"
                ></infor-card>
            </Col>
            <Col span='8' :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="transfer_count"
                    :end-val="count.danger"
                    iconType="alert-circled"
                    color="#f25e43"
                    intro-text="告警"
                ></infor-card>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import BMapComponent from './components/BMapComponent.vue';

export default {
    name: 'home',
    components: {
        inforCard,
        countUp,
        BMapComponent
    },
    data () {
        return {
            count: {
                normal: 0,
                warning: 0,
                danger: 0
            }
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        getCount (){
            this.$ajax.get('http://localhost/sewer-system/sewerPHP/home/get-count.php')
                .then( res => {
                    this.count.normal = res.data.normal
                    this.count.warning = res.data.warning
                    this.count.danger = res.data.danger
                })

        }
    },
    ready: function() {
        var map = new BMap.Map("container"); 
        var point = new BMap.Point(116.404, 39.915); 
        map.centerAndZoom(point, 15); 
    },
    mounted () {
        this.getCount()
    }
};
</script>
