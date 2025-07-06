import React, { useEffect, useState } from "react";
import "./Home.scss";
import { goAnchor } from "../../common";
import isProduction from "@/env.js";
// import { projectList } from './mock';
import { serverURL } from "@/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  EffectCards,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import Footer from "../Footer/Footer";
import LottieCom from "@/components/Lottie";
import lottieCat from "@/assets/json/lottie-cat.json";
import lottieMonster from "@/assets/json/lottie-monster.json";
import { getProjectList } from "@/api/front-api";

export default function Home() {
  const navigate = useNavigate();
  // 项目经验列表
  const [proList, setProList] = useState([]);
  // 智慧系列1
  const [zhiHui1, setZhiHui1] = useState(null);
  // 智慧系列2
  const [zhiHui2, setZhiHui2] = useState(null);
  // 智慧系列3
  const [zhiHui3, setZhiHui3] = useState(null);
  // 智慧系列4
  const [zhiHui4, setZhiHui4] = useState(null);
  // 智慧系列5
  const [zhiHui5, setZhiHui5] = useState(null);
  // 智慧系列6
  const [zhiHui6, setZhiHui6] = useState(null);
  // 智慧系列7
  const [zhiHui7, setZhiHui7] = useState(null);
  // 智慧系列8
  const [zhiHui8, setZhiHui8] = useState(null);
  // 智慧系列9
  const [zhiHui9, setZhiHui9] = useState(null);
  // 智慧系列10
  const [zhiHui10, setZhiHui10] = useState(null);
  // 经典案例1
  const [anLi1, setAnLi1] = useState(null);
  // 经典案例2
  const [anLi2, setAnLi2] = useState(null);
  // 经典案例3
  const [anLi3, setAnLi3] = useState(null);
  // 经典案例4
  const [anLi4, setAnLi4] = useState(null);
  // 经典案例5
  const [anLi5, setAnLi5] = useState(null);
  // 经典案例6
  const [anLi6, setAnLi6] = useState(null);
  // 经典案例7
  const [anLi7, setAnLi7] = useState(null);
  // 经典案例8
  const [anLi8, setAnLi8] = useState(null);
  // 经典案例9
  const [anLi9, setAnLi9] = useState(null);
  // 去探索方法
  const toExplore = () => {
    goAnchor(".project");
  };
  // 去详情页面
  const toDetail = (id) => {
    navigate("/front/detail?id=" + id);
  };

  const getProList = async () => {
    const res = await getProjectList();
    if (res.code === 200) {
      setProList(res.data);
    }
  }


  useEffect(() => {
    getProList();
    if (!isProduction) {
      // setProList(projectList);
      setZhiHui1(require("../../assets/img/zhgd1.png"));
      setZhiHui2(require("../../assets/img/zhgd2.png"));
      setZhiHui3(require("../../assets/img/zhgd3.png"));
      setZhiHui4(require("../../assets/img/zhyq1.jpeg"));
      setZhiHui5(require("../../assets/img/zhyq2.jpeg"));
      setZhiHui6(require("../../assets/img/zhyq3.jpeg"));
      setZhiHui7(require("../../assets/img/zhyq4.jpeg"));
      setZhiHui8(require("../../assets/img/zhyq5.jpeg"));
      setZhiHui9(require("../../assets/img/zhgd4.png"));
      setZhiHui10(require("../../assets/img/zhgd5.png"));
      setAnLi1(require("../../assets/img/zj1.png"));
      setAnLi2(require("../../assets/img/zj2.png"));
      setAnLi3(require("../../assets/img/yxl2.png"));
      setAnLi4(require("../../assets/img/zj4.png"));
      setAnLi5(require("../../assets/img/yxl1.png"));
      setAnLi6(require("../../assets/img/yxl3.png"));
      setAnLi7(require("../../assets/img/zj5.png"));
      setAnLi8(require("../../assets/img/zj6.png"));
      setAnLi9(require("../../assets/img/zj3.png"));
    } else {
      setZhiHui1(serverURL + "/upload/project/zhgd1.png");
      setZhiHui2(serverURL + "/upload/project/zhgd2.png");
      setZhiHui3(serverURL + "/upload/project/zhgd3.png");
      setZhiHui4(serverURL + "/upload/project/zhyq1.jpeg");
      setZhiHui5(serverURL + "/upload/project/zhyq2.jpeg");
      setZhiHui6(serverURL + "/upload/project/zhyq3.jpeg");
      setZhiHui7(serverURL + "/upload/project/zhyq4.jpeg");
      setZhiHui8(serverURL + "/upload/project/zhyq5.jpeg");
      setZhiHui9(serverURL + "/upload/project/zhgd4.png");
      setZhiHui10(serverURL + "/upload/project/zhgd5.png");
      setAnLi1(serverURL + "/upload/project/zj1.png");
      setAnLi2(serverURL + "/upload/project/zj2.png");
      setAnLi3(serverURL + "/upload/project/yxl2.png");
      setAnLi4(serverURL + "/upload/project/zj4.png");
      setAnLi5(serverURL + "/upload/project/yxl1.png");
      setAnLi6(serverURL + "/upload/project/yxl3.png");
      setAnLi7(serverURL + "/upload/project/zj5.png");
      setAnLi8(serverURL + "/upload/project/zj6.png");
      setAnLi9(serverURL + "/upload/project/zj3.png");
    }
  }, []);
  return (
    <div className="home">
      {/* banner图部分 */}
      <div className="banner">
        <div className="inner">
          <h1 className="move_1">脚踏实地</h1>
          <h1 className="move_2">勇往直前</h1>
          <button className="move_3" onClick={toExplore}>
            E X P L O R E
          </button>
        </div>
        <div className="lottie-cat">
          <LottieCom src={lottieCat} />
        </div>
      </div>
      {/* 项目经验部分 */}
      <div className="project">
        <div className="title">
          <span style={{ marginRight: '20px' }}>项目经验</span>
        </div>
        <div className="content">
          {proList.filter((i, d) => d < 6).map((item, index) => {
            return (
              <div className="item" key={index}>
                {/* 背景 */}
                <img className="bg" src={item.bg} alt="" />
                {/* 前 */}
                <div className="just">
                  <img src={item.icon} alt="" />
                  <span>{item.title}</span>
                </div>
                {/* 后 */}
                <div className="back">
                  <img src={item.icon} alt="" />
                  <span>{item.title}</span>
                  <p>{item.desc}</p>
                  <span
                    onClick={() => {
                      toDetail(item._id);
                    }}
                  >
                    查看详情
                  </span>
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
      {/* 智慧系列 */}
      <div className="zhihui">
        <div className="title">智慧系列</div>
        <div className="content">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop={true} //设置循环轮播
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true, //设置小圆点是否要两头小，中间最大
              clickable: true, //设置是否可以点击
            }}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={zhiHui1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui4} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui5} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui6} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui7} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui8} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui9} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={zhiHui10} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* 经典案例 */}
      <div className="anli">
        <div className="title">经典案例</div>
        <div className="content">
          <Swiper
            effect={"cards"}
            pagination={{
              dynamicBullets: true, //设置小圆点是否要两头小，中间最大
              clickable: true, //设置是否可以点击
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            modules={[EffectCards, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={anLi1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi4} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi5} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi6} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi7} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi8} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={anLi9} alt="" />
            </SwiperSlide>
          </Swiper>
          <div className="lottie-monster">
            <LottieCom src={lottieMonster} />
          </div>
        </div>
      </div>
      {/* 底部部分 */}
      <Footer />
    </div>
  );
}
