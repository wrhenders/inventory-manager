import Layout from "../../components/Layout";
import { useState } from "react";
import { Item } from "../../interfaces/";
import { useRouter } from "next/router";
const url = process.env.NEXT_PUBLIC_SERVER_URL;

export default function NewItem() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("Chicago");

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
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

    fetch(`${url}/api/items/`, {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 200) throw Error("Incorrect inputs");
        router.push("/");
      })
      .catch((err) => alert(err.message));
  };

  const isValid = (): boolean => {
    return (
      name !== "" &&
      author !== "" &&
      description !== "" &&
      !isNaN(parseInt(quantity)) &&
      location !== ""
    );
  };

  return (
    <Layout>
      <h2>New Inventory Item</h2>
      <form style={{ width: "60%", margin: "auto" }} onSubmit={handleSubmit}>
        <label>Title: (Max char: 99)</label>
        <input
          id="name"
          type="text"
          placeholder="Title..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Author: (Max char: 99)</label>
        <input
          id="author"
          type="text"
          placeholder="Author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Description: (Max char: 500)</label>
        <input
          id="description"
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Quantity:</label>
        <input
          id="quantity"
          type="text"
          placeholder="Quantity..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label>Location:</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Chicago">Chicago</option>
          <option value="New_York_City">New York City</option>
          <option value="Seattle">Seattle</option>
          <option value="Atlanta">Atlanta</option>
          <option value="Los_Angeles">Los Angeles</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
