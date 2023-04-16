import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Chip } from "@mui/material";

export default function MemberInfo() {
  const { userInfo } = useContext(UserContext);
  const tier = userInfo === null ? 0 : userInfo.tier;
  const points = userInfo === null ? 0 : userInfo.points;

  const tiers = ["CN Square Member", "CN Square Student", "CN Square VIP"];

  return (
    <Chip color="secondary" label={tiers[tier] + " | " + points + " pts"} />
  );
}
