type ClassNames = string | null | undefined | false;
export const cx = (...classNames: ClassNames[]) => classNames.filter(value => !!value).join(' ');
