import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Item } from "../interfaces/Item";
import Weather from "../components/Weather";
import { Fragment } from "react";

export async function getServerSideProps() {
  const itemRes = await fetch("http://localhost:3000/api/items", {
    method: "GET",
  });
  const items = await itemRes.json();

  const cityRes = await fetch("http://localhost:3000/api/cities", {
    method: "GET",
  });
  const cities = await cityRes.json();

  return {
    props: { items, cities },
  };
}

export default function Home({ items, cities }) {
  const itemList: Item[] = items;
  const cityArray = cities;

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
          <Link href={`/city/${city.name}`}>
            <a>
              <div className={styles.card}>
                <h2>{city.name}</h2>
                <div style={{ marginLeft: "auto" }}>
                  <Weather lat={city.lat} lon={city.lon} />
                </div>
              </div>
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
              {addItems(city.name)}
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
