'use client'
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress, Container } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const total = searchParams.get("total");

  useEffect(() => {
    const paymentLink = `https://account.venmo.com/?txn=pay&audience=private&recipients=he_is_james&amount=${total}&note=Apartment%20Cafe`;
    router.push(paymentLink);
  })

  return (
    <Container>
        <CircularProgress />
    </Container>
  );
}
