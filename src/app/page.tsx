'use client'
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

// TODO: pull from DB or hardcode into file
const menuItems = ["Matcha (Cold)", "Matcha (Hot)", "Viet Coffee (Cold)", "Viet Coffee (Hot)"," Earl Gray Cupcake"]


export default function Ordering() {
  const router = useRouter();

  const [order, setOrder] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addItemToOrder = (newItem: string) => {
    setOrder(prevItems => [...prevItems, newItem]);
    setTotal(prevTotal => prevTotal + 2);
  }

  const submitOrder = () => {
    router.push(`/tip?total=${total}`);
  }

  return (
    <Container>
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
        {order.map((item, index) => (
          <Box key={index}>
            {item}
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
        <Button>Clear Order</Button>
      </Box>
    </Container>
  );
}
