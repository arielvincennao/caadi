import { useAccessibility } from '../../accessibilityMode/useAccessibility';
import Section from "../Section";
import SectionVisual from "../SectionVisual";
import SectionAudio from "../SectionAudio";
import { transporteData } from "../../data/transporteData";



export default function Transporte() {
  const { mode } = useAccessibility();

  if(mode === "visual") return <SectionVisual data={transporteData}/>;
  else if(mode === "audio") return <SectionAudio data={transporteData}/>

  return <Section data={transporteData} />;
  
}
