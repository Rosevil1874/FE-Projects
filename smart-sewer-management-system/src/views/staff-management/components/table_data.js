export const editColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
    },
    {
        title: '部门',
        align: 'center',
        key: 'department',
    },
    {
        title: '管理员',
        align: 'center',
        key: 'isManager',
        width: 100,
    },
    {
        title: '电话',
        align: 'center',
        key: 'tel',
        // width: 150,
        editable: true
    },
    {
        title: '邮箱',
        align: 'center',
        key: 'email',
        width: 250,
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

const tableData = {
    editColumns: editColumns
};

export default tableData;