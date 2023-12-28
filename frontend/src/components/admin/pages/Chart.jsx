import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { BACKEND_URL } from "../../../config.jsX";
import SquareShimmer from "../../SquareShimmer";
import { PieChart } from "../../seller/PieChart";

const Chart=()=>{
    const [isLoading,setIsloading]=useState(false);
   const  [err,setErr]=useState(false);
    const [products,setProducts]=useState([]);
    console.log(products)
    
    useEffect(()=>{
        setIsloading(true);
        setErr(false);
        fetch(BACKEND_URL + `/admin/chart`,{
            method:'get',
            credentials:'include'
        }).then(res=>{
            if(res.status==200){
                return res.json();
            }
        })
        .then(data=>{
            setProducts(data);
        }).catch(err=>{
            console.log(err);
            setErr(true);
        })
        .finally(()=>{
            setIsloading(false);
        })
    },[])

 

    const columns = [
      {
        title: 'Product Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Category 1',
            value: 'Category 1',
            children: [
              {
                text: 'Yellow',
                value: 'Yellow',
              },
              {
                text: 'Pink',
                value: 'Pink',
              },
            ],
          },
          {
            text: 'Category 2',
            value: 'Category 2',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.includes(value),
        width: '30%',
      },
      {
        title:'Quantity',
        dataIndex:'quantity'
      },
     {
        title:'Cancelled Counts',
        dataIndex: 'cancelled_counts',

     },
     {
        title:"Delivered Counts",
        dataIndex:'delivered_counts'
     },
     {
        title:'Placed Counts',
        dataIndex:'placed_counts'
     },
     {
        title:'Returned Counts',
        dataIndex:'returned_counts'
     }
    ];
    // const data = [
    //   {
    //     key: '1',
    //     name: 'John Brown',
    //     age: 32,
    //     address: 'New York No. 1 Lake Park',
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     address: 'London No. 1 Lake Park',
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sydney No. 1 Lake Park',
    //   },
    //   {
    //     key: '4',
    //     name: 'Jim Red',
    //     age: 32,
    //     address: 'London No. 2 Lake Park',
    //   },
    // ];
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

    if(err){
        return <div className="">Something went wrong</div>
    }
    return !isLoading? (
        <>
        {/* <PieChart/> */}
        <Table columns={columns} dataSource={products} onChange={onChange} />
        </>
    )
    :(
        <SquareShimmer />
    )
}
export default Chart;