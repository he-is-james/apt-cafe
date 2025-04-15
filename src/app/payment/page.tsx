'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Container } from "@mui/material";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const getPayment = async () => {
      const response = await fetch("/api/payment");
      const data = await response.json();
      return data.payment;
    }
  
    getPayment().then((total) => {
      const paymentLink = `https://account.venmo.com/?txn=pay&audience=private&recipients=${process.env.VENMO_ACCOUNT}&amount=${total}&note=Apartment%20Cafe`;
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
