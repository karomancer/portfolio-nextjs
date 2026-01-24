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

// Pure helper functions - defined outside component to avoid recreation
const getRandomIndex = (len: number) => Math.floor(Math.random() * len);
const getRandomLetter = () => ALPHABET[getRandomIndex(ALPHABET.length)];

interface BylineProps {
  className?: string;
}


const Byline = ({className}: BylineProps) => {
  const bylineEl = useRef<HTMLHeadingElement>(null);
  const bylineIndexRef = useRef(0);
  const bylineRef = useRef(BYLINE_OPTIONS[0]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const setByline = (newByline: string) => {
    if (bylineEl.current) {
      bylineEl.current.innerText = newByline;
    }
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const t = setTimeout(callback, delay);
    timeoutsRef.current.push(t);
    return t;
  };

  useEffect(() => {
    const changeByline = () => {
      bylineIndexRef.current =
        bylineIndexRef.current + 1 === BYLINE_OPTIONS.length ? 0 : bylineIndexRef.current + 1;

      const bylineArray = bylineRef.current.split("");
      const newByline = BYLINE_OPTIONS[bylineIndexRef.current];
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
      bylineRef.current = newByline;

      const scrambleIndex = (index: number, times: number) => {
        addTimeout(() => {
          if (times < 5) {
            bylineArray[index] =
              newBylineArray[index] !== " " ? getRandomLetter() : " ";
            setByline(bylineArray.join(""));
            scrambleIndex(index, ++times);
          } else {
            bylineArray[index] = newBylineArray[index];
            setByline(bylineArray.join(""));
          }
        }, 80);
      };

      const indexArray = bylineArray.map((_, i) => i);
      let completedStreams = 0;

      const scrambleRandomLetters = (indices: number[]) => {
        addTimeout(() => {
          if (indices.length > 0) {
            const i = getRandomIndex(indices.length);
            scrambleIndex(indices[i], 0);
            indices.splice(i, 1);
            scrambleRandomLetters(indices);
          } else {
            completedStreams++;
            // Only schedule next change when all 3 streams complete
            if (completedStreams === 3) {
              addTimeout(changeByline, 1500);
            }
          }
        }, 300);
      };

      // Start 3 parallel scramble streams with copies of the index array
      scrambleRandomLetters([...indexArray]);
      scrambleRandomLetters([...indexArray]);
      scrambleRandomLetters([...indexArray]);
    };

    // Initial delay before first change
    addTimeout(changeByline, 7000);

    // Cleanup all timeouts on unmount
    return () => {
      clearAllTimeouts();
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <h3 className={className} ref={bylineEl}>
      {BYLINE_OPTIONS[0]}
    </h3>
  );
};

export default Byline;
