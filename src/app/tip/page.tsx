'use client'
import { Box, Button, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

// This is where tipping will be taken in

export default function Tipping() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const total = searchParams.get("total");

    const submitToPayment = () => {
        router.push(`/payment?total=${total}`)
    }

    return(
        <Container>
            <Box>
                Tipping Screen
            </Box>
            <Box>
                {total}
            </Box>
            <Box>
                <Button onClick={() => submitToPayment()}>Pay</Button>
            </Box>
        </Container>
    )
}