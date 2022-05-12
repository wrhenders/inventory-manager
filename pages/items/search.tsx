import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Item } from "../../interfaces/Item";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const itemRes = await fetch("http://localhost:3000/api/items", {
    method: "GET",
  });
  const items = await itemRes.json();
  return {
    props: { items },
  };
}

interface Props {
  items: Item[];
}

export default function Search({ items }: Props) {
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
              <a>{item.location}</a>
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

  return (
    <Layout>
      <h2>Total Inventory List</h2>
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
