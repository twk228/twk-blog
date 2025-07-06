import "./Front.scss";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { Drawer } from 'antd';
import { CaretUpOutlined, MenuOutlined } from "@ant-design/icons";
import { goAnchor } from "../../common";

const { Header, Content } = Layout;

function Front() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const [curNav, setCurNav] = useState('home');
  const scrollEvent = () => {
    let headerDom = document.querySelector(".header");
    if (document.documentElement.scrollTop >= 700) {
      headerDom.style.background = "rgba(0,0,0,.5)";
      setState(true);
    } else {
      let dingDom = document.querySelector(".ding");
      if (dingDom) {
        dingDom.className = "ding leave_ding";
      }
      headerDom.style.background = "";
      setState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  const toHome = () => {
    setCurNav('home');
    onClose();
    navigate("/front");
  };
  const toAbout = () => {
    setCurNav('about');
    onClose();
    navigate("/front/about");
  };
  const toNav = () => {
    setCurNav('nav');
    onClose();
    navigate("/front/nav");
  };
  const toAdmin = () => {
    navigate("/admin")
  };
  const toTop = () => {
    goAnchor("#top");
  };
  const showDrawer = (type) => {
    setOpen(!open);
    setPlacement(type);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="Front" id="top">
      <div className="line"></div>
      <Layout style={{ height: "100%" }}>
        {/* 头部导航 */}
        <Header className="header">
          <div className="header-left">
            <h1 onClick={toHome}>[BlogMe]</h1>
            <div className="icon">
              <svg t="1739847090516" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7706" width="20" height="20"><path d="M489.7954323 925.11952592H674.62637037c174.76266667 0 316.39809897-24.39881008 316.39809896-286.90204444 0-114.93558045-22.93274548-169.30618785-61.65238518-216.75425185a87.556096 87.556096 0 0 0-13.4761434-17.47626666L657.51904711 143.90127882C613.22642015 99.49214341 550.83614815 119.87141215 519.89344711 150.82382222c-30.94270103 31.06891852-36.16616297 95.39128889 0 131.80017778l56.32212386 56.67164918H217.21421748c-51.08895289 0-92.46886875 41.63235082-92.46886873 93.08053807 0 51.4578963 41.38962489 90.05131852 92.46886873 90.05131853h93.81842489a92.02225303 92.02225303 0 0 0-11.04888415 43.92368355c0 40.90417303 26.34061748 72.70126933 62.74950637 85.1968a94.633984 94.633984 0 0 0-14.0781037 49.63259734c0 40.90417303 26.33090845 72.6915603 62.73979733 85.1968-8.85464178 14.32082963-14.06839467 29.12711111-14.06839467 47.20533808v2.42725925c-0.00970903 51.48702341 41.37020682 89.10954192 92.46886875 89.10954192z m5.70891378-48.7879111c-45.51596563 0-43.81688415-42.71976297-43.81688416-42.71976297 0-24.39881008 19.6608-42.60325452 43.81688416-42.60325452h96.36219259v-0.48545185c1.58257303 0.35923437 3.15543703 0.48545185 4.85451851 0.48545185 13.34992592 0 24.27259259-10.32070637 24.2725926-23.90364918a24.31142875 24.31142875 0 0 0-29.12711111-24.02986667v-0.48545185H450.71655822c-41.03039052 0-43.81688415-44.04990103-43.81688414-44.04990104 0-24.39881008 19.65109097-41.7585683 43.81688414-41.75856829h112.0131603v-0.48545185a24.41822815 24.41822815 0 0 0 29.25332859-24.02015763 24.41822815 24.41822815 0 0 0-29.25332859-24.02986667v-0.48545185H402.17137303c-44.41884445 0-43.81688415-43.20521482-43.81688414-43.20521482 0-24.38910103 19.65109097-41.98187615 43.81688414-41.98187615h121.84841482v-0.49516088c1.572864 0.36894341 3.145728 0.49516089 4.85451852 0.49516088a24.50560948 24.50560948 0 0 0 24.38910104-24.51531851 24.41822815 24.41822815 0 0 0-29.24361956-24.02986667v-0.48545185H227.03976297c-24.14637511 0-43.81688415-16.62187141-43.81688415-41.02068148s19.6608-44.17611852 43.81688415-44.17611852h466.88817303l-52.68123497-52.91425185-79.96362903-80.46849897c-17.12674133-17.23354075-16.515072-50.00154075 1.33013808-67.83704178s45.63247408-23.42790637 67.4778074-1.58257303l244.66773334 246.24059733c45.26353067 45.63247408 67.72053333 105.95472118 67.72053333 206.44325452 0 237.14322963-119.90660741 237.87140741-267.71698726 237.8714074l-179.25795081 0.2330169zM216.4860397 241.729536c-104.49836563 0-189.20971378 84.58513067-189.20971378 189.0834963 0 104.37214815 84.5948397 189.0834963 189.09320533 189.08349629 17.60248415 0 34.46708148-2.66027615 50.60350105-7.15556029a66.80788385 66.80788385 0 0 1-19.77730845-45.14702222c-10.19448889 2.31075082-20.50548622 3.52438045-30.8261926 3.52438044-77.43927941 0-140.29558518-62.74950637-140.29558517-140.29558519 0-77.42957037 62.74950637-140.29558518 140.29558517-140.29558518 19.65109097 0.12621748 39.06916503 4.25255822 57.0405926 12.26251377h81.79863704c-34.59329897-37.39921067-83.99287941-61.06013392-138.72272119-61.06013392z" p-id="7707" fill="#ffffff"></path></svg>
              <div className="tip-text">返回首页</div>
            </div>
          </div>
          <ul>
            <li onClick={toHome} className={curNav === 'home' ? 'active' : ''}>首页</li>
            <li onClick={toAbout} className={curNav === 'about' ? 'active' : ''}>关于我</li>
            <li onClick={toNav} className={curNav === 'nav' ? 'active' : ''}>我的导航</li>
          </ul>
          <Drawer
            className="my-drawer"
            placement={placement}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
            width={'50%'}
            style={{ background: '#202529' }}
          >
            <ul>
              <li onClick={toHome} className={curNav === 'home' ? 'active' : ''}>首页</li>
              <li onClick={toAbout} className={curNav === 'about' ? 'active' : ''}>关于我</li>
              <li onClick={toNav} className={curNav === 'nav' ? 'active' : ''}>我的导航</li>
            </ul>
          </Drawer>
          <div className="right-btn">
            <div className="nav-toolBtn" onClick={() => showDrawer('right')}>
              <MenuOutlined />
            </div>
            <button className="admin-btn" onClick={toAdmin}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Admin
            </button>
          </div>
        </Header>
        {/* 主体部分 */}
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
      {state ? (
        <div className="ding move_ding" onClick={toTop}>
          <CaretUpOutlined />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Front;
