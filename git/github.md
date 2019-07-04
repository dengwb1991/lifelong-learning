# fork项目同步更新

1、查看远程状态信息，确认上游 （upstream) 状态

```bash
$ git remote -v
```


2、添加一个将被同步给 `fork` 远程的上游仓库 

```bash
$ git remote add upstream https://github.com/vuejs/vue.git
```

3、从源仓库更新同步

```bash
$ git fetch upstream
```

4、合并到本地

```bash
$ git merge upstreaem/master
```

5、提交远程

```bash
$ git push origin master
```

6、如果不想保留 `upstream` 在本地可以删除

```bash
$ git remote remove upstream
```