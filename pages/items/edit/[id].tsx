import Layout from "../../../components/Layout";
import { useState } from "react";
import { Item } from "../../../interfaces/Item";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/items/${id}`, {
    method: "GET",
  });
  const item = await res.json();
  return {
    props: { id, item },
  };
}

interface Props {
  item: Item;
  id: string;
}

export default function ItemDetail({ item, id }: Props) {
  const [name, setName] = useState(item.name);
  const [author, setAuthor] = useState(item.author);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [location, setLocation] = useState(item.location);

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid()) {
      alert("All entries must be filled and valid");
      return;
    }
    const data: Item = {
      name,
      author,
      description,
      quantity: parseInt(quantity),
      location,
    };
    console.log(data);
    fetch(`http://localhost:3000/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 200) throw Error("Problem with the server");
        router.push("/");
      })
      .catch((err) => alert(err.message));
  };

  const isValid = (): boolean => {
    return (
      name !== "" &&
      author !== "" &&
      description !== "" &&
      parseInt(quantity) !== NaN &&
      location !== ""
    );
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3000/api/items/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.status !== 200) throw Error("Problem with the server");
        router.push(`/`);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Layout>
      <h2>Edit Inventory Item</h2>
      <div style={{ margin: "auto" }}>
        <h3>{name}</h3>
        <h4>
          By: {author} <br />
          In Stock: {quantity}
        </h4>
        <p>
          Description:
          <br /> {description}
        </p>
        <button onClick={(e) => handleDelete(item.id)}>Remove</button>
      </div>
      <form style={{ width: "60%", margin: "auto" }} onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          placeholder="Author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Quantity:</label>
        <input
          type="text"
          placeholder="Quantity..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label>Location:</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Chicago">Chicago</option>
          <option value="New York City">New York City</option>
          <option value="Seattle">Seattle</option>
          <option value="Atlanta">Atlanta</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
