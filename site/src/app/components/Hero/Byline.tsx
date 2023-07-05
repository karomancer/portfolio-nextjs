import React, { useEffect, useRef } from "react";

function shuffle(array: string[]) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyzαβΓΔδεζηθικΛλμνΞξΠπρΣσςτυΦφχΨψΩω";
const BYLINE_OPTIONS = shuffle([
  "creative coder",
  "senior frontend engineer",
  "freelance graphic designer",
  "aspiring installation artist",
  "web accessibility advocate",
  "user experience researcher",
  "amateur cosplayer",
  "energetic aikidoka",
  "video & board game geek",
  "funky saxophonista",
  "animation enthusiast",
  "swiss army knife",
  "gun for hire",
]);
BYLINE_OPTIONS.unshift("engineering & design consultant");
BYLINE_OPTIONS.push("are you still there?");

const Byline = () => {
  const bylineEl = useRef();
  const getRandomIndex = (len: Number) => Math.floor(Math.random() * len);
  const getRandomLetter = () => ALPHABET[getRandomIndex(ALPHABET.length)];

  const setByline = (newByline: string) => {
    if (bylineEl && bylineEl.current) {
      // @ts-ignore
      bylineEl.current.innerText = newByline;
    }
  };

  let timeout: NodeJS.Timeout;
  let bylineIndex = 0;
  let byline = BYLINE_OPTIONS[bylineIndex];

  const changeByline = () => {
    bylineIndex =
      bylineIndex + 1 == BYLINE_OPTIONS.length ? 0 : bylineIndex + 1;

    const bylineArray = byline.split("");
    const newByline = BYLINE_OPTIONS[bylineIndex];
    const newBylineArray = newByline.split("");

    if (newBylineArray.length > bylineArray.length) {
      let numNewItems = newBylineArray.length - bylineArray.length;
      while (numNewItems > 0) {
        bylineArray.push("");
        numNewItems--;

        if (numNewItems > 0) {
          bylineArray.unshift("");
          numNewItems--;
        }
      }
    }

    const length = bylineArray.length;

    byline = newByline;

    let indexTimeouts: NodeJS.Timeout[] = [];
    const scrambleIndex = (index: number, times: number) => {
      indexTimeouts.push(
        setTimeout(() => {
          if (times < 5) {
            bylineArray[index] =
              newBylineArray[index] !== " " ? getRandomLetter() : " ";
            setByline(bylineArray.join(""));
            scrambleIndex(index, ++times);
          } else {
            bylineArray[index] = newBylineArray[index];
            setByline(bylineArray.join(""));
          }
        }, 80)
      );
    };

    const indexArray = bylineArray.map((_, i) => i);

    let letterTimeouts: NodeJS.Timeout[] = [];
    const scrambleRandomLetters = (index: number, indices: number[]) => {
      letterTimeouts.push(
        setTimeout(() => {
          const indicesLeft = indices.length;
          const i = getRandomIndex(indicesLeft);

          if (indices.length > 0) {
            scrambleIndex(indices[i], 0);
            indices.splice(i, 1);
            scrambleRandomLetters(index, indices);
          } else {
            clearTimeout(timeout);
            clearTimeout(letterTimeouts.pop());
            if (letterTimeouts.length === 0) {
              indexTimeouts.forEach((t) => clearTimeout(t));
            }
            timeout = setTimeout(changeByline, 1500);
          }
        }, 300)
      );
    };

    scrambleRandomLetters(getRandomIndex(length), indexArray);
    scrambleRandomLetters(getRandomIndex(length), indexArray);
    scrambleRandomLetters(getRandomIndex(length), indexArray);
  };

  useEffect(() => {
    setTimeout(changeByline, 7000);
  });

  return (
    <h3 className="byline" ref={bylineEl}>
      {byline}
    </h3>
  );
};

export default Byline;
