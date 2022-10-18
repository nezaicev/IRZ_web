import * as React from 'react';
import axios from "axios";

const dataFetch = (url, params, body, httpMethod, callback) => {

    let data = []
    let status=null
    if (!url) return;
    axios({
        method: httpMethod,
        url: url,
        params: params,
        data:body,
    })
        .then((res) => {
            data = res.data
            status='ok'
            return data
        }).then((data)=>{callback(data)})
        .catch((e) => {
            console.log(e);
        });
        return status
}
export default dataFetch