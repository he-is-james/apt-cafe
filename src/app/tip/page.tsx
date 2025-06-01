'use client'
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tipping() {
    const [total, setTotal] = useState<number>(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    const returnToOrders = () => {
        router.push("/")
    }

    useEffect(() => {
        const totalParam = searchParams.get('total');
        if (totalParam) {
            setTotal(parseFloat(totalParam));
        }
    }, [searchParams]);

    return(
        <Container>
            <Box sx={{ marginY: 2 }}>
                <Typography variant="h4">Tipping Screen</Typography>
            </Box>
            <Box sx={{ marginY: 2 }}>
                <Typography variant="h5">Order Total: ${total}</Typography>
            </Box>
            <Box>
                <Button variant="contained" onClick={() => returnToOrders()}>Pay</Button>
            </Box>
        </Container>
    )
}