import { useAccessibility } from "../../accessibilityMode/useAccessibility";
import Section from "../Section";
import SectionAudio from "../SectionAudio";
import SectionVisual from "../SectionVisual";
import { cnrtData } from "../../data/CNRTdata";

export default function Cud() {
  const { mode } = useAccessibility();
  
  if(mode === "visual") return <SectionVisual data={cnrtData}/>;
  else if(mode === "audio") return <SectionAudio data={cnrtData}/>

  return <Section data={cnrtData} />;
}
