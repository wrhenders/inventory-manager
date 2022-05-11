import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Item } from "../interfaces/Item";
import { Fragment } from "react";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/items", { method: "GET" });
  const items = await res.json();
  return {
    props: { items },
  };
}

export default function Home({ items }) {
  const itemList: Item[] = [...items];

  const cityArray = [
    "Chicago",
    "Seattle",
    "New York City",
    "Atlanta",
    "Los Angeles",
  ];

  const addItems = (city: string) => {
    const cityItems = itemList.filter((item) => item.location == city);
    return cityItems.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.author}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });
  };

  const listCities = () => {
    return cityArray.map((city, idx) => {
      return (
        <Fragment key={idx}>
          <Link href={`/city/${city}`}>
            <a>
              <h2 className={styles.card}>{city}</h2>
            </a>
          </Link>
          <table
            style={{
              width: "80%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <tbody>
              <tr>
                <th style={{ width: "20%" }}>Title</th>
                <th style={{ width: "20%" }}>Author</th>
                <th style={{ width: "20%" }}>Quantity</th>
              </tr>
              {addItems(city)}
            </tbody>
          </table>
        </Fragment>
      );
    });
  };

  return (
    <Layout>
      <h2>Inventory List</h2>
      {listCities()}
    </Layout>
  );
}
