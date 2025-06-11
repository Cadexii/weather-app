import styles from "./container.module.css";

type Props = {
  children: React.ReactNode;
  isGrid?: boolean;
};

const Container: React.FC<Props> = ({ children, isGrid }) => {
  return (
    <div className={isGrid ? styles.grid : styles.container}>{children}</div>
  );
};

export default Container;
