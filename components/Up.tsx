import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useVerticalScroll } from '../hooks/useVerticalScroll';
import { ButtonIcon } from './ButtonIcon';
import styles from '../styles/Up.module.scss';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useVerticalScroll();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<motion.div
			className={styles.up}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<ButtonIcon appearance='primary' icon='up' aria-label="Наверх" onClick={scrollToTop} />
		</motion.div>
	);
};