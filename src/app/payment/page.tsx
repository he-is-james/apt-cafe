'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Container } from "@mui/material";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await fetch("/api/payment");
      const data = await response.json();
      return data.order;
    }
  
    getOrderDetails().then((order) => {
      const itemString = Object.entries(order.items)
        .map(([key, value]) => `${key.replace(" ", "")}:${value}`)
        .join('\n');

      const orderNote = encodeURI(`Apt440\n${itemString}`);
      const paymentLink = `https://account.venmo.com/?txn=pay&audience=private&recipients=he_is_james&amount=${order.totalCost}&note=${orderNote}`;
      router.push(paymentLink);
    })
  });
  // TODO: make this larger so that it's more obvious
  return (
    <Container>

        <CircularProgress />
    </Container>
  );
}
