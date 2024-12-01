import { Theme, ThemeContext } from '../lib/ThemeContext';
import { FC, ReactNode, useMemo, useState } from 'react';

const defaultTheme = localStorage.getItem('LOCAL_STORAGE_THEME_KEY') as Theme || Theme.LIGHT;

interface IThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	const defaultProps = useMemo(() => ({
		theme: theme,
		setTheme: setTheme,
	}), [theme]);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
