#!/bin/sh

cd $(cd `dirname $0`; pwd)
./自动以zh-CN内容补全非zh-CN的缺失翻译项.py
read -p "轻触回车键以退出..." 0
