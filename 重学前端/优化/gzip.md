# gzip

## 什么是gzip

gzip 是 GNUzip 的缩写，最早用于 UNIX系统的文件压缩。HTTP协议上的 gzip 编码是一种用来改进web应用程序性能的技术，web服务器和客户端（浏览器）必须共同支持 gzip。目前主流的浏览器，Chrome,firefox,IE等都支持该协议。常见的服务器如Apache，Nginx，IIS同样支持gzip。

gzip压缩比率在3到10倍左右，可以大大节省服务器的网络带宽。而在实际应用中，并不是对所有文件进行压缩，通常只是压缩静态文件。

## 工作原理

1）浏览器请求url，并在 request header 中设置属性 `accept-encoding: gzip`。表明浏览器支持 `gzip`。

2）服务器收到浏览器发送的请求之后，判断浏览器是否支持gzip，如果支持 `gzip`，则向浏览器传送压缩过的内容，不支持则向浏览器发送未经压缩的内容。一般情况下，浏览器和服务器都支持gzip，response headers 返回包含 `content-encoding: gzip`。

3）浏览器接收到服务器的响应之后判断内容是否被压缩，如果被压缩则解压缩显示页面内容。

## nginx配置

```js
// 开启gzip压缩功能
gzip on;

// 允许被压缩的页面最小字节数，建议设置成大于1k的字节数，小于1k可能会越压越大
gzip_min_length 1024;

// 设置压缩缓冲区大小，此处设置为4个16K内存作为压缩结果流缓存
gzip_buffers 4 16k;

// 压缩版本
gzip_http_version 1.1;

// 设置压缩比率，最小为1，处理速度快，传输速度慢；9为最大压缩比，处理速度慢，传输速度快; 这里表示压缩级别，可以是0到9中的任一个，级别越高，压缩就越小，节省了带宽资源，但同时也消耗CPU资源
gzip_comp_level 9;

// 制定压缩的类型,线上配置时尽可能配置多的压缩类型
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

// 配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
gzip_disable "MSIE [1-6]\.";

// 选择支持vary header；改选项可以让前端的缓存服务器缓存经过gzip压缩的页面; 这个可以不写，表示在传送数据时，给客户端说明我使用了gzip压缩
gzip vary on;
```