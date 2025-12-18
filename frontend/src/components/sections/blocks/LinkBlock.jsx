import Button from "../../common/Button"

export default function LinkBlock({ block }){
    return (
            <Button className="main-button mb-5" href={block.href} key={block.id} icon={block.icon}>
                {block.name}
            </Button>
        )
}