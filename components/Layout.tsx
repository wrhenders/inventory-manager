import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inventory Manager</title>
        <meta name="description" content="Manage a multi-city inventory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href={"/"}>
            <a>Inventory Manager</a>
          </Link>
        </h1>
        <h3 style={{ textAlign: "right" }}>
          <Link href="/items/new">
            <a>New Item</a>
          </Link>
          <br />
          <Link href="/items/list">
            <a>All Items</a>
          </Link>
        </h3>
        {props.children}
      </main>
    </div>
  );
}
