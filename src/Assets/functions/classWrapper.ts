/** Joins CSS module values when an element needs multiple classes. */
function classes(...classNames: string[]): string {
    return classNames.filter(Boolean).join(' ');
}

export { classes };
