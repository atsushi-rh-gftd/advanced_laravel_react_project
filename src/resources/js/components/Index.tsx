import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Form, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Show from './Show';
import axios from 'axios';
import '../../css/app.css';
import { useEffect, useState } from 'react';
import ReactPaginate from'react-paginate';
type Task = {
    email : string
    name : string
    message:[{
    id : number
    body : string
    user_id : number
    created_at : Date
    updated_at : Date
}]
}
type Page = {
    page : number
}

const Index  = () => {

    const url = "http://localhost/api/index";
    const [posts, setPost] = useState([]);
    const [state, setState] = useState(null);
    const [pages, setPages] = useState();


    const isEnabled = (isState) =>
    {
        const value = isState;
        setState(value);
        if(!value)
        {
            const value2 = "false";
        sessionStorage.setItem('key',value);
        }
        else{
            const value2 = "true";
            sessionStorage.setItem('key',value);
        }
        window.location.reload();
    }
    var Value;
    let json1;
    const getPage = async (val) => {
          await axios
          .get(url, { params: {page : val} })
          .then((res) => {
             setPost(res.data);
             //console.log(res.data);
          })
          .catch((error)=> {
            console.log(error);
          })
    }
    const getDataTest = (value)=>{
        axios.get('api/index?page=' + value).then(response => {
            setPost(response.data.data);
            console.log(response.data.data);
            console.log(posts);
        });
    }

    const getData = async() => {
        await axios
        .get(url)

        .then((response) => {



            //console.log(response.data.last_page);
            setPages(response.data.last_page);

            //console.log(response.data);
            //console.log(response.data.data);
            setPost(response.data.data);
            console.log(posts);

        })
        .catch((error) =>{
            console.log(error);
        });
    };

    useEffect (() => {
        getData();

    },[pages]);

    if(sessionStorage.getItem('key')==="true")
    {

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"><h1>掲示板風メモアプリ</h1></div>

                        <div className="card-body">メモをとろうぜ！！</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
        <div>

            {
            (function () {
                const list = [];
                for (let i = 1; i <= pages; i++) {
                  list.push(<span onClick={() => getDataTest(i)}><strong>   {i}   </strong></span>);
                }
                return <div>{list} </div>;
              }())
            }

        </div>
        <table className="table_css" border="1" width="80%">
                {
                <thead>
                <th >id </th>
                <th >User id</th>
                <th >Text</th>
                <th >create_at</th>
                <th> name</th>
                </thead>


                }
                <tbody>
                {


                    posts.map((item) => {
                        return (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.user_id}</td>
                                    <td>{item.body}</td>
                                    <td>{item.created_at}</td>
                                    <td>no name</td>
                                </tr>






                            </>
                        );


                    })







                }



               </tbody>


        </table>







           </>
    );}
    else{
    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"><h1>掲示板風メモアプリ</h1></div>

                        <div className="card-body">メモをとろうぜ！！</div>
                    </div>
                </div>
            </div>
        </div>








        </>

    );}
}

export default Index;

