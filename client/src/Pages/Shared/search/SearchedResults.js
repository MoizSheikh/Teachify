import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import SearchCard from "./SearchCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import StudentNavbar from "Pages/Shared/Navs/LoggedInNavStudent";
import { useSelector } from "react-redux";

const itemPerPage = 9;

const SearchedResults = () => {
  const loginDetail = useSelector(({ user }) => user);
  const { searchVal } = useParams();
  const [allData, setAllData] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, SetPriceRange] = useState([0, 10000]);
  const [numOfPage, setNumOfPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("/class/getAll").then((data) => {
      setAllData(data.data.data);
      setSearchArr(data.data.data);
    });
  }, []);

  useEffect(() => {
    if (searchVal && allData) {
      const _data = allData.filter(
        (el) =>
          el?.title.toLowerCase().includes(searchVal.toLowerCase()) &&
          el?.is_active &&
          Number(el?.standard?.price) >= priceRange[0] &&
          Number(el?.standard?.price) <= priceRange[1],
      );

      setSearchArr(_data);
      setFilteredData(_data.slice(0, itemPerPage));
    }
  }, [searchVal, allData, priceRange]);

  useEffect(() => {
    if (searchArr.length > 0) {
      const _numOfPage = Math.ceil(searchArr.length / itemPerPage);

      setNumOfPage(_numOfPage);
    }
  }, [searchArr]);

  const handleChangePage = (_, _page) => {
    setPage(_page);
    const _firstIndex = _page * itemPerPage;
    const firstIndex = _firstIndex - itemPerPage;
    const lastIndex = _page * itemPerPage;
    const _slicedArr = searchArr.slice(firstIndex, lastIndex);
    setFilteredData(_slicedArr);
  };

  const handlePriceChange = (_, newValue) => {
    SetPriceRange(newValue);
  };

  return (
    <div style={{ width: "100%" }}>
      <StudentNavbar />
      <div className="searchResults">
        <div className="patch1"></div>
        <div className="patch2"></div>
        <div className="patch3"></div>
        <div className="sideBar">
          <div className="priceCon">
            <div className="label">Price Range</div>
            <div className="range">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                disableSwap
                // getAriaValueText={priceRange}
              />
              <div className="values">
                <div className="val">{priceRange[0]} Pkr</div>
                <div className="val">{priceRange[1]} Pkr</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContent">
          <div className="selectCon">
            <div className="items">{searchArr?.length} Results Found.</div>
          </div>
          <div className="resultsCards">
            {filteredData.length > 0 &&
              filteredData.map((el) => {
                return <SearchCard key={el._id} card={el} />;
              })}
          </div>
          <Stack spacing={4} className="pagination">
            <Pagination
              count={numOfPage}
              page={page}
              onChange={handleChangePage}
              hidePrevButton
              hideNextButton
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default SearchedResults;
