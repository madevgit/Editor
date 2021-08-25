import React, { useContext, useState } from "react";
import { useEffect } from "react";

let LangContext = React.createContext();
const SupportedLanguages = ["en", "fr"];

export default function LangsProvider({ children }) {
  const userLanguage = navigator.language.split("-")[0];
  const [Lang, setLang] = useState("en");

  useEffect(() => {});

  return (
    <LangContext.Provider value={{ Lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLangContext() {
  return useContext(LangContext);
}
