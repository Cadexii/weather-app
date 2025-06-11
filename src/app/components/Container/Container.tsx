import styles from "./container.module.css";

type Props = {
  children: React.ReactNode;
  title?: string;
  isGrid?: boolean;
};

const Container: React.FC<Props> = ({ children, title, isGrid }) => {
  return (
    <div className={styles.container}>
      {title && <h1>{title}</h1>}
      <div className={isGrid ? styles.grid : styles.content}>{children}</div>
    </div>
  );
};

export default Container;
