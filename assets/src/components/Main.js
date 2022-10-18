import React, {useEffect} from 'react';
import {
    Box, Button, Container, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import dataFetch from "../utils";
import ModalParams from "./ModalParams";
export const domainName =  window.location.hostname;

export default function Main() {

    const [data, setData] = React.useState([])

    useEffect(() => {
        dataFetch(`http://${process.env.HOST_NAME}/api/my_stack_exchange/`,
            {},
            {},
            'GET',
            (data) => {
                setData(data)
            })
    }, [])


    return (
        <Container>
            <Box sx={{mb:'20px'}}>
                <ModalParams setData={setData}/>

                <Button
                    onClick={() => {
                        dataFetch(`http://${process.env.HOST_NAME}/api/my_stack_exchange/`,
                            {},
                            {},
                            'DELETE',
                            (data) => {
                                setData([])
                            })
                    }}
                >
                    Clear DB
                </Button>
                <Button
                    onClick={() => {
                        dataFetch(`${process.env.HOST_NAME}/api/my_stack_exchange/`,
                            {},
                            {},
                            'GET',
                            (data) => {
                                setData(data)
                            })
                    }}
                >
                    GET ALL DATA FROM DB
                </Button>
            </Box>
            <Box>

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Creation date</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">Answered</TableCell>
                                <TableCell
                                    align="right">Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data.map((item, index) => (
                                <TableRow
                                    key={item.index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.creation_date}
                                    </TableCell>
                                    <TableCell
                                        align="right">{item.title} </TableCell>
                                    <TableCell
                                        align="right">{item.author}</TableCell>
                                    <TableCell
                                        align="right">{item.answered ? 'Yes' : 'No'}</TableCell>
                                    <TableCell
                                        align="right">{item.link}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
}