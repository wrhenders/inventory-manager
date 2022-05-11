import Layout from "../../../components/Layout";
import { Item } from "../../../interfaces/Item";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/items/${id}`, {
    method: "GET",
  });
  console.log(res);
  const item = await res.json();
  return {
    props: { item },
  };
}
interface Props {
  item: Item;
}

export default function ItemDetail({ item }: Props) {
  return (
    <Layout>
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
      <ul>
        <li>Quantity: {item.quantity}</li>
        <li>{item.location}</li>
      </ul>
    </Layout>
  );
}
