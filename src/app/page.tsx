'use client'
import { Box, Button, Container, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Items, Order } from "../../lib/models/order";

// TODO: pull from DB or hardcode into file
const menuItems = ["Matcha (Cold)", "Matcha (Hot)", "Viet Coffee (Cold)", "Viet Coffee (Hot)"," Earl Gray Cupcake"]

export default function Ordering() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Items>({});
  const [total, setTotal] = useState<number>(0);

  const addItemToOrder = (item: string) => {
    const newQuantity = (items[item] || 0) + 1;
    setItems(prevItems => ({...prevItems, [item]: newQuantity}));
    setTotal(prevTotal => prevTotal + 2);
  }

  const submitOrder = async () => {
    const response = await fetch("/api/order");
    const data = await response.json();
    const orderNumber = data.orders.length + 1;

    const order: Order = {
      orderNumber: orderNumber,
      customerName: name,
      items: items,
      totalCost: total
    };
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({order: order})
    });
    router.push(`/tip?total=${total}`);
  }

  return (
    <Container>
      <Box>
        <Box>
          Customer Name
        </Box>
        <Box>
          <TextField onChange={(e) => {setName(e.target.value)}}/>
        </Box>
      </Box>
      <Box>
        <Box>
          Menu Items
        </Box>
        <Box>
          {menuItems.map((item, index) => (
            <Button key={index} onClick={() => addItemToOrder(item)}>
              {item}
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        {Object.entries(items).map(([item, quantity]) => (
          <Box key={item}>
            <Box>
              {item}
            </Box>
            <Box>
              {quantity}
            </Box>
            <Box>
              TODO: add increase/decrease quantities
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Box>
          Total
        </Box>
        <Box>
          {total}
        </Box>
      </Box>
      <Box>
        <Button onClick={() => submitOrder()}>Submit Order</Button>
      </Box>
    </Container>
  );
}
