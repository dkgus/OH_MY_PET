import { useEffect } from "react";
import { connect } from "react-redux";
import { updateRoom } from "../../../actions/room";
import { getMyInfo } from "../../../actions/myPage";
import { useParams } from "react-router-dom";

const EditRoom = ({ myInfo, getMyInfo, updateRoom }) => {
  const { id } = useParams();
  let pageIndex = [];

  useEffect(() => {
    getMyInfo(id);
    console.log("id", id);
  }, [getMyInfo]);

  useEffect(() => {
    updateRoom({ id, pageIndex });
  }, [updateRoom]);

  //myInfo의 id와 호출해서 받아온 데이터의 값이 같다면?..
  myInfo &&
    myInfo.map((item, index) => {
      console.log("item._id", item._id);
      console.log("index", index);

      pageIndex.push(index);
      console.log("pageIndex", pageIndex);
    });

  return <>EditRoom</>;
};

const mapStateToProps = (state) => ({
  myInfo: state.myPage.myInfo,
});

export default connect(mapStateToProps, { getMyInfo, updateRoom })(EditRoom);
