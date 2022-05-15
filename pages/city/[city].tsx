import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Item } from "../../interfaces/";
import Link from "next/link";
const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { city } = context.params;

  const res = await fetch(`${url}/api/items`, { method: "GET" });
  const items: Item = await res.json();

  return {
    props: { city, items },
  };
};

interface Props {
  items: Item[];
  city: string;
}

export default function City({ city, items }: Props) {
  const router = useRouter();
  const cityItems: Item[] = items.filter((item) => item.location == city);

  const handleDelete = (id: string) => {
    fetch(`${url}/api/items/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.status !== 200) throw Error("Problem with the server");
        router.push(`/city/${city}`);
      })
      .catch((err) => alert(err.message));
  };

  const displayItems = () => {
    return cityItems.map((item) => {
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
            <Link href={`/items/edit/${item.id}`}>
              <a>
                <button>Edit</button>
              </a>
            </Link>
            {"  "}
            <button onClick={(e) => handleDelete(item.id)}>Remove</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Layout>
      <h2>Inventory from {city.replace(/_/g, " ")}</h2>
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
