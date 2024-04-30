import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Chip } from "@mui/material";

export default function MemberInfo() {
  const { userInfo } = useContext(UserContext);
  const [tier, setTier] = useState(0);
  const [points, setPoints] = useState(0);
  useEffect(() => {
    setTier(userInfo === null ? 0 : userInfo.tier);
    setPoints(userInfo === null ? 0 : userInfo.points);
  }, [userInfo]);

  const tiers = ["Welcome", "Welcome", "Welcome"];

  return (
    <Chip color="secondary" label={tiers[tier] + ', ' + userInfo?.firstName + "!"} />
  );
}
