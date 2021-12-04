import React from "react";
import { LOCALES } from "../i18n/locales";

export const I18nSelect = ({language}) => {
  return (
    
    <div>
      <button onClick={() => language(LOCALES.SPANISH)}>Español</button>
      <button onClick={() => language(LOCALES.ENGLISH)}>English</button>
    </div>
  );
};
