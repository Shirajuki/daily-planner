import React, { useState } from "react";
import Footer from "./components/Footer";
import DroppableList from "./components/DroppableList";
import "./App.css";

const App: React.FC = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="App">
      <div className="todaysTask">
        <div className="topBackground">
          <h3>DAILYJUKIPLANNER</h3>
          <div className="infoBox">
            <div className="dateBox">
              <p className="day">15</p>
              <p className="month">June</p>
              <p className="year">2021</p>
              <p className="weekday">Tuesday</p>
            </div>
            <div className="statsBox">
              <div className="stats">
                <p className="num">9</p>
                <p>done</p>
              </div>
              <div className="stats">
                <p className="num">10</p>
                <p>due today</p>
              </div>
            </div>
          </div>
          <div className="navigationBox">
            <div className="statsBox">
              <p>
                June 15, 2021 <span>Tuesday</span>
              </p>
              <div>
                <button>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.4 2.7063C0.4 1.82264 1.11634 1.1063 2 1.1063H15C15.8837 1.1063 16.6 1.82264 16.6 2.7063V11.421C16.6 12.3046 15.8837 13.021 15 13.021H2C1.11634 13.021 0.4 12.3046 0.4 11.421L0.4 2.7063Z"
                      stroke="#707070"
                      stroke-width="0.8"
                    />
                    <path d="M4.76001 0V3.17867" stroke="#707070" />
                    <path d="M12.2401 0V3.17867" stroke="#707070" />
                    <path
                      d="M0 4.47363L17 4.47363"
                      stroke="#707070"
                      stroke-width="0.8"
                    />
                    <path d="M8.5 3.17859V-8.14795e-05" stroke="#707070" />
                    <path
                      d="M13.021 11.1842C13.021 13.6811 10.9969 15.7053 8.49997 15.7053C6.00306 15.7053 3.97892 13.6811 3.97892 11.1842C3.97892 8.68733 6.00306 6.66318 8.49997 6.66318C10.9969 6.66318 13.021 8.68733 13.021 11.1842Z"
                      fill="#F7DAF8"
                      stroke="#707070"
                      stroke-width="0.8"
                    />
                    <path
                      d="M9.59357 12.2779C10.6871 13.3715 8.5 11.1844 8.5 11.1844C8.5 10.3095 8.5 6.81011 8.5 8.99724"
                      stroke="#707070"
                      stroke-width="0.5"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0777 10.0441L11.1172 10.4H11.4753H11.5023C12.0592 10.4 12.5934 10.6213 12.9872 11.0151C13.381 11.4089 13.6023 11.9431 13.6023 12.5C13.6023 13.057 13.381 13.5911 12.9872 13.985C12.5934 14.3788 12.0592 14.6 11.5023 14.6L3.00227 14.6L3.00197 14.6C2.33061 14.6005 1.68508 14.3413 1.2005 13.8767C0.715928 13.412 0.42987 12.7779 0.40221 12.1072C0.37455 11.4364 0.607432 10.7809 1.05211 10.2779C1.49678 9.77493 2.11878 9.46346 2.7879 9.4087L3.04697 9.38749L3.13282 9.14215C3.4398 8.26489 4.03572 7.51797 4.82289 7.02384C5.61006 6.5297 6.54175 6.31767 7.46523 6.42252C8.38871 6.52736 9.24916 6.94285 9.90553 7.60088C10.5619 8.2589 10.9752 9.12041 11.0777 10.0441Z"
                      stroke="#707070"
                      stroke-width="0.8"
                    />
                    <path
                      d="M14.0715 2.28415L14.0716 2.28418C14.0955 2.26112 14.1145 2.23353 14.1276 2.20303C14.1407 2.17253 14.1476 2.13972 14.1479 2.10653C14.1482 2.07333 14.1419 2.04041 14.1293 2.00969C14.1167 1.97896 14.0981 1.95105 14.0747 1.92758C14.0512 1.90411 14.0233 1.88554 13.9926 1.87297C13.9618 1.8604 13.9289 1.85408 13.8957 1.85437C13.8625 1.85465 13.8297 1.86155 13.7992 1.87465C13.7687 1.88775 13.7411 1.9068 13.7181 1.93068L13.7149 1.93393L13.7149 1.9339L13.007 2.64078C12.96 2.68778 12.9336 2.75153 12.9336 2.818C12.9336 2.88447 12.96 2.94822 13.007 2.99522C13.054 3.04223 13.1178 3.06863 13.1843 3.06863C13.2507 3.06863 13.3144 3.04227 13.3614 2.99535L14.0715 2.28415ZM14.0715 2.28415L14.0684 2.28735L13.3615 2.99522L14.0715 2.28415ZM13.361 9.00425L13.3615 9.00478L14.0684 9.71172C14.0684 9.71174 14.0685 9.71176 14.0685 9.71178C14.0932 9.73654 14.1125 9.76622 14.125 9.7989C14.1287 9.80863 14.1318 9.81855 14.1343 9.82862C13.8016 9.50115 13.4075 9.23481 12.9711 9.04896C12.9976 9.00605 13.0365 8.97218 13.0827 8.9518C13.1289 8.93138 13.1803 8.92547 13.23 8.93483C13.2796 8.94419 13.3253 8.9684 13.361 9.00425ZM10.179 0.323223C10.2259 0.370107 10.2523 0.433695 10.2523 0.5V1.5C10.2523 1.5663 10.2259 1.62989 10.179 1.67678C10.1321 1.72366 10.0686 1.75 10.0023 1.75C9.93595 1.75 9.87236 1.72366 9.82548 1.67678C9.77859 1.62989 9.75225 1.5663 9.75225 1.5V0.5C9.75225 0.433696 9.77859 0.370107 9.82548 0.323223C9.87236 0.276339 9.93595 0.25 10.0023 0.25C10.0686 0.25 10.1321 0.276339 10.179 0.323223ZM6.11672 1.86665C6.1817 1.86609 6.24431 1.89084 6.29133 1.93563L6.99748 2.64078C6.99751 2.64081 6.99754 2.64084 6.99757 2.64087C7.0208 2.66412 7.03923 2.69172 7.05181 2.72209C7.0644 2.7525 7.07088 2.78509 7.07088 2.818C7.07088 2.85091 7.0644 2.8835 7.05181 2.91391C7.03921 2.94432 7.02075 2.97195 6.99748 2.99522C6.9742 3.0185 6.94657 3.03696 6.91616 3.04955C6.88576 3.06215 6.85317 3.06863 6.82025 3.06863C6.78734 3.06863 6.75475 3.06215 6.72434 3.04955C6.69393 3.03696 6.6663 3.0185 6.64303 2.99522L5.93788 2.28908C5.8931 2.24206 5.86834 2.17945 5.86891 2.11447C5.86948 2.04892 5.89577 1.98622 5.94212 1.93987C5.98847 1.89352 6.05117 1.86722 6.11672 1.86665ZM8.56259 4.27044C8.36589 4.43407 8.19891 4.62974 8.06846 4.84874C7.89486 4.81607 7.71844 4.79121 7.53969 4.7745C7.67538 4.50222 7.85566 4.25362 8.07379 4.03933C8.37245 3.74591 8.73416 3.52457 9.13135 3.39216C9.52853 3.25976 9.95071 3.21979 10.3657 3.27531C10.7807 3.33083 11.1775 3.48037 11.5259 3.71252C11.8743 3.94468 12.1651 4.25333 12.3762 4.61493C12.5872 4.97653 12.7129 5.38154 12.7436 5.79909C12.7743 6.21663 12.7093 6.63568 12.5536 7.0243C12.4397 7.30826 12.2796 7.5705 12.0804 7.80065C11.9965 7.64331 11.9055 7.49015 11.8078 7.34181C11.9597 7.1373 12.076 6.90807 12.1514 6.66373C12.2463 6.35631 12.2742 6.03212 12.2331 5.71303C12.192 5.39393 12.083 5.08735 11.9134 4.81397C11.7438 4.54058 11.5175 4.30676 11.2498 4.12826C10.9822 3.94976 10.6793 3.83074 10.3618 3.77922C10.0442 3.72771 9.71925 3.7449 9.40888 3.82964C9.09851 3.91438 8.80993 4.0647 8.56259 4.27044ZM14.3255 5.82322C14.3724 5.77634 14.4359 5.75 14.5023 5.75H15.5023C15.5686 5.75 15.6321 5.77634 15.679 5.82322C15.7259 5.87011 15.7523 5.9337 15.7523 6C15.7523 6.0663 15.7259 6.12989 15.679 6.17678C15.6321 6.22366 15.5686 6.25 15.5023 6.25H14.5023C14.4359 6.25 14.3724 6.22366 14.3255 6.17678C14.2786 6.12989 14.2523 6.0663 14.2523 6C14.2523 5.9337 14.2786 5.87011 14.3255 5.82322Z"
                      stroke="#707070"
                      stroke-width="0.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="navBox">
              <button>←</button>
              <button>→</button>
            </div>
          </div>
        </div>
        <DroppableList />
      </div>
      <Footer selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default App;
