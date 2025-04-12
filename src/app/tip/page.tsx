'use client'
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// This is where tipping will be taken in

export default function Tipping() {
    const [total, setTotal] = useState<number>(0);

    // TODO: add Ghislaine's code here
    const router = useRouter();

    const returnToOrders = () => {
        router.push("/")
    }

    useEffect(() => {
        const getPayment = async () => {
          const response = await fetch("/api/payment");
          const data = await response.json();
          return data.payment;
        }
      
        getPayment().then((payment) => {
            setTotal(payment);
        })
      });

    return(
        <Container>
            <Box>
                Tipping Screen
            </Box>
            <Box>
                {total}
            </Box>
            <Box>
                <Button onClick={() => returnToOrders()}>Pay</Button>
            </Box>
        </Container>
    )
}