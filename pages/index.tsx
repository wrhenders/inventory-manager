import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Item, City } from "../interfaces/";
import Weather from "../components/Weather";
import { Fragment } from "react";
const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const getServerSideProps: GetServerSideProps = async () => {
  const itemRes = await fetch(`${url}/api/items`, {
    method: "GET",
  });
  const items: Item[] = await itemRes.json();

  const cityRes = await fetch(`${url}/api/cities`, {
    method: "GET",
  });
  const cities: City[] = await cityRes.json();

  return {
    props: { items, cities },
  };
};

type Props = {
  items: Item[];
  cities: City[];
};

export default function Home({ items, cities }: Props) {
  const addItems = (city: string) => {
    const cityItems = items.filter((item) => item.location == city);
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
    return cities.map((city, idx) => {
      return (
        <Fragment key={idx}>
          <Link href={`/city/${city.name}`}>
            <a>
              <div className={styles.card}>
                <h2>{city.name.replace(/_/g, " ")}</h2>
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
