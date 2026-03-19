export const updateBlockData = (block, onChange, changes) => {
    onChange?.(block.id, {
        ...(block.data || {}),
        ...changes
    });
};