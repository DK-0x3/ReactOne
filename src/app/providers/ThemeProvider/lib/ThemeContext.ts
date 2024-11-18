import { createContext } from "react";

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export interface IThemeContextProps {
    theme?: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({theme: Theme.LIGHT, setTheme: ()=>void {}});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
