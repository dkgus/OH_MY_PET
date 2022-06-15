import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateRoom } from "../../../actions/room";
import { useParams } from "react-router-dom";

const EditRoom = ({ updateRoom }) => {
  const { id } = useParams();
  console.log("id", id);
  let num = "1";

  useEffect(() => {
    updateRoom({ id, num });
  }, [updateRoom]);

  return <div>EditRoom</div>;
};

export default connect(null, { updateRoom })(EditRoom);
