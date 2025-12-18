import List from "../List";
import { Subtitle} from "../../Typography";

export default function TextBlock( { block }){
     return (
            <section key={block.id} className="my-6">
                <Subtitle>{block.title}</Subtitle>
                {block.list.map((poslist) => (
                    <List text={poslist.text} key={poslist.id} />
                ))}
            </section>
        );
}