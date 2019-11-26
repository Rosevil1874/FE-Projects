export const editColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '节点编号',
        align: 'center',
        key: 'deviceId',
        width: 90
    },
    {
        title: '节点类型',
        align: 'center',
        key: 'type'
    },
    {
        title: '监控点',
        align: 'center',
        key: 'monitor',
        width: 90,
        editable: true
    },
    {
        title: '状态',
        align: 'center',
        key: 'status',
        width: 90
    },
    {
        title: '位置',
        align: 'center',
        key: 'address',
        editable: true
    },
    {
        title: '安装时间',
        align: 'center',
        key: 'installDate',
        width: 150
    },
    {
        title: '备注',
        align: 'center',
        key: 'description',
        width: 90,
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

const tableData = {
    editColumns: editColumns,
};

export default tableData;
