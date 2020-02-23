`alternatives`

shell里执行：
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 100
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 150
此时你会发现
如果要切换到Python2，执行：
sudo update-alternatives --config python
按照提示输入选择数字回车即可。
这样你甚至可以将自己喜欢的任意版本python安装到任意位置，然后使用update-alternatives将其设置为系统默认python。