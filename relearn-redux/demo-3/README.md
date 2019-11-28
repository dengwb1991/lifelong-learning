# Reducer 的拆分与结合

Reducer 函数负责生产 State。由于整个应用只有一个 State 对象，它包含所有的数据，对于大型项目来说，这个 State 必然十分庞大，从而也会导致 Reducer 函数变得庞大。

创建 reducers 文件夹，存放多个 redcuer。添加 combineReducers 函数，combineReducers 函数做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。