export const editColumns = [
    {
        title: '序号',
        type: 'index',
        width: 50,
        align: 'center'
    },
    {
        title: '编号',
        align: 'center',
        key: 'id',
        width: 70
    },
    {
        title: '类型',
        align: 'center',
        key: 'type',
        width: 70
    },
    {
        title: '状态',
        align: 'center',
        key: 'status',
        width: 70
    },
    {
        title: '详细地址',
        align: 'center',
        key: 'address',
        width: 130,
        editable: true
    },
    {
        title: '负责人',
        align: 'center',
        key: 'principal',
        width: 90,
        editable: true
    },
        {
        title: '负责人电话',
        align: 'center',
        key: 'principalTel',
        width: 110,
        editable: true
    },
    {
        title: '损坏时间',
        align: 'center',
        key: 'damageDate',
        editable: true
    },
    {
        title: '维修时间',
        align: 'center',
        key: 'maintainDate',
        editable: true
    },
    {
        title: '损坏原因',
        align: 'center',
        key: 'reason',
        width: 90,
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
        width: 190,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

const tableData = {
    editColumns: editColumns,
};

export default tableData;
