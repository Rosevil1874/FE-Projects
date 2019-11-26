export const editColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '编号',
        align: 'center',
        key: 'deviceId',
        width: 90
    },
    {
        title: '监控类型',
        align: 'center',
        key: 'type',
        width: 90
    },
    {
        title: '状态',
        align: 'center',
        key: 'status',
        width: 90
    },
    {
        title: '事件类型',
        align: 'center',
        key: 'event',
        width: 90
    },
    {
        title: '所在区域',
        align: 'center',
        key: 'area',
        width: 100
    },
    {
        title: '详细地址',
        align: 'center',
        key: 'address',
        // width: 90,
        editable: true
    },
    {
        title: '负责人',
        align: 'center',
        key: 'principal',
        width: 100,
        editable: true
    },
    {
        title: '负责人电话',
        align: 'center',
        key: 'principalTel',
        // width: 150,
        editable: true
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
        width: 240,
        key: 'handle',
        handle: ['detail', 'edit', 'delete']
    }
];

const tableData = {
    editColumns: editColumns,
};

export default tableData;
