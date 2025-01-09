import {useEffect, useState} from "react";
import connect from "../utils/connect.ts";
import BasicTable from "../components/BasicTable.tsx";
import {useNavigate, useParams} from "react-router";
import Spinner from "../components/Spinner.tsx";
import Button from "../components/Button.tsx";

export default function Home() {
    const [data, setData] = useState({
        building: []
    });
    const [isLoading, setIsLoading] = useState(true);
    // const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        connect("").get(`/api/v1/users/${param.id}`)
            .then((response) => {
                setData(response.data);
                // const isAuth = response.config.headers.Authorization;
                if (response.status === 401) {
                    navigate("/login");
                }
                setIsLoading(false);
            }).catch((err) => console.log(err));
    });

    return (
        <div className="container">
            <div className="container-fluid">
                {isLoading ?
                    (<Spinner/>) :
                    (
                        <>
                            <BasicTable headings={["Name", "Address", "Maintain"]}>
                                {data.building.map((item: { id: string, name: string, address: string, room: [] }) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td><Button label={"Maintain"}
                                                    onClick={() => navigate(`/user/${param.id}/building/${item.id}`)}/>
                                        </td>
                                    </tr>
                                ))}
                            </BasicTable>
                        </>
                    )
                }
            </div>
        </div>
    );
}