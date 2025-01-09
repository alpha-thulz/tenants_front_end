import {useNavigate, useParams} from "react-router";
import connect from "../utils/connect.ts";
import ListGroup from "../components/ListGroup.tsx";
import {useState} from "react";
import BasicTable from "../components/BasicTable.tsx";
import Button from "../components/Button.tsx";

export default function Building() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        id: "",
        address: "",
        name: "",
        room: []
    });

    connect("").get(`api/v1/property/building/${params.building_id}`)
        .then((result) => {
            if (result.status === 401) {
                navigate("/login");
            }
            setData(result.data)
        }).catch((error) => {
            console.log(error);
    });

    let serviceCost = 0.00;
    let rentIncome = 0.00;

    data?.room.map((item: {id:string, servicesCosts: number, totalRentalPrice:number}) => (
            serviceCost += item.servicesCosts,
            rentIncome += item.totalRentalPrice
    ))

    return (
        <>
            <ListGroup heading={`Details of ${data.name}`}>
                <li className="list-group-item">{data.address}</li>
                <li className="list-group-item">{`Can make up to R ${rentIncome} from all rooms`}</li>
                <li className="list-group-item">{`Total maintenance cost R ${serviceCost} from all rooms`}</li>
            </ListGroup>
            <hr/>
            <Button label={"Go Back"} onClick={() => navigate(`/${params.user_id}`)} color={"info"} />
            <Button label="Enlist new room" onClick={() => {console.log(`Enlist new room in building ${data.id}`)}} />
            <BasicTable headings={["Room", "Rental Price", "Maintenance Cost", "Under maintenance?", "Total tenants"]} >
                {data.room?.map((value: {id: string, roomNumber: string, totalRentalPrice:number, servicesCosts: number, totalTenants:number, tenant:[], underMaintenance:boolean}) => (
                    <tr key={value.id}>
                        <td>{value.roomNumber}</td>
                        <td>{value.totalRentalPrice}</td>
                        <td>{value.servicesCosts}</td>
                        <td>{value.underMaintenance ? "Yes" : "No"}</td>
                        <td>{`${value.tenant.length}/${value.totalTenants}`}</td>
                        <td><Button label="Remove room listing" onClick={() => (console.log(`Delete room ${value.id}`))} color={"danger"}/> </td>
                    </tr>
                ))}
            </BasicTable>
        </>
    );
}