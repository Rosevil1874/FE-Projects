<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
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
                    :end-val="count.earlyWarning"
                    iconType="alert-circled"
                    color="#ffd572"
                    intro-text="预警"
                ></infor-card>
            </Col>
            <Col span='8' :style="{marginBottom: '10px'}">
                <infor-card
                    id-name="transfer_count"
                    :end-val="count.warning"
                    iconType="sad"
                    color="#f25e43"
                    intro-text="告警"
                ></infor-card>
            </Col>
        </Row>
        <Row>
            <Card :padding="0">
                <div class="map-con">
                    <Col span="24" class="map-incon">
                        <Row type="flex" justify="center" align="middle">
                            map
                        </Row>
                    </Col>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';

export default {
    name: 'home',
    components: {
        inforCard,
        countUp
    },
    data () {
        return {
            count: {
                normal: 496,
                earlyWarning: 32,
                warning: 24
            }
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
      
    }
};
</script>
