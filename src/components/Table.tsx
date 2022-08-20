import React, { useState } from 'react';
import data from "../data.json";

type sortOrder = "asc" | "dsc";

type DATA = typeof data;

type column = keyof DATA[0];


function Table () {
    const headers = [
        {key: 'id', label: 'id_num'},
        {key: "first_name", label: "First Name"},
        {key: 'last_name', label: "Last Name"},
        {key: 'email', label: "Email"},
        {key: "ip", label: "IP Address"},
    ];


    //var option: String = "first_name";
    const [option, setOption] = useState("");

    const [Data, setData] = useState(data);
    const [order, sortOrder] = useState("asc");

    const [query, setQuery] = useState("");

    const [new_id, setID] = useState(0);
    const [new_first_name, setfirst] = useState("");
    const [new_last_name, setLast] = useState("");
    const [new_email, setEmail] = useState("");
    const [new_ip, setIP] = useState("");

    const[del_string, setDel] = useState("");

    const toSort = (col:column) => {
        console.log(order);
        if (order === "asc") {
            const sortedData = data.sort((a,b) => {
                return a[col] > b[col] ? 1: - 1;
            })
            setData(sortedData);
            sortOrder("dsc");
        }
        else {
            const sortedData = data.sort((a,b) => {
                return a[col] < b[col] ? 1: - 1;
            })
            setData(sortedData);
            sortOrder("asc");
        }
    }

    const toSearch = (col: column) => {
        if (col === "id") {
            const searchedData = data.filter((person) => {
                return person.first_name.toLowerCase().includes(query) || person.last_name.toLowerCase().includes(query) 
                || person.email.toLowerCase().includes(query) || person.ip_address.includes(query);
            });
            setData(searchedData);
        }
        else if (col === "first_name") {
            //console.log(query);
            const searchedData = data.filter((person) => person.first_name.toLowerCase().includes(query));
            setData(searchedData);
        }
        else if (col === "last_name") {
            const searchedData = data.filter((person) => person.last_name.toLowerCase().includes(query));
            setData(searchedData);
        }
        else if (col === "email") {
            const searchedData = data.filter((person) => person.email.toLowerCase().includes(query));
            setData(searchedData);
        }
        else if (col === "ip_address") {
            const searchedData = data.filter((person) => person.ip_address.includes(query));
            setData(searchedData);
        }
    }

    const addData = () => {
        //console.log("Hello");
        const toAdd = {
            id: new_id,
            first_name: new_first_name,
            last_name: new_last_name,
            email: new_email,
            ip_address: new_ip,
        };
        const newData = [...Data];
        newData.push(toAdd);
        setData(newData);
    }

    const delRow = () => {
        const newData = [...Data];
        const filterData = newData.filter((employee) => employee.first_name !== del_string);
        setData(filterData);
    }

    return (
        <div>
        <table>
            <td>
                <input
                className='search'
                onChange={(e) => {setQuery(e.target.value.toLowerCase())}}
                onKeyDown={(e) => {toSearch("id")}}
                placeholder = "Global Filtering"
                />
            </td>
            <td>
                <input
                className='search'
                //value = {query}
                onChange={(e) => {setQuery(e.target.value.toLowerCase())}} 
                onKeyDown={(e) => {toSearch("first_name")}}
                placeholder = "Search First Name"
                />
            </td>
            <td>
                <input
                className='search'
                //value = {query}
                onChange={(e) => {setQuery(e.target.value.toLowerCase())}} 
                onKeyDown={(e) => {toSearch("last_name")}}
                placeholder = "Search Last Name"
                />
            </td>
            <td>
                <input
                className='search'
                //value = {query}
                onChange={(e) => {setQuery(e.target.value.toLowerCase())}} 
                onKeyDown={(e) => {toSearch("email")}}
                placeholder = "Search Email"
                />
            </td>
            <td>
                <input
                className='search'
                //value = {query}
                onChange={(e) => {setQuery(e.target.value)}} 
                onKeyDown={(e) => {toSearch("ip_address")}}
                placeholder = "Search ip adress"
                />
            </td>
            <thead>
                {/* <tr>
                    {headers.map((row) => {
                        return (
                            <td onClick={()=>toSearch("last_name")}>
                                <input
                                className='search'
                                onChange={(e) => setQuery(e.target.value)}
                                />
                            </td>
                        );
                    }
                    )}
                </tr> */}
                <th onClick={()=>toSort("id")}>ID</th>
                <th onClick={()=>toSort("first_name")}>First Name</th>
                <th onClick={()=>toSort("last_name")}>Last Name</th>
                <th onClick={()=>toSort("email")}>Email</th>
                <th onClick={()=>toSort("ip_address")}>IP</th>
            </thead>
            <tbody>
                {/* {data.filter((person) => person.first_name.toString().toLowerCase().includes(query)).map((people) => {
                    return (
                        <tr key = {people.id}>
                            <td>{people.id}</td>
                            <td>{people.first_name}</td>
                            <td>{people.last_name}</td>
                            <td> {people.email}</td>
                            <td> {people.ip_address}</td>
                        </tr>
                    );
                })} */}
                {Data.map((people) => {
                    return (
                        <tr key = {people.id}>
                            <td>{people.id}</td>
                            <td>{people.first_name}</td>
                            <td>{people.last_name}</td>
                            <td> {people.email}</td>
                            <td> {people.ip_address}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <form onSubmit={addData}>
        <td>
            <input
            // type="text"
            // name="first"
            placeholder="Enter a ID..."
            onChange={(e) => {setID(e.target.valueAsNumber)}}
            />
        </td>
        <td>
            <input
            // type="text"
            // name="first"
            placeholder="Enter a first name..."
            onChange={(e) => {setfirst(e.target.value)}}
            />
        </td>
        <td>
            <input
            // type="text"
            // name="first"
            placeholder="Enter a last name..."
            onChange={(e) => {setLast(e.target.value)}}
            />
        </td>
        <td>
            <input
            // type="text"
            // name="first"
            placeholder="Enter a email..."
            onChange={(e) => {setEmail(e.target.value)}}
            />
        </td>
        <td>
            <input
            // type="text"
            // name="first"
            placeholder="Enter a IP Adress..."
            onChange={(e) => {setIP(e.target.value)}}
            />
        </td>
        <td>
            <button 
            type="submit"
            //onClick={(e) => {addData()}}
            >
            Add
            </button>
        </td>
    </form>
    <form onSubmit={delRow}>
        <td>
        <input
            onChange = {(e) => setDel(e.target.value)}
            placeholder = "Enter del string"
        />
        </td>
        <td>
            <button 
            type="submit"
            >
            Delete
            </button>
        </td>
    </form>
    </div>
    );
}

export default Table;
