import { createContext, PropsWithChildren, useState } from 'react';
import { TopLevelCategory, TopPageEntity } from '../generated/types';

export type MenuItem = {
    route: string;
    name: string;
    icon: JSX.Element;
    id: TopLevelCategory;
};

export type Menu = {
	[key in TopLevelCategory]?: TopPageEntity[]
  };

export interface IAppContext {
	menu: Menu
	firstСategories: TopLevelCategory[];
	setMenu?: (newMenu: Menu) => void;
}

export const AppContext = createContext<IAppContext>({ menu: {}, firstСategories: [TopLevelCategory.Courses] });

export const AppContextProvider = ({ menu, firstСategories, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<Menu>(menu);
	const setMenu = (newMenu: Menu) => {
		setMenuState(newMenu);
	};

	return <AppContext.Provider value={{ menu: menuState, firstСategories, setMenu }}>
		{children}
	</AppContext.Provider>;
};