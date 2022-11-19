import { useEffect } from "react";
import anime from "animejs";

interface IProps {
  content: string;
  delayToFinish: number;
  id: string;
  setFinished: () => void;
}

export function TypingText(props: IProps) {
  useEffect(() => {
    const text = document.getElementById(`animated-text-${props.id}`);
    const lettersHtml = text?.textContent?.replace(
      /\S/g,
      "<span class='animation-sequence-letter'>$&</span>"
    );
    if (text == null || lettersHtml == null) {
      return;
    }
    text.innerHTML = `<div class="animation-sequence-letters">${lettersHtml}</div>`;

    const TYPE_AFTER_MS = 2_000;
    const JUMP_AFTER_MS = 100;
    const typing = anime
      .timeline({ loop: false })
      .add(
        {
          targets: ".animation-sequence-letter",
          opacity: [0, 1],
          duration: 1,
          delay: anime.stagger(JUMP_AFTER_MS),
        },
        TYPE_AFTER_MS
      )
      .add({
        targets: ".animation-sequence-text",
        opacity: 0,
        duration: 30,
        delay: props.delayToFinish,
        easing: "easeOutExpo",
        complete: () => props.setFinished(),
      });

    return () => {
      typing.restart();
      typing.pause();
    };
    // eslint-disable-next-line
  }, [props.content]);

  return <h1 id={`animated-text-${props.id}`}>{props.content}</h1>;
}
