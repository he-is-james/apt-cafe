'use client'
import { Box, Button, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

// This is where tipping will be taken in

export default function Tipping() {
    // TODO: add Ghislaine's code here
    const router = useRouter();
    const searchParams = useSearchParams();
    const total = searchParams.get("total");

    const returnToOrders = () => {
        router.push("/")
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
                <Button onClick={() => returnToOrders()}>Pay</Button>
            </Box>
        </Container>
    )
}