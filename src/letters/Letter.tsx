import anime from "animejs";
import { useEffect } from "react";

interface IProps {
  author: string;
  content: string;
  nextLetter: () => void;
  onBeginAnimation: () => void;
  isDisabled: boolean;
}

export function Letter(props: IProps) {
  useEffect(() => {
    const pop = anime({
      targets: "#letter-content h1",
      keyframes: [
        {
          scale: 1.8,
          duration: 1000,
          easing: "easeOutExpo",
        },
        {
          scale: 0.9,
          duration: 800,
          easing: "easeOutBounce",
        },
      ],
    });
    return () => pop.pause();
  }, [props.author]);

  useEffect(() => {
    const dance = anime({
      targets: "#next-letter-btn",
      keyframes: [
        {
          rotate: "2deg",
        },
        {
          rotate: "0deg",
        },
        {
          rotate: "-2deg",
        },
        {
          rotate: "0deg",
        },
      ],
      duration: 1000,
      loop: true,
      // direction: "alternate",
      easing: "linear",
    });
    return () => {
      dance.restart();
      dance.pause();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
        justifyContent: "space-between",
      }}
    >
      <div id="letter-content">
        <h1 style={{ textAlign: "center" }}>{props.author}</h1>
        <p style={{ textAlign: "center" }}>{props.content}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          id="next-letter-btn"
          disabled={props.isDisabled}
          className="button"
          onClick={() => {
            anime
              .timeline({
                targets: "#letter-content",
                begin: () => props.onBeginAnimation(),
              })
              .add({
                color: "#000",
                easing: "linear",
                duration: 1000,
              })
              .add(
                {
                  begin: () => props.nextLetter(),
                  easing: "linear",
                  duration: 1000,
                  color: "#FFF",
                },
                "+=200"
              );
          }}
        >
          {props.author === "Fam" ? "Comenzar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
