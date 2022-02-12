import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);
  const spaceEvent = new KeyboardEvent("keydown", { keyCode: "Space", which: 32 });

  useEffect(()=>{
    window.dispatchEvent(spaceEvent)

    window.addEventListener('keydown', (e) => {
      console.log(e)
    })

  },[])

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

  const Player = ({ url }) => {
      const [playing, toggle] = useAudio(url);

  useEffect(() => {
      const handleButton = (event) => {
              if (event.keyCode === 32) {
                  toggle()
              }
      };

      window.addEventListener('keydown', handleButton);
      
      return () => {
          window.removeEventListener('keydown', handleButton);
      };
  }, [playing]);

  return (null);
  };

export default Player;