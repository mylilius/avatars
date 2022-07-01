interface ITheme {
    colors: {
        [key: string]: string
    };
    borderRadius: string;
    border: {
        [key: string]: string;
    }
}

export const Theme: ITheme = {
    colors: {
        primary: '#2E7DDE',
        secondary: '#D9CB9E',
        background: '#2A2C2B'
    },
    borderRadius: '16px',
    border: {
        defaultWidth: '0.5px',
        defaultColor: '#333'
    }
}

export const BorderRadius = () => `border-radius: ${Theme.borderRadius};`;
export const Border = (width: string = Theme.border.defaultWith, color: string = Theme.border.defaultColor) => `border: ${width} solid ${color}`;
export const Flex = (direction: string = 'row', align: string | undefined, justify: string | undefined, wrap?: string) => {
    let _str: string = `display: flex; flex-direction: ${direction};`;
    if (align) _str += `align-items: ${align};`;
    if (justify) _str += `justify-content: ${justify};`;
    if (wrap) _str += `flex-wrap: ${wrap}`;
    return _str;
}