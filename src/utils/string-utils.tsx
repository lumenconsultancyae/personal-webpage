function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function toSpacedString(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export {capitalize, toSpacedString}