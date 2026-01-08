'use client'

import SurveyCreatorWidget from "@/components/SurveyCreator"


export default function EditorPage(){

  if (typeof window !== "undefined") {
    return <SurveyCreatorWidget></SurveyCreatorWidget>
  }
  else {
    return <></>
  }
}