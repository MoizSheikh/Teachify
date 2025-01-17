/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { classContext } from "./CreateClassContainer";
import axios from "axios";
import { url } from "url.js";
import { Button } from "@mui/material";
import { RiErrorWarningFill } from "react-icons/ri";

const Wizard5 = () => {
  const { setTab, classInfo, setClassInfo, setClassId, _isEdit } =
    useContext(classContext);
  const [imgs, setImg] = useState(classInfo.imgs);

  useEffect(() => {
    setClassInfo({ ...classInfo, imgs: imgs });
  }, [imgs]);

  async function uploadImg(e, ind) {
    let file = e.target.files[0];
    var formdata = new FormData();
    formdata.append("file", file);
    let res = await Singleupload(formdata);
    if (res.success) {
      console.log(res.url);
      const _img = imgs;
      _img[ind] = res.url;
      setImg([..._img]);
    } else {
    }
  }

  const Singleupload = async (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`,
    );

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
    };
    const response = await fetch("/teacher/upload", requestOptions);
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e) => {
    const _data = { ...classInfo };
    if (classInfo) {
      if (_isEdit) {
        axios({
          url: `/class/edit/${_data?._id}`,
          method: "PUT",
          data: _data,
          headers: {
            "content-type": "application/json",
          },
        }).then((res) => {
          if (res.data.success) {
            setTab(5);
            setClassId(res.data.data._id);
          } else {
            alert(res.data.message);
          }
        });
      } else {
        axios({
          url: `${url}/class/addclass`,
          method: "POST",
          data: _data,
          headers: {
            "content-type": "application/json",
          },
        }).then((res) => {
          if (res.data.success) {
            setTab(5);
            setClassId(res.data.item._id);
          } else {
            alert(res.data.message);
          }
        });
      }
    }
  };
  return (
    <div className="wizard5">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="Con1">
        <div className="heading">Build Your Gig</div>
        <div className="detail">
          Encourage Buyers To Choose Your Gig By Featuring A Variety Of Your
          Work.
        </div>
        <div className="note">
          <div className="detail">
            <RiErrorWarningFill className="icon" color="gray" />
            Note:{" "}
            <span>
              To Comply With Teachify Terms Of Service, Make Sure To Upload Only
              Content You Either Own Or You Have The Permission Or License To
              Use.
            </span>
          </div>
        </div>

        <div className="con">
          <div className="MainHeading">Gig Photo</div>
          <div className="detail">
            Get Noticed By The Right Buyers With Visual Examples Of Your
            Services.
          </div>
          <div className="ImgCon">
            <label htmlFor="image1">
              {imgs[0] ? (
                <img src={imgs[0]} alt="logo" className="upload-img" />
              ) : (
                <img
                  src={  "/photo.PNG"}
                  alt="logo"
                  className="upload-img"
                />
              )}
            </label>
            <input
              onChange={(e) => uploadImg(e, 0)}
              type="file"
              id="image1"
              accept=".png, .jpg, .jpeg"
              name="img"
              style={{ display: "none" }}
            />
            <label htmlFor="image2">
              {imgs[1] ? (
                <img src={imgs[1]} alt="logo" className="upload-img" />
              ) : (
                <img
                  src={  "/photo.PNG"}
                  alt="logo"
                  className="upload-img"
                />
              )}
            </label>
            <input
              onChange={(e) => uploadImg(e, 1)}
              type="file"
              id="image2"
              accept=".png, .jpg, .jpeg"
              name="img"
              style={{ display: "none" }}
            />
            <label htmlFor="image3">
              {imgs[2] ? (
                <img src={imgs[2]} alt="logo" className="upload-img" />
              ) : (
                <img
                  src={  "/photo.PNG"}
                  alt="logo"
                  className="upload-img"
                />
              )}
            </label>
            <input
              onChange={(e) => uploadImg(e, 2)}
              type="file"
              id="image3"
              accept=".png, .jpg, .jpeg"
              name="img"
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="BtnCon">
          <Button onClick={() => setTab(2)} className="cancelBtn">
            back
          </Button>
          <Button
            onClick={(e) => handleSubmit(e)}
            className="saveBtn"
            variant="contained"
            disabled={imgs.length < 1}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard5;
