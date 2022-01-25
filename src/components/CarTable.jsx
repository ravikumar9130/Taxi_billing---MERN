import axios from "axios";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTable, useSortBy, usePagination } from "react-table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import authHeader from "../assets/header/auth-header";

const CarTable = () => {
  let Location = useLocation();
  const data = Location.state;
  const [Data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/auth/cars-data/${data.id}`, { headers: authHeader() }
    );
    if (res) {
      const data = res.data.all;
      setData(data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableData = useMemo(() => [...Data], [Data]);

  const tableColumns = useMemo(
    () =>
      Data[0]
        ? Object.keys(Data[0])
            .filter((key) => key !== "created_at" && key !== "updated_at" && key !== "car_id")
            .map((key) => {
              return {
                Header: key.charAt(0).toUpperCase() + key.slice(1),
                accessor: key,
                maxWidth: 10,
                Cell: (props) => {
                  if (props.value) {
                    return props.value;
                  } else {
                    return <span>--</span>;
                  }
                },
              };
            })
        : [],
    [Data]
  );
  const sno = {
    Header: 'S.No',
    Accessor: 'Sno',
    Cell: ({ row }) => {
      return row.index+1;
    },
  }
  tableColumns.unshift(sno);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  function exportpdf(datas) {
    console.log("Saving report as pdf");
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(20);
    const title = "TRIP DETAILS - " + datas;
    const headers = [
      [
        "SNO",
        "DATE",
        "TIME",
        "CUSTOMER NAME",
        "MOBILE",
        "TRIP_TYPE",
        "TRIP_FROM",
        "TRIP_TO",
        "DISTANCE",
        "TOTAL",
        "W_CHARGE",
        "DRIVER_BATA",
      ],
    ];
    console.log(Data);
    const data = Data.map((row,i) => [
      i+1,
      row.date,
      row.time,
      row.cus_name,
      row.mobile,
      row.trip_type,
      row.trip_from ? row.trip_from : '--',
      row.trip_to ? row.trip_to : '--',
      row.distance ? row.distance : '--',
      row.total,
      row.w_charge ? row.w_charge : '--',
      row.driver_batta ? row.driver_batta : '--',
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  }

  return (
    <div className="flex-grow-1">
      <h3 className="text-center mt-3">Trip Details - { data.car_no }</h3>
      <hr></hr>
      <table className="table table-striped m-auto" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="text-center" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-3 "
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="text-center" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-3 mx-3 text-center">
        <button className="btn btn-primary me-2" onClick={()=> exportpdf(data.car_no)}>
          export as pdf
        </button>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <hr></hr>
    </div>
  );
};
export default CarTable;
