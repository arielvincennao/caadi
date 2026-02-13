import List from "../List";
import { Subtitle } from "../../Typography";

export default function ListBlock( { block }){ 
return (
            <section key={block.id} className="">
                <Subtitle>{block.title}</Subtitle>
                <ul className="list-disc space-y-2 mt-2">
                    {block.list.map((list) => (
                        <List item={list} key={list.id} />
                    ))
                    }
                </ul>
            </section>
        );
}