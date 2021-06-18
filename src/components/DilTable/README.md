## 通用表格使用说明
### 属性说明



#### requestUrl : string

表格请求的地址

示例：

``` js
//全地址
requestUrl:http://192.168.10.113:8081/api/v1/truck/type/status2;
//后半截地址
requestUrl:/api/v1/truck/type/status2;
```



#### requestQuery : object

表格请求的参数：用于自己触发筛选和排序时使用

可传入参数





#### current-page : number

当前页数，支持 .sync 修饰符

默认是第一页



#### page-size : number

每页显示条目个数，支持 .sync 修饰符

默认是 每页十条



#### page-sizes : number[]

每页显示个数选择器的选项设置

默认是 [1,2,5,10]



#### type : string

表格类型：目前支持：base , common

之后会根据需求增加更多的类型



#### lastColumnData : array[object]

表格最右边列的数据信息，数组中是放一个对象，对象中的属性如下，

基本和Table-column Attributes的相同，

``` js
lastColumnData:[{
    // 表头显示的文案
    label: "操作",
    // 设置列的宽度
    width: 100,
    // 固定操作列
    fixed: 'right',
    // 注意！！！
    // 操作列按钮点击触发的操作改为 $emit 抛事件的形式
    // 默认可以获取 scope 属性；里面的具体内容和el-table一样
    template: `
		<el-button type="text" size="mini" @click="$emit('transportProgress',scope.row)" > 
			运输进度 
		</el-button>
	`,
}]
```





### 方法说明

#### radio-change : function(row)

用于当选表格，当用户改变选中行数据时调用，返回选中行的数据对象 **row**

用户再次点击取消选中时，会返回一个**空对象 {}**



#### selection-change : function(rows)

用于多选表格，当选择项发生变化时会触发该事件

返回所有被选中的行的数据的数组 rows[]

即使换页，



## 接口相关说明

### 请求参数说明

连接后的参数

``` json
// 控制当前显示第几页
pageNum:1
// 控制当前每页显示几条
pageSize:10
```

请求体的参数

``` json
// 排序的数据的参数字段
orderField:""
// 排序类型 asc : 升序；  desc : 降序；
orderType:""

// 需要筛选时，键值对的键，是需要筛选的参数的字段名，
// 键值对的值，是个数组，存放符合条件的字段值，
// 筛选的字段可以同时存在多条
[筛选字段名]:[筛选字段值1，筛选字段值2]
```



### 回调参数要求

``` json
{
    // 状态码 0:标识成功
    "code": "0",
    // 后端自定义给前端的数据对象
    "data": {
        // 表格的数据源
        "list": [
            // 每行表的数据内容
            {
                // 每行数据的唯一标识 必设项
                "ROW_ID":"",
            }
        ],

        // 表头的数据内容
        // 表头按需要的显示顺序排序
        "columnData": [
            // 每个表头的相关信息
            // 这个之后会根据需求不断添加
            {
                // 唯一标识 必设项
                "id": "",
                // 对应列内容的字段名 必设项
                "prop": "",
                // 显示的标题 必设项
                "label": "",

                // 一下为 非必填选项
                // 自定义列模板
                // html的字符串
                // 当有这个属性时,会忽略label属性
                "template": "",

                // 列的宽度 非必填选项
                "width": "",
                // 当前列对应的 筛选功能数组 非必填选项
                "filters":[
                    {
                        // 筛选选项 的中文名称
                        value:0,
                        // 筛选选项 所对应的后端数值
                        text:"",
                    },
                ],
            },
        ],
        
        // 总条目数
        "total": 0
    }
}
```

