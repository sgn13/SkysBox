import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const ImageContainer = (props) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [del, setDel] = useState("");
  const showModal = (e) => {
    console.log(e.target.alt, "asas");
    setImg(e.target.src);
    setDel(e.target.alt);
    setIsModalVisible(true);
  };
  const handleCancel = (e) => {
    console.log(e.target);
    setIsModalVisible(false);
  };
  const getImages = async () => {
    try {
      console.log(props);
      const res = await axios.get(
        `http://localhost:5000/api/img/${props.match.params.id}`
      );
      if (!res.data.f) {
        setFallback(res.data.msg);
        return;
      } else {
        setImages(res.data.f);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getImages();
  }, []);

  const handleDelete = (e) => {
    console.log(e.target.value);
    console.log(images);
    {
      if (window.confirm("Are you sure you wish to delete this item?"))
        axios.delete(`/api/img/${del}`).then((res) => {
          window.location.reload();
          console.log(res);
          console.log(res.data);
        });
    }
  };

  const configureImage = (image) => {
    return "http://localhost:5000/" + image;
  };
  console.log(images);
  return (
    <div
      className="savedImage container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {images.length > 0 ? (
        images.map((image, i) => (
          <div>
            <img
              src={configureImage(image)}
              key={images}
              alt={image}
              width="30%"
              className="image"
              style={{ margin: "10px 0" }}
              onClick={showModal}
            />

            <Modal
              title="Image"
              visible={isModalVisible}
              //onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <img width="480px" height="350px" src={`${img}`} />
              <br />

              <DeleteFilled
                style={{
                  fontSize: "30px",
                  color: "	#B22222",
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              />
            </Modal>
          </div>
        ))
      ) : (
        <>
          <h1>{fallback}</h1>
          <hr />
          <h3>No Image Uploaded Yet</h3>
        </>
      )}
    </div>
  );
};
export default ImageContainer;
