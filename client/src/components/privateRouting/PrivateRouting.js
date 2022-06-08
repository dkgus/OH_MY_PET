import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouting = ({
  component: Component,
  auth: { isAuthenticated },
}) => {
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRouting);
