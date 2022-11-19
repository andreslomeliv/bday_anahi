import { AnimationSequence } from "./animation/AnimationSequence";
import { useState, useEffect } from "react";
import { Letters } from "./letters/Letters";
import famPhoto from "./fam_photo.png";
import anime from "animejs";
import clickIcon from "./mouse-click.png";

function StartButton(props: {
  startedSequence: boolean;
  setStartSequence: (flag: boolean) => void;
}) {
  const [isDisabled, setIsDisabled] = useState(false);


  if (props.startedSequence) {
    return null;
  }

  return (
    <div
      style={{
        top: "40%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        id="start-button"
        className="button"
        style={{ width: 200, height: 90 }}
        disabled={isDisabled}
        onClick={(_e) => {
          setIsDisabled(true);

          anime
            .timeline()
            .add({
              targets: "#loading-input",
              opacity: 1,
              duration: 100,
            })
            .add(
              {
                targets: "#loading-input",
                value: [0, 100],
                delay: 900,
                duration: 8000,
                easing: "cubicBezier(1.000, 0.035, 0.430, 0.975)",
                round: 1,
              },
              "+=300"
            )
            .add(
              {
                targets: "#loading-bar",
                width: ["0%", "80%"],
                delay: 900,
                duration: 8000,
                easing: "cubicBezier(1.000, 0.035, 0.430, 0.975)",
              },
              400
            )
            .add(
              {
                targets: ["#loading-bar", "#loading-input"],
                opacity: 0,
                duration: 1000,
              },
              "+=1900"
            )
            .add({
              targets: document.querySelectorAll("#start-button"),
              scale: 0.01,
              duration: 3000,
              easing: "linear",
            })
            .add(
              {
                targets: document.querySelectorAll("#start-button"),
                scale: 25,
                opacity: 0,
                duration: 2000,
                easing: "cubicBezier(1.000, 0.390, 0.980, 0.075)",
                complete: () => {
                  window.setTimeout(() => props.setStartSequence(true), 1400);
                },
              },
              "+=500"
            );
        }}
      >
        <span>
          <img
            style={{ width: "60px", height: "60px" }}
            alt="Click hand"
            src={clickIcon}
          />
        </span>
      </button>
      <div id="loading-bar" />
      <div>
        <input id="loading-input" style={{ opacity: 0 }} disabled value={0} />
      </div>
    </div>
  );
}

function FamPhoto() {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const photo = anime({
      targets: "#photo-fam",
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 4000,
      easing: "linear",
      loop: false,
    });
    photo.play();
    return () => {
      photo.restart();
      photo.pause();
    };
  }, []);

  useEffect(() => {
    if (!showText) {
      return;
    }
    const finalTextScale = anime({
      targets: ".final-text",
      scale: 10,
      duration: 1400,
    });
    finalTextScale.play();
    const heart = anime({
      targets: "#heart-emoji",
      keyframes: [{ scale: 0.9 }, { scale: 1.1 }, { scale: 0.85 }],
      easing: "cubicBezier(0.135, 0.865, 0.575, 0.445)",
      loop: true,
    });
    heart.restart();
    heart.pause();
    finalTextScale.finished.then(() => {
      heart.play();
    });
    return () => {
      if (showText) {
        heart.restart();
        heart.pause();
        finalTextScale.restart();
        finalTextScale.pause();
      }
    };
  }, [showText]);

  useEffect(() => {
    setTimeout(() => setShowText(true), 7000);
  }, []);
  return (
    <div style={{ height: "100%" }}>
      <div style={{ maxWidth: "100vw" }}>
        <img
          id="photo-fam"
          style={{ maxWidth: "100vw", marginTop: "200px", opacity: 0 }}
          src={famPhoto}
          alt="Foto de Fam"
        />
      </div>
      {showText && (
        <div className="final-text">
          <p style={{ textAlign: "center", marginBottom: 4 }}>
            Hecho por fam con{" "}
          </p>
          <p
            id="heart-emoji"
            style={{ textAlign: "center", fontSize: 40, marginTop: 4 }}
          >
            {"❤️"}
          </p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [startedSequence, setStartSequence] = useState(false);
  const [hasFinishedSequence, setHasFinishedSequence] = useState(false);
  const [hasFinishedLetters, setHasFinishedLetters] = useState(false);
  return (
    <div style={{ height: "100%" }}>
      <StartButton
        startedSequence={startedSequence}
        setStartSequence={setStartSequence}
      />
      {startedSequence && !hasFinishedSequence && (
        <AnimationSequence
          setHasFinishedSequence={() => setHasFinishedSequence(true)}
        />
      )}
      {hasFinishedSequence && (
        <Letters
          setFinished={() => {
            setTimeout(() => setHasFinishedLetters(true), 800);
          }}
        />
      )}
      {hasFinishedLetters && <FamPhoto />}
    </div>
  );
}

export default App;
