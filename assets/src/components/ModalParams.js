import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {TextField} from "@mui/material";
import {useEffect} from "react";
import dataFetch from "../utils";
import {domainName} from "./Main";

export default function ModalParams(props) {
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [sort, setSort] = React.useState('activity');
    const [order, setOrder] = React.useState('asc');
    const [params, setParams] = React.useState({
        "page": page,
        "fromdate": Math.floor(Date.now()/1000),
        "todate": Math.floor(Date.now()/1000),
        "order": order,
        "sort": sort,
        "tagged": "python",
        "site": "stackoverflow"

    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSend=()=>{
        handleClose()
        dataFetch(`http://${process.env.HOST_NAME}/api/my_stack_exchange/`,
            {},
            params,
            'POST',
            (data) => {
                props.setData(data)
            }
            )
    }

    const handleChange = (event) => {
        let {name, value} = event.target;

        switch (name) {
            case 'page':
                setPage(value);
                break;
            case 'sort':
                setSort(value);
                break;
            case 'order':
                setOrder(value);
                break
            case 'fromdate':
                value = Date.parse(value) / 1000
                break
            case 'todate':
                value = Date.parse(value) / 1000
                break

        }

        setParams(prevState => ({

            ...prevState, [name]: value
        }))
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                FETCH DATA
            </Button>
            <Dialog

                params={params}
                page={page}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Params request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can set params from request.
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{mt: 2, minWidth: 120}}>
                            <InputLabel htmlFor="page">page</InputLabel>
                            <Select
                                autoFocus
                                value={page}
                                onChange={handleChange}
                                label="page"
                                inputProps={{
                                    name: 'page',
                                    id: 'page',
                                }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{mt: 2}}>
                            <TextField
                                name='fromdate'
                                id="fromdate"
                                label="From date"
                                type="datetime-local"
                                defaultValue="2022-05-24T10:30"
                                onChange={handleChange}
                                sx={{width: 250}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{mt: 2}}>
                            <TextField
                                id="todate"
                                name="todate"
                                label="To date"
                                type="datetime-local"
                                defaultValue="2022-05-24T10:30"
                                onChange={handleChange}
                                sx={{width: 250}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{mt: 2, minWidth: 120}}>
                            <InputLabel htmlFor="sort">sort</InputLabel>
                            <Select
                                autoFocus
                                value={sort}
                                onChange={handleChange}
                                label="sort"
                                inputProps={{
                                    name: 'sort',
                                    id: 'sort',
                                }}
                            >
                                <MenuItem value='activity'>activity</MenuItem>
                                <MenuItem value='creation'>creation</MenuItem>
                                <MenuItem value='votes'>votes</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl sx={{mt: 2, minWidth: 120}}>
                            <InputLabel htmlFor="order">order</InputLabel>
                            <Select
                                autoFocus
                                value={order}
                                onChange={handleChange}
                                label="order"
                                inputProps={{
                                    name: 'order',
                                    id: 'order',
                                }}
                            >
                                <MenuItem value='asc'>asc</MenuItem>
                                <MenuItem value='desc'>desc</MenuItem>


                            </Select>
                        </FormControl>
                        <FormControl sx={{mt: 2}}>
                            <TextField
                                name="tagged"
                                id="tagged"
                                label="Tagged"
                                type="text"
                                defaultValue="python"
                                onChange={handleChange}
                                sx={{width: 250}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSend}>Send</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
