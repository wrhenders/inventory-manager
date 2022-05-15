import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Item } from "../../interfaces/";
import { useState, useEffect } from "react";
import { toCSV } from "../../components/toCSV";
const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const getServerSideProps: GetServerSideProps = async () => {
  const itemRes = await fetch(`${url}/api/items`, {
    method: "GET",
  });
  const items: Item = await itemRes.json();
  return {
    props: { items },
  };
};

interface Props {
  items: Item[];
}

export default function ListAll({ items }: Props) {
  const [sortType, setSortType] = useState("name");
  const [itemArray, setItemArray] = useState(items);
  const router = useRouter();

  useEffect(() => {
    setItemArray(
      itemArray.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1))
    );
  }, [sortType]);

  const addItems = () => {
    return itemArray.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <Link href={`/items/edit/${item.id}`}>
              <a>{item.name}</a>
            </Link>
          </td>
          <td>{item.author}</td>
          <td>{item.quantity}</td>
          <td>
            <Link href={`/city/${item.location}`}>
              <a>{item.location.replace(/_/g, " ")}</a>
            </Link>
          </td>
        </tr>
      );
    });
  };

  const handleClick = (type: string) => {
    setSortType(type);
    router.replace(router.asPath);
  };

  const handleDownloadClick = () => {
    const data = toCSV(itemArray);
    window.open(encodeURI(data));
  };

  return (
    <Layout>
      <h2>Total Inventory List</h2>

      <button
        style={{ marginLeft: "auto", width: "10%" }}
        onClick={(e) => handleDownloadClick()}
      >
        Download to CSV
      </button>
      <h4 style={{ textAlign: "center" }}>Use /\ to sort by data</h4>
      <table
        style={{
          width: "80%",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <tbody>
          <tr>
            <th style={{ width: "20%" }}>
              Title <a onClick={(e) => handleClick("name")}>/\</a>
            </th>
            <th style={{ width: "20%" }}>
              Author <a onClick={(e) => handleClick("author")}>/\</a>
            </th>
            <th style={{ width: "20%" }}>
              Quantity <a onClick={(e) => handleClick("quantity")}>/\</a>
            </th>
            <th style={{ width: "20%" }}>
              Location <a onClick={(e) => handleClick("location")}>/\</a>
            </th>
          </tr>
          {addItems()}
        </tbody>
      </table>
    </Layout>
  );
}
