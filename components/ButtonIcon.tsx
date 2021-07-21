import styles from '../styles/ButtonIcon.module.scss';
import cn from 'classnames';
import React from 'react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from '../assets/images/up.svg';
import close from '../assets/images/close.svg';
import menu from '../assets/images/menu.svg';
import { ReactSVG } from 'react-svg';

export const icons = {
	up,
	close,
	menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps): JSX.Element => {
	const IconComp = icons[icon];
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.white]: appearance == 'white',
			})}
			{...props}
		>
			<ReactSVG src={IconComp.src} />
		</button>
	);
};