import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import cnAxios from "../../utils/cn-axios";
import { Chip } from "@mui/material";

export default function MemberInfo() {
  const [tier, setTier] = useState(0);
  const [points, setPoints] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getUserObject();
  }, []);

  const getUserObject = () => {
    cnAxios
      .get(`/users/${user.id}`)
      .then((res) => {
        const data = res.data;

        setTier(data.tier);
        setPoints(data.points);
      })
      .catch((err) => console.log(err));
  };

  const tiers = ["CN Square Member", "CN Square Student", "CN Square VIP"];

  return (
    <Chip color="secondary" label={tiers[tier] + " | " + points + " pts"} />
  );
}
