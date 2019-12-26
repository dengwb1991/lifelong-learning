## 列出所有的标签

```bash
$ git tag

v0.0.1
v0.0.2
```

可以筛选

```bash
$ git tag -l 'v1.0.0*'

v1.0.0
v1.0.0-rc0
```

## 创建标签

轻量标签

```bash
$ git tag v1.0.0
```

附注标签

```bash
$ git tag -a v1.4 -m 'my version 1.4'
```

## 查询标签

```bash
$ git show v1.4
```

## 后期打标签

```bash
$ git log --pretty=oneline

15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
4682c3261057305bdd616e23b64b0857d832627b added a todo file
166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme

$ git tag -a v1.2 9fceb02

$ git show v1.2
tag v1.2
Tagger: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Feb 9 15:32:16 2009 -0800

version 1.2
commit 9fceb02d0ae598e95dc970b74767f19372d61af8
Author: Magnus Chacon <mchacon@gee-mail.com>
Date:   Sun Apr 27 20:43:35 2008 -0700

    updated rakefile
...

```

## 共享标签

```bash
$ git push origin v1.4
```

全部推送

```bash
$ git push origin --tags
```

## 删除标签

```bash
$ git tag -d v1.4
```

删除远程标签 规则：`git push <remote> :refs/tags/<tagname>`

```bash
$ git push origin :refs/tags/v1.4
```