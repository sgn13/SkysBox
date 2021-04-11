import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { NavItem } from "react-bootstrap";
import LoginModal from "../../components/auth/LoginModel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const ImageContainer = (props) => {
  const { newImage } = props;
  const { user, isAuthenticated, token, isLoading } = props;
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState("");
  const [del, setDel] = useState("");
  const history = useHistory();
  const showModal = (e) => {
    console.log(e.target.alt, "asas");
    setImg(e.target.src);
    setDel(e.target.alt);
    setIsModalVisible(true);
  };

  const handleEdit = () => {
    history.push(`/filter/${del}`);
  };

  const handleCancel = (e) => {
    console.log(e.target);
    setIsModalVisible(false);
  };

  console.log(props.auth);
  console.log(props.auth.user?._id, "user");

  var id = props.auth.user?._id;

  const getImages = async (req, res) => {
    try {
      const res = await axios.get(`api/img/${id}`);
      console.log(res);
      if (!res.data.f) {
        setFallback(res.data.msg);
        return;
      } else {
        console.log(res.data.f, "result");
        setImages(res.data.f);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getImages();
  }, [isAuthenticated == true]);

  const handleDelete = () => {
    {
      if (window.confirm("Are you sure you wish to delete this item?"))
        axios.delete(`/api/img/${del}`).then((res) => {
          window.location.reload();
          console.log(res);
          console.log(res.data);
        });
    }
  };
  ImageContainer.propTypes = {
    isAuthenticated: PropTypes.bool,
    //payload: PropTypes.string
  };

  const configureImage = (image) => {
    // const id = this.props.payload._id;
    return `http://localhost:5000/` + image;
  };

  return (
    <div>
      {isAuthenticated == true ? (
        <div
          className="savedImage container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <h4 className="text-center container p-4">Gallery</h4>
          {images.map((image, i) => (
            <div className="row" value={image}>
              <div className="col-sm" value={image}>
                <img
                  src={configureImage(image)}
                  key={images}
                  alt={image}
                  width="30%"
                  className="image"
                  style={{ margin: "10px 0", cursor: "pointer" }}
                  onClick={showModal}
                />
              </div>
            </div>
          ))}
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
                width: "300px",
                fontSize: "30px",
                color: "	#B22222",
                cursor: "pointer",
              }}
              onClick={handleDelete}
            />

            <EditFilled
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={handleEdit}
            />
          </Modal>
        </div>
      ) : (
        <div
          className="login"
          style={{ textAlign: "center", marginTop: "100px" }}
        >
          <h1> Please login to continue.....</h1>
          <Button variant="outline-secondary" className="mr-sm-4">
            <NavItem>
              <LoginModal />
            </NavItem>
          </Button>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToProps, {})(ImageContainer);
