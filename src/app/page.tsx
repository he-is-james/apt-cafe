'use client'
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Items, Order } from "../../lib/models/order";

const drinks = ["Matcha", "Blueberry Matcha", "Egg Coffee"];
const food = ["Banana Bread", "Focaccia", "Early Grey Cupcakes"];
const menuItems = drinks.concat(food);

export default function Ordering() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Items>({});
  const [combo, setCombo] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const addItemToOrder = (item: string) => {
    const newQuantity = (items[item] || 0) + 1;
    setItems(prevItems => ({...prevItems, [item]: newQuantity}));
    if (food.includes(item)) {
      setCombo(prevCombo => prevCombo + 1);
      if (combo % 3 != 0) {
        return;
      }
    }
    setTotal(prevTotal => prevTotal + 2);
  }

  const increaseQuantity = (item: string) => {
    setItems(prevItems => ({
      ...prevItems,
      [item]: prevItems[item] + 1
    }));
    if (food.includes(item)) {
      setCombo(prevCombo => prevCombo + 1);
      if (combo % 3 != 0) {
        return;
      }
    }
    setTotal(prevTotal => prevTotal + 2);
  };

  const decreaseQuantity = (item: string) => {
    setItems(prevItems => {
      if (prevItems[item] == 1) {
        const newItems = { ...prevItems };
        delete newItems[item];
        return newItems;
      } else {
        return {
          ...prevItems,
          [item]: prevItems[item] - 1
        }
      }
    });
    if (food.includes(item)) {
      setCombo(prevCombo => prevCombo - 1);
      if ((combo - 1) % 3 != 0) {
        return;
      }
    }
    setTotal(prevTotal => prevTotal - 2);
  };

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
      flexDirection: "column",
      height: "100vh",
      padding: "20px"
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
        gap: "2",
        height: "100%",
        width: "100%"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "60%"
        }}>
          <Typography variant="h5">
            Menu Items
          </Typography>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(3, auto)",
            gap: "10px",
            flex: "2",
            padding: "10px"
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
          flexDirection: "column",
          height: "100%",
          width: "40%",
          padding: "10px"
        }}>
          <Box>
            <Typography variant="h5">
              Order Items
            </Typography>
          </Box>
          <Box sx={{
              flex: "1",
              height: "95%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
              outlineStyle: "groove"
            }}>
              {Object.entries(items).map(([item, quantity]) => (
                <Box key={item} sx={{
                  outlineStyle: "groove",
                  display: "flex"
                }}>
                  <Box sx={{
                    width: "60%",
                    padding: "10px"
                  }}>
                    <Typography variant="h6">
                     {item}
                    </Typography>
                  </Box>
                  <Box sx={{
                    display: "flex",
                    width: "40%",
                    padding: "10px",
                    gap: "2px",
                    alignItems: "center"
                  }}>
                    <Button variant="outlined" onClick={() => increaseQuantity(item)} sx={{ backgroundColor: "lightcyan", margin: "2px" }}>+</Button>
                    <Typography variant="h6">{quantity}</Typography>
                    <Button variant="outlined" onClick={() => decreaseQuantity(item)} sx={{ backgroundColor: "lightcyan", margin: "2px" }}>-</Button>
                  </Box>
                </Box>
              ))}
          </Box>
          <Box sx={{
            justifyContent: "center",
            height: "5%",
            display: "flex",
            flexShrink: "0",
            gap: "10px"
          }}>
            <Typography variant="h5">Total: ${total}</Typography>
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
