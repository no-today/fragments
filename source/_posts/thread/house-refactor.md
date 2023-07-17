---
title: House Refactor
date: 2023-05-26
hidden: true
---

<!--more-->

### Retrofit

- 卫生间重做
- 阳台重铺地板、防水、刷墙
- 重新刷墙(厨房、小阳台不动)、插座开关换新
- 拆除过道墙

other:

- 清理废弃家具，拆除卧室飘窗柜、墙壁挂柜
- 拆除阳台推拉门
- 空调专线延伸到右边
- 分别接两个插座到阳台左(电脑桌)、右侧(洗烘?)

---

### LIST

- 人工费 `20000`
- [三棵树漆 面漆18L*2+随心防霉底漆15L](https://item.jd.com/10047696790159.html) `1630`
- 杂项
    - [嘉宝莉界面剂](https://item.taobao.com/item.htm?id=561223959421) `120`
    - [灯具](https://item.jd.com/10041975120703.html) `488`
    - [小米智能门锁](https://item.jd.com/100048765169.html) `799`
    - 插座 `791`
    - 角阀+水龙头 `228`
    - 水管电线 `182`
    - 生料带 `64`
    - 卧室空调安装 *2 `550`
- 卫生间
    - 墙壁瓷砖/18平/40*80/单价16.5/60块 `990`
    - 地面瓷砖/4平/40*40/单价8/26块 `208`
    - 阳角条*5 `75`
    - 填缝剂 `15`
    - 卫生间门 `1160`
    - [地漏 50mm](https://item.jd.com/907127.html) `89`
    - [九牧 蹲便器水箱套装](https://detail.tmall.com/item.htm?id=43490875403&skuId=4871887934384) `428`
    - [四季沐歌 卫浴花洒套装](https://item.jd.com/29680678205.html) `369`
    - [三角置物架*2](https://item.jd.com/100042554189.html) `116`
    - [双杆置物架](https://item.jd.com/100042554189.html) `77`
    - [排气扇 150mm](https://item.jd.com/10068047861780.html) `50`
    - [浴室柜](https://item.jd.com/10067758447348.html) `766`
- 阳台
    - 地面瓷砖/9.5平/80*80/单价38/15块 `570`
    - 踢脚线瓷砖/8.6米 `44`
    - 阳台封窗 `4000`
    - [地漏 50mm](https://item.jd.com/337497.html) `89`
    - [手摇升降三杆晾衣杆 2m](https://item.jd.com/10055047494781.html) `353`
    - [洗衣机 美的](https://item.jd.com/100037034488.html) `1363`
- 厨房
    - [燃气灶 苏泊尔](https://item.jd.com/100029781383.html) `399`
    - [冰箱 奥马](https://item.jd.com/100011207433.html) `1544`
- 客厅
    - [Redmi 路由器 AX6000](https://item.jd.com/100036284224.html) `419`
    - [餐桌+椅 120*70](https://detail.tmall.com/item.htm?id=650332511579&skuId=4964009901217) `671`
    - [电视柜 1.8m](https://detail.tmall.com/item.htm?id=602411111358&skuId=5074015183875) `1099`
    - [沙发 2.1m](https://item.taobao.com/item.htm?id=675301256806) `3000`
    - [小米电视5 65英寸](https://item.jd.com/100005515829.html) `2299`
    - [华凌空调 N8HB1A 3匹](https://item.jd.com/100029578288.html) `4834`
    - 过道石 `68`
- 主卧
    - [实木床 京东京造 1.5*2m](https://item.jd.com/100039640252.html) `2099`
    - [床垫 京东京造 20cm](https://item.jd.com/100039507385.html) `949`
    - [华凌空调 N8HE1 1.5匹](https://item.jd.com/100007344273.html) `2099`
- 次卧
    - [双层床 1.35*2.0m](https://item.jd.com/10056727663578.html) `1392`
    - [华凌空调 N8HE1 1.5匹](https://item.jd.com/100007344273.html) `2099`
- Dream desk
    - [电脑桌 松木 200*60*75cm 板厚5cm](https://item.taobao.com/item.htm?id=714867755189) `1340`
    - [北弧 mini升降桌](https://item.jd.com/100023261789.html) `659`
    - [小米Redmi 27英寸显示器4K *2](https://item.jd.com/100024459181.html) `2869`
    - [米家智能显示器挂灯1S](https://item.jd.com/100027978414.html) `219`
    - [北弧 双屏显示器支架](https://item.jd.com/100040787448.html) `226`
    - [西昊 Vito 人体工学椅](https://item.jd.com/10043905774514.html) `672`

---

```shell
grep -Eo '`(\d+)`' house-refactor.md | sed -E 's/.*`([0-9]+)`.*/\1/' | awk '{sum += $1} END {print sum}'
```