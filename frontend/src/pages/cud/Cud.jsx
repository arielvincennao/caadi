import { useAccessibility } from '../../accessibilityMode/useAccessibility';
import Section from "../Section";
import SectionVisual from "../SectionVisual";
import SectionAudio from "../SectionAudio";
import { cudData } from "../../data/cudData";



export default function Cud() {
  const { mode } = useAccessibility();

  if(mode === "visual") return <SectionVisual data={cudData}/>;
  else if(mode === "audio") return <SectionAudio data={cudData}/>

  return <Section data={cudData} />;
  
}
