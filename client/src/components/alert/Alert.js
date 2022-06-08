import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { MdOutlinePets } from "react-icons/md";

const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <ToastContainer position="top-end" className="p-3">
        <Toast>
          <Toast.Header
            closeButton={false}
            style={{ backgroundColor: "#ffaf2d" }}
          >
            <MdOutlinePets
              style={{
                color: "white",
                marginBottom: "5px",
                marginRight: "3px",
                fontSize: "1.2rem",
              }}
            />
            <strong className="me-auto">OH MY PET</strong>
          </Toast.Header>
          <Toast.Body>
            <div style={{ fontWeight: "bold" }} key={alert.id}>
              {alert.msg}
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
