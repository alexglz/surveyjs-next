'use client'
import React, { useState } from "react";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { SurveyCreator } from "survey-creator-react";
import { ICreatorOptions } from "survey-creator-core";
import dynamic from "next/dynamic";

const SurveyCreatorComponent = dynamic(
  () => import("survey-creator-react").then(m => m.SurveyCreatorComponent),
  { ssr: false }
);

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true
};

export default function SurveyCreatorWidget(props: { json?: Object, options?: ICreatorOptions }) {
  let [creator, setCreator] = useState<SurveyCreator>();

  if (!creator) {
    creator = new SurveyCreator(props.options || defaultCreatorOptions);
    setCreator(creator);
  }

  return(
    <div style={{ height: "100vh", width: "100%" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  )
}


