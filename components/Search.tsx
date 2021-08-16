import styles from '../styles/Search.module.scss';
import GlassIcon from '../assets/images/glass.svg';
import cn from "classnames";
import { Input } from './Input';
import { Button } from './Button';
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SearchProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleSearch = (e: any, btn?: boolean) => {
    if (e?.key == "Enter") {
      goToSearch();
    }
    if(btn) {
      e.preventDefault();
      goToSearch();
    }
  };

  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={(e) => handleSearch(e, true)}
        aria-label="Искать по сайту"
      >
        <ReactSVG src={GlassIcon.src} />
      </Button>
    </form>
  );
};
