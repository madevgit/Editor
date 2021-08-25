import { useEffect, useState } from "react";
import { media } from "../libs/media";
import { useLangContext } from "./translateContext";
const { fr, en } = media.Flags;
const Languages = {
  en: {
    lang: "English",
    flag: en,
  },
  fr: {
    lang: "Français",
    flag: fr,
  },
};

export default function Dropdown({ children }) {
  const { Lang, setLang } = useLangContext();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen((prev) => !prev);
  }, [Lang]);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 pb-0.5 border-b border-qosgray  min-w-max"
      >
        <img
          src={Languages[Lang].flag}
          className="h-4 inline-block"
          alt="flag"
        />
        <p className="inline-block mx-2 text-qosgray text-opacity-70 text-msm">
          {Languages[Lang].lang}
        </p>
        <span className="fi fi-rr-angle-small-down inline-block"></span>
      </button>
      <div
        className={`grid grid-flow-row shadow-lg origin-top transform transition-all duration-100 rounded-md p-2 bg-qosdark gap-y-2 mt-2 absolute ${
          open ? "scale-y-100" : " scale-y-0"
        }`}
      >
        <button
          onClick={() => setLang("en")}
          className="min-w-max bg-qosgray bg-opacity-10 rounded-lg p-2"
        >
          <img
            src={Languages["en"].flag}
            className="h-4 inline-block"
            alt="flag"
          />
          <p className="inline-block w-6/12 mx-2 text-qosgray text-opacity-70 text-msm">
            {Languages["en"].lang}
          </p>
        </button>
        <button
          onClick={() => setLang("fr")}
          className="min-w-max flex bg-qosgray bg-opacity-10 rounded-lg p-2"
        >
          <img
            src={Languages["fr"].flag}
            className="h-5 inline-block"
            alt="flag"
          />
          <p className="inline-block w-6/12 mx-2 text-qosgray text-opacity-70 text-msm">
            {Languages["fr"].lang}
          </p>
        </button>
      </div>
    </div>
  );
}
