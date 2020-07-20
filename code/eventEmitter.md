```js
class EventEmitter {
    constructor(){
        this.events = {}
    }
    on(name,cb){
        if(!this.events[name]){
            this.events[name] = [cb];
        }else{
            this.events[name].push(cb)
        }
    }
    emit(name,...arg){
        if(this.events[name]){
            this.events[name].forEach(fn => {
                fn.call(this,...arg)
            })
        }
    }
    off(name,cb){
        if(this.events[name]){
            this.events[name] = this.events[name].filter(fn => {
                return fn != cb
            })
        }
    }
    once(name,fn){ // 执行一次后销毁
        var onlyOnce = function () {
            fn.apply(this,arguments);
            this.off(name,onlyOnce)
        }
        this.on(name,onlyOnce);
        return this;
    }
}

var ev = new EventEmitter()

ev.once('xiaoming', function (msg) {console.log('say ' + msg)})

ev.emit('xiaoming', 'hello')
```


```js
// 参照 vue 源码实现
var EventEmiter = function (){
  this._events = {};
};
EventEmiter.prototype.on = function (event, cb){
  if (Array.isArray(event)){
    for (let i = 0, l = event.length; i < l; i++){
      this.on(event[i], cb);
    }
  } else {
    (this._events[event] || (this._events[event] = [])).push(cb);
  }
  return this;
};
EventEmiter.prototype.once = function (event, cb){
  function on () {
    this.off(event, cb);
    cb.apply(this, arguments);
  }
  on.fn = cb;
  this.on(event, on);
  return this;
};
EventEmiter.prototype.off = function (event, cb){
  if (!arguments.length){
    this._events = Object.create(null);
    return this;
  }
  if (Array.isArray(event)){
    for (let i = 0, l = event.length; i < l; i++){
      this.off(event[i],cb);
    }
    return this;
  }
  if (!cb){
    this._events[event] = null;
    return this;
  }
  if (cb){
    let cbs = this._events[event];
    let i = cbs.length;
    while(i--){
      if (cb === cbs[i] || cb === cbs[i].fn){
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
};
EventEmiter.prototype.emit = function (event){
  let cbs = this._events[event];
  let args = Array.prototype.slice.call(arguments, 1);
  if (cbs){
    for (let i = 0, l = cbs.length; i < l; i++){
      cbs[i].apply(this,args);
    }
  }
};
```