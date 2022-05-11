import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Item } from "../../interfaces/Item";
import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/items", { method: "GET" });
  const items = await res.json();
  return {
    props: { items },
  };
}

export default function City({ items }) {
  const router = useRouter();
  const { city } = router.query;
  const cityItems: Item[] = [...items].filter((item) => item.location == city);

  const displayItems = () => {
    return cityItems.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.author}</td>
          <td>{item.quantity}</td>
          <td>
            <Link href={`/items/edit/${item.id}`}>
              <a>
                <button>Edit</button>
              </a>
            </Link>
            {"  "}
            <button>Remove</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Layout>
      <h2>Inventory from {city}</h2>
      <table
        style={{
          width: "60%",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <tbody>
          <tr>
            <th style={{ width: "40%" }}>Title</th>
            <th style={{ width: "40%" }}>Author</th>
            <th style={{ width: "10%" }}>Quantity</th>
            <th style={{ width: "20%" }}></th>
          </tr>
          {displayItems()}
        </tbody>
      </table>
    </Layout>
  );
}
