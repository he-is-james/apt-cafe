'use client'
import { Alert, Box, Button, Container, Modal, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Tipping() {
    const [open, setOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleClick = (digit: string) => {
      if (digit === "0" && input === ""){
        setAlertMessage("You cannot set tip to $0!")
        return;
      }
      setInput((prev) => {
        setAlertMessage("")
        const newInput = prev + digit;
        if (prev === "") {
            return "$" + newInput;
        }
        return newInput;
      });
    };

    const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const totalParam = searchParams.get('total');
        if (totalParam) {
            setTotal(parseFloat(totalParam));
        }
    }, [searchParams]);

    const returnToOrders = () => {
        router.push("/thanks")
    }

    return(
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight:"80vh",
                    fontSize: '3rem',
                }}
            >
                Pretty please?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                    }}
                >
                    <Box>
                        <Stack spacing={10} direction="row">
                            <Button
                                sx={{
                                    width: '300px',
                                    fontSize: '2rem',
                                    height: '120px',
                                }}
                                variant="contained"
                                onClick={() => returnToOrders()}
                            >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Typography variant="h3">22%</Typography>
                                    <Typography>${total*1.22}</Typography>
                                </Box>
                            </Button>
                            <Button
                                sx={{
                                    width: '300px',
                                    fontSize: '2rem',
                                    height: '120px',
                                }}
                                variant="contained"
                                onClick={() => returnToOrders()}
                            >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Typography variant="h3">20%</Typography>
                                    <Typography>${total*1.20}</Typography>
                                </Box>
                            </Button>
                            <Button
                                sx={{
                                    width: '300px',
                                    fontSize: '2rem',
                                    height: '120px',
                                }}
                                variant="contained"
                                onClick={() => returnToOrders()}
                            >
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Typography variant="h3">18%</Typography>
                                    <Typography>${total*1.18}</Typography>
                                </Box>
                            </Button>
                        </Stack>
                    </Box>
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    }} 
                >
                    <Button
                        sx={{
                        width: '1000px',
                        fontSize: '2rem',
                        height: '100px',
                        }}
                        variant="contained"
                        onClick={() => handleOpen()}
                    > 
                        Custom tip 
                    </Button>
                </Box>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                {alertMessage && (
                    <Alert
                        severity={"warning"}
                        sx={{ marginBottom: 2 }}
                    >
                        {alertMessage}
                    </Alert>
                )}
                <Box sx={{
                    outlineStyle: "groove",
                    margin: 2,
                    overflowX: "auto"
                }}>
                    <Typography variant="h4" mb={2} textAlign="center">
                        {input || "Enter tip amount..."}
                    </Typography>
                </Box>
                <Box
                    sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                    gridTemplateRows: "repeat(3, 1fr)",
                    }}
                >
                    {buttons.slice(0, 9).map((digit) => (
                    <Button
                        key={digit}
                        variant="contained"
                        onClick={() => handleClick(digit)}
                        sx={{
                        bgcolor:
                            digit === "0" && input === ""
                            ? "grey.400"
                            : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor:
                            digit === "0" && input === ""
                                ? "grey.500"
                                : "primary.dark",
                        },
                        fontSize: "1.5rem",
                        height: 60,
                        }}
                    >
                        {digit}
                    </Button>
                    ))}
                    <Button
                        key="0"
                        variant="contained"
                        onClick={() => handleClick("0")}
                        sx={{
                            bgcolor: input === "" ? "grey.400" : "primary.main",
                            color: "white",
                            gridColumn: "span 3", // This makes the "0" button span all 3 columns
                            "&:hover": {
                            bgcolor: input === "" ? "grey.500" : "primary.dark",
                            },
                            fontSize: "1.5rem",
                            height: 60,
                        }}
                        >
                        0
                        </Button>
                    </Box>

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button variant="outlined" onClick={() => setInput("")}>
                            Clear
                        </Button>
                        <Button variant="contained" color="success" onClick={() => {if (input != "") {returnToOrders();} else {setAlertMessage("You cannot continue without entering a tip!")}}}>
                            Done
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}