import styles from '../styles/Button.module.scss';
import ArrowIcon from '../assets/images/arrow.svg';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { ReactSVG } from 'react-svg';

export interface ButtonProps extends
	Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
	children: ReactNode;
	appearance: 'primary' | 'ghost';
	arrow?: 'right' | 'down' | 'none';
    fullWidth?: boolean
}

console.log(ArrowIcon);

export const Button = ({ appearance, arrow = 'none', children, className, fullWidth, ...props }: ButtonProps): JSX.Element => {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
            style={fullWidth ? {width: '100px'} : {}}
			{...props}
		>
			{children}
			{arrow != 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}>
				<ReactSVG src={ArrowIcon.src} />
			</span>}
		</motion.button>
	);
};