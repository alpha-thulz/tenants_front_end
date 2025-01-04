export default function Home() {

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
                // isLoading ?
                // <Spinner /> :
                // (
                    <div className="container-fluid">
                        <h1><center>Tenants Front End</center></h1>
                    </div>
                // )
            }
        </div>
    );
}