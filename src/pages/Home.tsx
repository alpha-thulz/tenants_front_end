import {useEffect, useState} from "react";
import client from "../utils/connect.ts";
import Spinner from "../components/Spinner.tsx";
import BasicTable from "../components/BasicTable.tsx";
import Button from "../components/Button.tsx";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    // useEffect(() => {
    //    client("").get("/users/alpha-thulz/repos")
    //        .then((response) =>  {
    //            setIsLoading(false);
    //            setData(response.data);
    //        })
    //        .catch((err) => {
    //            setIsLoading(false);
    //            console.error(err);
    //        });
    // });

    return (
        <div className="container">
            {
                isLoading ?
                <Spinner /> :
                (
                    <div className="container-fluid">
                        <h1><center>Tenants Front End</center></h1>
                    </div>
                )
            }
        </div>
    );
}