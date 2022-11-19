import "./animation-sequence.css";
import { useState, useEffect } from "react";
import { TypingText } from "./TypingText";
import anime from "animejs";

const content = [
  {
    content: "...",
    delayToFinish: 2000,
  },
  {
    content: "HBD, Anahí",
    delayToFinish: 3000,
  },
  {
    content: "Te preparamos algo especial...",
    delayToFinish: 3000,
  },
  {
    content: "No vayas a salir de esta pagina. Estás siendo geolocalizada por nuestros servidores.",
    delayToFinish: 3000,
  },
  {
    content: "Bueno, comencemos.",
    delayToFinish: 2000,
  },
  {
    content: "Para la primer sorpresa,",
    delayToFinish: 2000,
  },
  {
    content: "Ve por tu ventana \u061c hacia la calle.",
    delayToFinish: 8000,
  },
  {
    content: "Ya viste?",
    delayToFinish: 5000,
  },
  {
    content: "Jaja es pedo",
    delayToFinish: 5000,
  },
  {
    content: "Además de tu [regalo sorpresa]...",
    delayToFinish: 3000,
  },
  {
    content: "(Que llegará \u061c \u061c \u061c \u061c \u061c pronto)",
    delayToFinish: 3000,
  },
  {
    content: "Quisimos decirte \u061c \u061c algo...",
    delayToFinish: 2000,
  },
  {
    content: "Cada uno de nosotros :)",
    delayToFinish: 4000,
  },
  {
    content: "Pero antes, pon esta canción para setear el mood",
    delayToFinish: 2000,
  },
];

interface IProps {
  setHasFinishedSequence: () => void;
}

export function AnimationSequence(props: IProps) {
  const [contentIdx, setContentIdx] = useState(0);
  const [hasFinishedFirstText, setHasFinishedFirstText] = useState(false);
  const [hasClickedPlaySong, setHasClickedPlaySong] = useState(false);
  useEffect(() => {
    if (!hasFinishedFirstText) {
      return;
    }
    const colors = anime({
      targets: "#poner-cancion",
      keyframes: [
        { color: "rgb(255, 0, 0)" },
        { color: "rgb(255, 255, 0)" },
        { color: "rgb(0, 255, 0)" },
        { color: "rgb(0, 255, 255)" },
        { color: "rgb(0, 0, 255)" },
        { color: "rgb(255, 0, 255)" },
      ],
      easing: "linear",
      duration: 3000,
      loop: true,
    });
    colors.play();
    return () => colors.pause();
  }, [hasFinishedFirstText]);

  return (
    <div className="animation-sequence-root">
      <div className="animation-sequence-text">
        {!hasFinishedFirstText && (
          <TypingText
            content={content[contentIdx].content}
            delayToFinish={content[contentIdx].delayToFinish}
            id={`${contentIdx}`}
            setFinished={() => {
              setContentIdx((contentIdx) => {
                if (contentIdx + 1 >= content.length) {
                  setHasFinishedFirstText(true);
                }
                return contentIdx + 1 >= content.length ? 0 : contentIdx + 1;
              });
            }}
          />
        )}
        {hasFinishedFirstText && !hasClickedPlaySong && (
          <div
            onClick={() => {
              setHasClickedPlaySong(true);
            }}
          >
            <a
              href="https://open.spotify.com/track/6IEzGhvKEeUprf0pVk21ye?si=f3dc6c1ed0c74ca1"
              target="_blank"
              rel="noreferrer"
              className="open-song"
              id="poner-cancion"
            >
              Poner canción
            </a>
          </div>
        )}
        {hasClickedPlaySong && (
          <>
            <button
              id="played-song-button"
              className="button"
              onClick={() => {
                const offsetY =
                  window.screen.height +
                  (document
                    .getElementById("played-song-button")
                    ?.getBoundingClientRect().top ?? 0);
                anime
                  .timeline()
                  .add({
                    targets: "#played-song-button",
                    scale: 0.5,
                    easing: "spring(1, 80, 10, 0)",
                  })
                  .add({
                    targets: "#played-song-button",
                    translateY: offsetY,
                    complete: () => props.setHasFinishedSequence(),
                  })
                  .add(
                    {
                      targets: "#are-you-bored-yet",
                      duration: 2400,
                      color: "#000",
                    },
                    0
                  );
              }}
            >
              Ya puse la canción
            </button>
            <p id="are-you-bored-yet" style={{ fontSize: 14 }}>
              [For My Friends]
            </p>
          </>
        )}
      </div>
    </div>
  );
}
