import React, { useState, useEffect } from "react";
import "../../styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Smoke } from "../Smoke/Smoke";

import Player from "../Player/Player";

const images = [
  "https://www.kolpaper.com/wp-content/uploads/2020/04/pubg-desktop-wallpaper.jpg",
  "https://images3.alphacoders.com/816/thumb-1920-816720.jpg",
  "https://wallpapersmug.com/download/1920x1080/372590/pubg-android-game-4k.jpg",
  "https://wallpaperaccess.com/full/1923851.jpg"
];

const tips = ["Csináld ezt", "Meg ezt", "Jó játékot!", "teszt"];


export const Slider = () => {

  const delay = 5500;
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [reset, setReset] = useState(0);

  var count = 0;
  var thisCount = 0;

  const handlers = {
      startInitFunctionOrder(data) {
          count = data.count;
      },

      initFunctionInvoking(data) {
          setPercent(((data.idx / count) * 100))
      },

      startDataFileEntries(data) {
          count = data.count;
      },

      performMapLoadFunction(data) {
          ++thisCount;
          setPercent(((thisCount / count) * 100));
      },
  };


  useEffect(()=>{
    window.addEventListener('message', function (e) {
      (handlers[e.data.eventName] || function () { })(e.data);
    });
  },[])


  useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    setPercent(60)
    return () => {};
  }, [index]);

  return (
    <div className="slideshow">
      <h2 className="testfont">LOADING SCREEN</h2>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
      >
        {images.map((link, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundImage: `url(${link})` }}
          />
        ))}
      </div>

      <h2 className="progressLabel">Betöltés folyamatban... {Math.ceil(percent)} %</h2>
      <Player url={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}/>
      <div className="progressbarContainer">
        <div className="progress" style={{ width: percent ? percent +"%" : 0 + "%" }}></div>
      </div>

      <div className="tipsContainer">
        <div className="iconContainer">
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className="tips2">{tips[index]}</div>
      </div>
      <Smoke />
      <p className="copyright">By:Gellipapa</p>
    </div>
  );
};
