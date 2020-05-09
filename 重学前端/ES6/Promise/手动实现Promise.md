(promise/A+规范)[https://promisesaplus.com/]

## 规范：

1. promise代表了一个异步操作的最终结果，主要是通过then方法来注册成功以及失败的情况
2. Promise/A+历史上说是实现了Promise/A的行为并且考虑了一些不足之处，他并不关心如何创建，完成，拒绝Promise，只考虑提供一个可协作的then方法

## 术语：

1. `promise` 是一个拥有符合上面的特征的then方法的对象或者方法
2. `thenable` 是定义了then方法的对象或者方法
3. `value` 是任何合法的js的值（包括undefined，thenable或者promise）
4. `exception` 是一个被throw申明抛出的值
5. `reason` 是一个指明了为什么promise被拒绝


## 实现

1. 首先写出Promise的构造函数，Promise使用的是发布与订阅模式，调用promise上的then方法将resolve和reject回调分别加入onFulfilledCallback和onRejectedCallback回调函数集合，然后调用resolve和reject方法触发回调函数集合中函数的执行。

```js
function Promise (fn) {
  var self = this;
  self.status = 'pending'; // Promise初始状态为pending
  self.data = undefined; // Promise的值
  self.onFulfilledCallback = []; // Promise resolve回调函数集合
  self.onRejectedCallback = []; // Promise reject回调函数集合
  fn(resolve, reject); // 执行传进来的函数，传入resolve, reject参数
}
```

2. 这里再考虑一下resolve函数和reject函数的实现，在构造函数中定义它们。resolve和reject主要做的就是修改promise的状态，然后执行回调函数。

```js
function Promise (fn) {
  var self = this;
  self.status = 'pending'; // Promise初始状态为pending
  self.data = undefined; // Promise的值
  self.onFulfilledCallback = []; // Promise resolve回调函数集合
  self.onRejectedCallback = []; // Promise reject回调函数集合

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      for (var i = 0; i < self.onFulfilledCallback.length; i++) {
        self.onFulfilledCallback[i](value);
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      for (var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason);
      }
    }
  }

  try {
    fn(resolve, reject); // 执行传进来的函数，传入resolve, reject参数
  } catch (e) {
    reject(e);
  }
}
```

3. Promise对象有一个then方法，用来注册Promise对象状态确定后的回调。这里需要将then方法定义在Promise的原型上

```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;

  // 根据标准，如果then的参数不是function，则我们需要忽略它
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v};
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) { return r };

  // Promise对象存在以下三种状态，对三种状态采用不同处理
  if (self.status === 'resolved') {
    return new Promise(function(resolve, reject) {
      // todo
    });
  }

  if (self.status === 'rejected') {
    return new Promise(function(resolve, reject) {
      // todo
    });
  }

  if (self.status === 'pending') {
    return new Promise(function(resolve, reject) {
      // todo
    });
  }
}
```

逐步实现三种状态内逻辑

```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;

  // 根据标准，如果then的参数不是function，则我们需要忽略它
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v};
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) { return r };

  if (self.status === 'resolved') {
    // 这里promise的状态已经确定是resolved，所以调用onResolved
    return new Promise(function(resolve, reject) {
      try {
        // ret是onFulfilled的返回值
        var ret = onFulfilled(self.data);
        if (ret instanceof Promise) {
          // 如果ret是一个promise，则取其值作为新的promise的结果
          ret.then(resolve, reject);
        } else {
          // 否则，以它的返回值作为新的promise的结果
          resolve(ret);
        }
      } catch (e) {
        // 如果出错，以捕获到的错误作为promise2的结果
        reject(e);
      }
    });
  }

  // 这里的逻辑跟前面一样，不再赘述
  if (self.status === 'rejected') {
    return new Promise(function(resolve, reject) {
      try {
        var ret = onRejected(self.data);
        if (ret instanceof Promise) {
          ret.then(resolve, reject);
        } else {
          resolve(ret);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，则不能确定调用
    // onResolved还是onRejecte，只能等到Promise状态确定后，
    // 才能确定如何处理
    return new Promise(function(resolve, reject) {
      self.onFulfilledCallback.push(function(value) {
        try {
          var ret = onFulfilled(self.data);
          if (ret instanceof Promise) {
            ret.then(resolve, reject);
          } else {
            resolve(ret);
          }
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectedCallback.push(function(value) {
        try {
          var ret = onRejected(self.data);
          if (ret instanceof Promise) {
            ret.then(resolve, reject);
          } else {
            reject(ret);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}

// 顺便实现一下catch方法
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}
```

4. 根据标准，onFulfilled和onRejected函数需要异步执行，所以我们需要稍微再修改一下代码。

```js
function Promise(fn) {
  var self = this;
  self.status = 'pending'; // Promise初始状态为pending
  self.data = undefined; // Promise的值
  self.onFulfilledCallback = []; // Promise resolve回调函数集合
  self.onRejectedCallback = []; // Promise reject回调函数集合

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      setTimeout(function() {
        for (var i = 0; i < self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value);
        }
      });
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      setTimeout(function() {
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      });
    }
  }

  try {
    fn(resolve, reject); // 执行传进来的函数，传入resolve, reject参数
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;

  // 根据标准，如果then的参数不是function，则我们需要忽略它
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v};
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) { return r };

  if (self.status === 'resolved') {
    // 这里promise的状态已经确定是resolved，所以调用onResolved
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          // ret是onFulfilled的返回值
          var ret = onFulfilled(self.data);
          if (ret instanceof Promise) {
            // 如果ret是一个promise，则取其值作为新的promise的结果
            ret.then(resolve, reject);
          } else {
            // 否则，以它的返回值作为新的promise的结果
            resolve(ret);
          }
        } catch (e) {
          // 如果出错，以捕获到的错误作为promise2的结果
          reject(e);
        }
      });
    });
  }

  // 这里的逻辑跟前面一样，不再赘述
  if (self.status === 'rejected') {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var ret = onRejected(self.data);
          if (ret instanceof Promise) {
            ret.then(resolve, reject);
          } else {
            reject(ret);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，则不能确定调用
    // onResolved还是onRejecte，只能等到Promise状态确定后，
    // 才能确定如何处理
    return new Promise(function(resolve, reject) {
      self.onFulfilledCallback.push(function(value) {
        setTimeout(function() {
          try {
            var ret = onFulfilled(self.data);
            if (ret instanceof Promise) {
              ret.then(resolve, reject);
            } else {
              resolve(ret);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejectedCallback.push(function(reason) {
        setTimeout(function() {
          try {
            var ret = onRejected(self.data);
            if (ret instanceof Promise) {
              ret.then(resolve, reject);
            } else {
              reject(ret);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}
```

测试：

```js
const p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(1);
  }, 2000);
});

p.then(function(v) {
  console.log(v);
  return 2;
}).then(function(v) {
  console.log(v);
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(3);
    }, 3000);
  });
}).then(function(v) {
  console.log(v);
});
```