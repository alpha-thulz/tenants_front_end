import {useEffect, useState} from "react";
import connect from "../utils/connect.ts";
import BasicTable from "../components/BasicTable.tsx";
import {useNavigate} from "react-router";
import Spinner from "../components/Spinner.tsx";

export default function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        connect("").get("/api/v1/users")
            .then((response) => {
                setData(response.data);
                if (response.status === 401) {
                    navigate("/login");
                } else {
                    setIsLoading(false);
                }
            }).catch((err) => console.log(err));
    });

    return (
        <div className="container">
            <div className="container-fluid">
                {isLoading ?
                    (<Spinner />) :
                    (
                        <BasicTable headings={["Name", "Username", "No. of buildings", "Active", "Role"]}>
                            {(data?.map((item: {id: string; firstname: string; lastname: string, username:string, role:string, building:[], enabled:boolean}) => (
                                <tr key={item.id}>
                                    <td>{`${item.firstname} ${item.lastname}`}</td>
                                    <td>{item.username}</td>
                                    <td>{`Owns ${item.building.length} buildings`}</td>
                                    <td>{item.enabled ? "Yes" : "No"}</td>
                                    <td>{item.role}</td>
                                </tr>
                            )))}
                        </BasicTable>
                    )
                }
            </div>
        </div>
    );
}