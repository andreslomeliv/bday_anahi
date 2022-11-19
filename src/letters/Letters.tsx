import { useState, useEffect } from "react";
import { Letter } from "./Letter";

const content = [
  {
    author: "Fam",
    content:
      "Feliz cumpleaños, Anahí. Esperamos tengas un bonito cumpleaños. Te dejamos unas palabras con <3 y una sorpresa al final",
  },
  {
    author: "Tisar FC",
    content:
      "Muchas gracias por todos estos años de amistad! Te quiero mucho! Que pases muy bonito cumpleaños!",
  },
  {
    author: "Mario",
    content:
      "Anahí muchas felicidades!!!! Te deseo lo mejor en tu día que dios te bendiga y que cumplas muchísimos años más!!! Muchas gracias por todo, aunque no hablemos mucho ya sabes que aquí estoy siempre para lo que necesites. Te mando un abrazo!!! 😄",
  },
  {
    author: "Gayby (pt. 1)",
    content:
      "Feliz cumpleaños puna!!! Jajaaj bien secundaria pero espero que este año te la pases increíble y que esté lleno de puro crecimiento, sabes que aunque estemos y seguiremos a la distancia nuestra amistad es incondicional y para toda la vida!",
  },
  {
    author: "Gayby (pt. 2)",
    content:
      "Quiero que sepas que estoy muy orgullosa de ti y de todos tus logros!!  Sabes que cuentas conmigo para toda la vida!! Síguela rompiendo!! Felices 25 morrita!!!! Te amo siempre💓",
  },
  {
    author: "Benja",
    content:
      "Broou, te deseo lo mejor de lo mejor, ya sabes que tienes en mi un hermano y lit lo que sea alv estamos a una llamada de distancia. Me da mucho orgullo ser tu amigo y ser testigo de tu crecimiento cañonsisimo, y esa fuerza de voluntad tan grande que tienes. Eres un ejemplo mi hermana te quiero mucho! ❤️",
  },
  {
    author: "Polypocket97",
    content:
      "Happy birthdayy M.A!! Ya sabes que te deseo toda la felicidad del mundo, eres una de las personas más importantes e indispensables en mi vida y espero Diosito y la vida nos permita seguir siempre juntas como en los últimos 13ish años. Estoy muy feliz y orgullosa de tii y todo lo que has logrado, tanto personalmente como profesionalmente. Siempre estoy aquí, ya sabes. Te amo mucho, siempre juntas💗",
  },
  {
    author: "Esclome",
    content:
      "Que pedinsky bro, ya para este punto tuve la suerte de felicitarte en persona pero aún así te deseo muchas felicidades y te mando un abrazo. Te cu mil 💗",
  },
  {
    author: "Mau",
    content:
      "Muchas felicidades brothy, Te deseo lo mejor del mundo para este día tan especial y espero que te la estés pasando de lo mejor con los que mas te quieren (o una parte porque falta FAM). Gracias por tu amistad tan sincera y por ser siempre tan tu en todos los sentidos, eres una chingonada y me lo sigues demostrando día a día con cada logro y superación que alcanzas. Espero poder compartir contigo muchos mas momentos chingones y que los festejos nunca nos falten. TQM ❤️",
  },
  {
    author: "Torres",
    content:
      "Anahí, aprovechando que es tu cumpleaños, te quiero decir un poco de lo mucho que te quiero. Eres una amiga súper genuina. Siempre dispuesta a ayudarme en los momentos que más necesito. En verdad aprecio bastante todo lo que has hecho por mí, todos los consejos que me has dado y todo el amor que siento de ti. Eres alguien súper divertida y súper chingona en todo lo que haces, me siento muy orgulloso de poder llamarme tu amigo. Quiero que sepas que te quiero un chingaso y que siempre vas a poder contar conmigo en cualquier cosa que necesites. Sigue siendo la chingona que siempre has sido. Feliz cumpleaños, hermana <3.",
  },
  {
    author: "Chuy",
    content:
      "Amiga mía, te escribo unas palabras mamalonas para intentar alegrar más tu día. Espero que hoy estes teniendo un día único, lleno de felicidad y placer. Y si por alguna razón no estas teniendo ese día ya, ponte verga y búscalo. Usa este detalle para encontrar inspiración. Recuerdalo, viva los excesos, viva el amor y la amistad. Feliz cumpleaños, brou, te quiero un chingo y de verdad te deseo lo mejor. Espero verte pronto, chica. 💚",
  },
  {
    author: "ASS (Alejandro Salinas Sandoval)",
    content:
      "Herman@, más que decirte felicidades,  quisiera aprovechar para decirte lo feliz y orgulloso que estoy de ti por todo lo que has logrado y cómo siempre sales adelante con todo. Eres una gran persona, con un gran corazón y que tiene muchas virtudes apesar de estar media pendejona JAJAJA. Ya serio, de verdad me da muchísimo gusto como has seguido superándote a ti misma, convertirte en una excelente profesionista y siendo una persona muy auténtica siempre. Te amo y te deseo un graaan cumpleaños, disfruta mil!! ❤️",
  },
  {
    author: "La parca",
    content:
      "Anahi bro eres una de la persona ma especialez que tengo en mi vida eres una cabrona que no se para de mover y eres amadapor todos rompe la con el nuevo buisness te amo bb",
  }
];

interface IProps {
  setFinished: () => void;
}

export function Letters({ setFinished }: IProps) {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (currentLetter >= content.length) {
      setFinished();
    }
  }, [currentLetter, setFinished]);

  if (currentLetter >= content.length) {
    return null;
  }

  return (
    <Letter
      author={content[currentLetter].author}
      content={content[currentLetter].content}
      isDisabled={isDisabled}
      onBeginAnimation={() => setIsDisabled(true)}
      nextLetter={() => {
        setTimeout(() => setIsDisabled(false), 5000);
        setCurrentLetter((currentLetter) => currentLetter + 1);
      }}
    />
  );
}
