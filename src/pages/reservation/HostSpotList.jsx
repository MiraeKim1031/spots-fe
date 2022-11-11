import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getPrivateSpot } from "../../redux/modules/privateSlice";
import { HostSpots, MapPlace, Place, PlaceList } from "./Style";

const SpotList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeList = useSelector((state) => state.privateSpot.privateSpot.data);

  console.log("플레이스리스트에들은거", placeList);
  //   useEffect(() => {
  //     dispatch(__getPrivateSpot());
  //   }, [dispatch]);
  return (
    <>
      <HostSpots>
        <MapPlace>??</MapPlace>
        <PlaceList>
          {placeList?.map((place) => {
            console.log("아이디왜안나왕", place.placesId);
            return (
              <Place key={place.placesId}>
                <h3>{place.spotName}</h3>
                <button
                  onClick={() => navigate(`/spotsdetail/${place.placesId}`)}
                >
                  예약하러가기
                </button>
                <div>
                  {place.sports}
                  <span>{place.spotKind}</span>
                  <span>{place.price}</span>
                </div>
              </Place>
            );
          })}
        </PlaceList>
      </HostSpots>
    </>
  );
};

export default SpotList;
