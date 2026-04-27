import axe from "axe-core";

export async function checkTest(container){
    const results = await axe.run(container, 
        {runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa"],
        },
    });

    if(results.violations.length > 0){
        console.log("Violaciones de accesibilidad:");
        results.violations.forEach((violation) => {
            console.log(`${violation.id}: ${violation.description}`);

            violation.nodes.forEach((node) => {
                console.log(`Elemento:  ${node.html}`);
            });
        });
    }
    return results;
}
