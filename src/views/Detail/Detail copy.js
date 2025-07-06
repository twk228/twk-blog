import React, { useEffect, useState } from "react";
import "./Detail.scss";
import Footer from "../Footer/Footer";
import { useSearchParams } from "react-router-dom";

// 智慧工地图1
const gongdi1 = require("../../assets/img/zhgd1.png");
// 智慧工地图2
const gongdi2 = require("../../assets/img/zhgd2.png");
// 智慧工地图3
const gongdi3 = require("../../assets/img/zhgd3.png");
// 智慧工地图4
const gongdi4 = require("../../assets/img/zhgd4.png");
// 智慧工地图5
const gongdi5 = require("../../assets/img/zhgd5.png");
// 智慧工地图6
const gongdi6 = require("../../assets/img/zhgd6.png");
// 智慧旅游图1
const lvyou1 = require("../../assets/img/zhly1.png");
// 智慧旅游图2
const lvyou2 = require("../../assets/img/zhly2.png");
// 智慧旅游图3
const lvyou3 = require("../../assets/img/zhly3.png");
// 易享乐图1
const yixiangle1 = require("../../assets/img/yxl1.png");
// 易享乐图2
const yixiangle2 = require("../../assets/img/yxl2.png");
// 易享乐图3
const yixiangle3 = require("../../assets/img/yxl3.png");
// 易享乐图4
const yixiangle4 = require("../../assets/img/yxl4.png");
// 易享乐图5
const yixiangle5 = require("../../assets/img/yxl5.png");
// 易享乐图6
const yixiangle6 = require("../../assets/img/yxl6.png");
// 易享乐图7
const yixiangle7 = require("../../assets/img/yxl7.png");
// 易享乐图8
const yixiangle8 = require("../../assets/img/yxl8.png");
// 完美模板图1
const zujian1 = require("../../assets/img/zj1.png");
// 完美模板图2
const zujian2 = require("../../assets/img/zj2.png");
// 完美模板图3
const zujian3 = require("../../assets/img/zj3.png");
// 完美模板图4
const zujian4 = require("../../assets/img/zj4.png");
// 完美模板图5
const zujian5 = require("../../assets/img/zj5.png");
// 完美模板图6
const zujian6 = require("../../assets/img/zj6.png");
// 完美模板图7
const zujian7 = require("../../assets/img/zj7.png");
// 完美模板图8
const zujian8 = require("../../assets/img/zj8.png");
// 完美模板图9
const zujian9 = require("../../assets/img/zj9.png");
// 智慧电商图1
const dianshang1 = require("../../assets/img/zhds1.png");
// 智慧电商图2
const dianshang2 = require("../../assets/img/zhds2.png");
// 智慧电商图3
const dianshang3 = require("../../assets/img/zhds3.png");
// 智慧车联网图1
const chelianwang1 = require("../../assets/img/zhclwpt1.png");
// 智慧车联网图2
const chelianwang2 = require("../../assets/img/zhclwpt2.png");
// 智慧园区图1
const yuanqu1 = require("../../assets/img/zhyq1.jpeg");
// 智慧园区图2
const yuanqu2 = require("../../assets/img/zhyq2.jpeg");
// 智慧园区图3
const yuanqu3 = require("../../assets/img/zhyq3.jpeg");
// 智慧园区图4
const yuanqu4 = require("../../assets/img/zhyq4.jpeg");
// 智慧园区图5
const yuanqu5 = require("../../assets/img/zhyq5.jpeg");
// 影尚客图1
const yingshangke1 = require("../../assets/img/ysk1.png")
// 影尚客图2
const yingshangke2 = require("../../assets/img/ysk2.png")
// 影尚客图3
const yingshangke3 = require("../../assets/img/ysk3.png")
// 影尚客图4
const yingshangke4 = require("../../assets/img/ysk4.png")
// 影尚客图5
const yingshangke5 = require("../../assets/img/ysk5.png")
// 影尚客图6
const yingshangke6 = require("../../assets/img/ysk6.png")
// 影尚客图7
const yingshangke7 = require("../../assets/img/ysk7.png")
// 影尚客图8
const yingshangke8 = require("../../assets/img/ysk8.png")
// 影尚客图9
const yingshangke9 = require("../../assets/img/ysk9.png")
// 影尚客图10
const yingshangke10 = require("../../assets/img/ysk10.png")
// 影尚客图11
const yingshangke11 = require("../../assets/img/ysk11.png")
// 影尚客图12
const yingshangke12 = require("../../assets/img/ysk12.png")
// 掌上租1
const zhangshangzu1 = require("../../assets/img/zsz1.png")
// 掌上租2
const zhangshangzu2 = require("../../assets/img/zsz2.png")
// 掌上租3
const zhangshangzu3 = require("../../assets/img/zsz3.png")
// 掌上租4
const zhangshangzu4 = require("../../assets/img/zsz4.png")
// 掌上租5
const zhangshangzu5 = require("../../assets/img/zsz5.png")
// 掌上租6
const zhangshangzu6 = require("../../assets/img/zsz6.png")
// 掌上租7
const zhangshangzu7 = require("../../assets/img/zsz7.png")
// 掌上租8
const zhangshangzu8 = require("../../assets/img/zsz8.png")
// 掌上租9
const zhangshangzu9 = require("../../assets/img/zsz9.png")
// kspt1
const kaoshipingtai1 = require("../../assets/img/kspt1.png")
// kspt2
const kaoshipingtai2 = require("../../assets/img/kspt2.png")
// kspt3
const kaoshipingtai3 = require("../../assets/img/kspt3.png")
// kspt4
const kaoshipingtai4 = require("../../assets/img/kspt4.png")
// kspt5
const kaoshipingtai5 = require("../../assets/img/kspt5.png")
// kspt6
const kaoshipingtai6 = require("../../assets/img/kspt6.png")
// jbxt1
const jianbaoxitong1 = require("../../assets/img/jbxt1.png")
// jbxt2
const jianbaoxitong2 = require("../../assets/img/jbxt2.png")
// jbxt3
const jianbaoxitong3 = require("../../assets/img/jbxt3.png")
// jbxt4
const jianbaoxitong4 = require("../../assets/img/jbxt4.png")
// jbxt5
const jianbaoxitong5 = require("../../assets/img/jbxt5.png")
// jbxt6
const jianbaoxitong6 = require("../../assets/img/jbxt6.png")

export default function Detail() {
  const [searchParams] = useSearchParams();
  const [detailObj, setDetailObj] = useState({});
  // 项目类型
  const [divType, setDivType] = useState("pc");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
    {
      name: "智慧工地可视化管理",
      jishu: "Html+CSS+JavaScript+jQuery+Echarts+Bootstrap",
      desc: "该项目可以将传统的建筑施工工地转变为智能化、数字化的工地，并通过数据采集、分析和应用，实现对工地各个环节的实时监控、管理和优化。该项目旨在提高施工工地的安全、效率和质量，提升工程管理水平，降低施工风险和成本。包括有智能安全监控、数据采集与分析、智能设备管理、动态调度与协同管理等多个模块。",
      images: [gongdi1, gongdi2, gongdi3, gongdi4, gongdi5, gongdi6],
    },
    {
      name: "智慧车联网可视化管理",
      jishu: "Html+CSS+JavaScript+jQuery+Echarts",
      desc: "项目是基于物联网、云计算和人工智能等前沿技术的汽车智能化解决方案。该项目旨在实现汽车与互联网的深度融合，提供更安全、便捷、舒适的汽车出行体验。包括有车辆智能诊断、车辆远程控制、车辆导航和实时路况、驾驶辅助系统、 智能车联服务等多个模块。",
      images: [chelianwang1, chelianwang2],
    },
    {
      name: "智慧旅游可视化管理",
      jishu: "Vue+Element UI+DataV+Echarts",
      desc: "该项目是一种利用信息技术和智能化设备，实现景区资源管理、游客服务和安全管理的智能化解决方案。该项目旨在提升景区游客体验、管理效率和资源利用效率，实现景区管理的智能化和可持续发展。包括有智能导览服务、数据采集与分析、智能安全监控、智慧运营管理、智能营销推广等多个模块。",
      images: [lvyou1, lvyou2, lvyou3],
    },
    {
      name: "智慧园区可视化管理",
      jishu: "Vue+Element UI+DataV+Echarts",
      desc: "该项目是基于物联网、云计算和人工智能等技术的园区管理解决方案。该项目旨在实现园区的智能化管理和高效运营，提升园区的安全性、便利性和可持续发展能力。包括有智能安防系统、能源管理系统、智能停车系统、环境监测与管理、数据采集与分析等多个模块。",
      images: [yuanqu1, yuanqu2, yuanqu3, yuanqu4, yuanqu5],
    },
    {
      name: "智慧电商可视化管理",
      jishu: "Vue+Element UI+DataV+Echarts",
      desc: "该项目是一个基于智能化和数字化技术的电商平台，旨在提高用户购物体验、提升销售效率和降低成本。该项目通过数据分析、人工智能和物联网技术等手段，为用户提供个性化的购物推荐、精准的营销策略和便捷的物流服务。包括有个性化推荐、营销策略优化、智能客服、物流智能化、积分和会员管理等多个模块。",
      images: [dianshang1, dianshang2, dianshang3],
    },
    {
      name: "HealthPro健保系统",
      jishu: "Vue+Vuex+Element UI",
      desc: "该系统旨在提高医疗机构的效率、提供更好的服务质量和协调医疗流程，包括有患者管理、预约与排队管理、医生排班与出诊管理、医疗报告与记录、药品和库存管理、财务与结算管理、数据统计与分析等多个模块。该系统的目标是提高医疗机构的工作效率、减少人为错误、提供更高质量的医疗服务，并提供全面的数据支持和决策分析。",
      images: [jianbaoxitong1,jianbaoxitong2,jianbaoxitong3,jianbaoxitong4,jianbaoxitong5,jianbaoxitong6],
    },
    {
      name: "ExamGenius检验天才",
      jishu: "React+Ant Design Pro+Echarts",
      desc: "该平台旨在为学生和教育机构提供便捷和高效的考试和评估体验，包括有角色--权限管理、题库管理、班级管理、试卷管理、学生管理、阅卷管理、选择题和填空题自动评分、成绩管理、数据分析和报表等模块。该系统的目标是提高阅卷效率、减少人为错误、减少资源使用，提供智能化监考服务，并提供全面的数据支持和分析。",
      images: [kaoshipingtai1,kaoshipingtai2,kaoshipingtai3,kaoshipingtai4,kaoshipingtai5,kaoshipingtai6],
    },
    {
      name: "易享乐",
      jishu: "Vue+UniApp+Nvue",
      desc: "易享乐是一个面向校园社区和居民小区的二手交易平台，旨在帮助用户们更便捷地出售、购买或交换闲置物品，包括有物品发布、搜索和筛选、私信沟通、上架管理、评价功能、活动推广等多个功能模块。该App的目标是帮助用户们更便捷地处理闲置物品，实现资源的共享和回收利用。",
      images: [
        yixiangle1,
        yixiangle2,
        yixiangle3,
        yixiangle4,
        yixiangle5,
        yixiangle6,
        yixiangle7,
        yixiangle8,
      ],
    },
    {
      name: "影尚客",
      jishu: "Vue+UniApp",
      desc: "该项目是一个基于移动设备的应用程序，旨在为用户提供电影资讯、购票服务和影评互动等功能，提供全方位的电影体验。包括有电影资讯展示、影院选座购票、影片推荐和搜索、影评互动社区、影片收藏和提醒等多个功能模块。",
      images: [
        yingshangke1,
        yingshangke2,
        yingshangke3,
        yingshangke4,
        yingshangke5,
        yingshangke6,
        yingshangke7,
        yingshangke8,
        yingshangke9,
        yingshangke10,
        yingshangke11,
        yingshangke12,
      ],
    },
    {
      name: "掌上租",
      jishu: "React Native",
      desc: "该项目是一个基于移动设备的应用程序，旨在为租房者提供方便、快捷的租房服务，包括房源搜索、预约看房、在线签约等功能，帮助用户找到满意的租房房源。包括有房源搜索、房源详情、预约看房、在线签约、用户评价与投诉等多个功能模块。",
      images: [
        zhangshangzu1,
        zhangshangzu2,
        zhangshangzu3,
        zhangshangzu4,
        zhangshangzu5,
        zhangshangzu6,
        zhangshangzu7,
        zhangshangzu8,
        zhangshangzu9,
      ],
    },
    {
      name: "PerfectTemplate完美模板",
      jishu: "Vue+Uni App+Color UI+uView",
      desc: "该项目旨在提供一套可重用、风格一致且易于定制的UI组件库，以满足特定企业、产品或品牌的设计需求，包括有风格定制、组件复用、文档和示例、组件扩展性等多功能。通过使用该组件库，企业或产品可以提高设计效率、确保界面一致性，并在用户体验上提供更好的一致性和品牌感。该项目适用于移动端应用和小程序开发。",
      images: [
        zujian1,
        zujian2,
        zujian3,
        zujian4,
        zujian5,
        zujian6,
        zujian7,
        zujian8,
        zujian9,
      ],
    },
  ];

  useEffect(() => {
    document.documentElement.scrollTop = 0
    let name = searchParams.get("name");
    let type = searchParams.get("type");
    let idx = data.findIndex((item) => {
      return item.name === name;
    });
    // 预加载图片资源
    // preLoadImages(data[idx].images, function () {
    setDetailObj(data[idx]);
    // });
    setDivType(type);
  }, []);

  return (
    <div className="detail">
      {/* 头部 */}
      <div className="detail_header">
        {/* 文字 */}
        <div className="detail_text">
          <div className="text_title">{detailObj.name}</div>
          <div className="text_p">{detailObj.desc}</div>
        </div>
      </div>
      {/* 中间 */}
      <div className="detail_main">
        <div className="main_module1">
          <div className="num">01</div>
          <div className="name">所用技术栈</div>
          <div className="p">{detailObj.jishu}</div>
        </div>
        <div className="main_module1">
          <div className="num">02</div>
          <div className="name">业务应用概述</div>
          <div className="p">{detailObj.desc}</div>
        </div>
        <div className="main_module1">
          <div className="num">03</div>
          <div className="name">业务应用案例</div>
          <div className="p"></div>
          <div
            className="tu"
            style={{
              gridTemplateColumns:
                divType === "pc" ? "1fr 1fr" : "1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            {detailObj["images"]?.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                style={{ borderRadius: divType === "app" ? "15px" : "" }}
              ></img>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
