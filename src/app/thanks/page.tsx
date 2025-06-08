'use client'

import { Button, Container, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Order } from "../../../lib/models/order";

export default function Thanks() {
    const [order, setOrder] = useState<Order>();

    const router = useRouter();

    useEffect(() => {
        const getOrderDetails = async () => {
            const response = await fetch("/api/payment");
            const data = await response.json();
            return data.order;
        }

        getOrderDetails().then((order) => {
            setOrder(order);
        })
    }, [])
    return(
        <Container sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
        }}>
            <CheckCircleOutlineIcon sx={{ 
                fontSize: 80, color: "success.main", mb: 2 
            }}/>
            <Typography variant="h5" mb={1}>
                Thank you for ordering {order?.customerName}!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
                Please tap to the pay
            </Typography>

            <Button variant="contained" color="success" onClick={() => {router.push("/")}}>
                Waiting
            </Button>
        </Container>
    )
}