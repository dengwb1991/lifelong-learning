## 一、数组乱序

```js
// 取巧的一种算法，但是每个位置乱序的概率不同
function mixArr (arr) {
  return arr.sort(() => {
      return Math.random() - 0.5
  })
}
```

```js
// 著名的Fisher–Yates shuffle 洗牌算法
function shuffle(arr){
    let m = arr.length;
    while(m > 1){
        let index = parseInt(Math.random() * m--);
        [arr[index],arr[m]] = [arr[m],arr[index]];
    }
    return arr;
}
```

## 二、数组去重

```js
function removeDup(arr){
    var result = [];
    var hashMap = {};
    for(var i = 0; i < arr.length; i++){
        var temp = arr[i]
        if(!hashMap[temp]){
            hashMap[temp] = true
            result.push(temp)
        }
    }
    return result;
}
```

```js
Array.from(new Set(arr))

[...new Set(arr)]
```

## 三、flat

```js
// 展平一级
function flat(arr){
    var result = [];
    for(var i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flat(arr[i]))
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}
```

```js
//展平多层
 function flattenByDeep(array,deep){
    var result = [];
    for(var i = 0 ; i < array.length; i++){
        if(Array.isArray(array[i]) && deep >= 1){
              result = result.concat(flattenByDeep(array[i],deep -1))
        }else{
              result.push(array[i])
        }
    }
    return result;
}

```

## 四、数组filter

```js
Array.prototype.filter = function(fn,context){
    if(typeof fn != 'function'){
        throw new TypeError(`${fn} is not a function`)
    }
    let arr = this;
    let result = []
    for(var i = 0;i < arr.length; i++){
        let temp= fn.call(context,arr[i],i,arr);
        if(temp){
            result.push(arr[i]);
        }
    }
    return result
}
```

## 五、获取最大值最小值

```js
var arr = [4, 2, 1, 5, 3]

Math.max(...arr)

Math.max.apply(null,arr)
```

```js
var arr = [{ n: 4 }, { n: 2 }, { n: 1 }, { n: 5 }, { n: 3 }]

Math.max.apply(null, arr.map(item => item.n))
```