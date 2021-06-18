import React from "react";
import Footer from "./components/Footer";
import DroppableList from "./components/DroppableList";
import "./App.css";

const App: React.FC = () => {
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
                <button>1</button>
                <button>2</button>
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
      <Footer />
    </div>
  );
};

export default App;
