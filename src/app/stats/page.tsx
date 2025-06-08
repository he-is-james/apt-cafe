'use client'
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Items, Order } from "../../../lib/models/order";

const menuItems = ["Matcha (Cold)", "Matcha (Hot)", "Coffee (Cold)", "Coffee (Hot)", "Earl Gray Cupcake", "Coconut Coffee (Cold)", "Cocunut Coffee (Hot)", "Blueberry Matcha (Cold)", "Blueberry Matcha (Hot)", "Banana Bread"];

export default function StatsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [itemStats, setItemStats] = useState<Items>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order");
      const data = await response.json();
      setOrders(data.orders);
      
      const stats: Items = {};
      data.orders.forEach((order: Order) => {
        Object.entries(order.items).forEach(([item, quantity]) => {
          stats[item] = (stats[item] || 0) + quantity;
        });
      });
      setItemStats(stats);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography variant="h4">Loading stats...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Order Statistics
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Item Popularity (High to Low)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(itemStats)
            .sort((a, b) => b[1] - a[1])
            .map(([item, quantity]) => (
              <Paper 
                key={item} 
                elevation={1} 
                sx={{ 
                  p: 2,
                  backgroundColor: '#f0f7ff',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{item}</Typography>
                  <Typography variant="h6">
                    {quantity} ordered
                  </Typography>
                </Box>
              </Paper>
            ))}
          
          {menuItems
            .filter(item => !itemStats[item])
            .map((item) => (
              <Paper 
                key={item} 
                elevation={1} 
                sx={{ 
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  opacity: 0.7
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">{item}</Typography>
                  <Typography variant="h6">
                    0 ordered
                  </Typography>
                </Box>
              </Paper>
            ))}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        All Orders ({orders.length})
      </Typography>
      
      <List>
        {orders.map((order, index) => (
          <Paper key={order.orderNumber} elevation={2} sx={{ mb: 2, overflow: 'hidden' }}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    Order #{order.orderNumber} - {order.customerName}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total: ${order.totalCost}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {Object.entries(order.items).map(([item, quantity]) => (
                        <Typography key={item} variant="body2">
                          - {item}: {quantity}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}
