'use client'
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Items, Order } from "../../lib/models/order";

// TODO: pull from DB or hardcode into file
const menuItems = ["Matcha (Cold)", "Matcha (Hot)", "Coffee (Cold)", "Coffee (Hot)"," Earl Gray Cupcake", "Coconut Coffee (Cold)", "Cocunut Coffee (Hot)", "Blueberry Matcha (Cold)", "Blueberry Matcha (Hot)", "Banana Bread"];

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
    <Container sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box>
        <Typography variant="h3">
          Create an order
        </Typography>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "2"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography variant="h5">
            Menu Items
          </Typography>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(5, auto)",
            gap: "10px",
            flex: "2"
          }}>
            {menuItems.map((item, index) => (
              <Button key={index} onClick={() => addItemToOrder(item)} sx={{
                backgroundColor: "lightblue",
                padding: "10px",
                textAlign: "center"
              }}>
                {item}
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>
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
          <Box>
            <Typography>Total: ${total}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography variant="h5">Customer Name</Typography>
          <Box>
            <TextField onChange={(e) => {setName(e.target.value)}}/>
          </Box>
        </Box>
        <Box>
          <Button onClick={() => submitOrder()}>Submit Order</Button>
        </Box>
      </Box>
    </Container>
  );
}
