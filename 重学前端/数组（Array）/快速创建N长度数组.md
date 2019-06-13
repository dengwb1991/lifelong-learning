```js
Object.keys(Array.from({ length: 100 }))
// ["0", "1", "2", ..., "98", "99"]

Object.keys(Array.apply(null,{ length: 100 }))

Array.from(new Array(100).keys())

[...Array(100).keys()]

[...Array.from({ length: 100 }).keys()]
```

