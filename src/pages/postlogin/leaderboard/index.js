import Breadcrumb from "components/common/breadcrumb";
import LeaderboardMain from "components/leaderboard";
import React, { useEffect, useState } from "react";
import { db } from "core/firebase/setup";
import { collection, getDocs } from "firebase/firestore";
import { Loading } from "components/common/loading";
import { utils } from "core/helper";

const Leaderboard = () => {
  const [leaderboardSettingsObj, setLeaderboardSettingsObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getConfig = async () => {
    setIsLoading(true);
    if (db) {
      const configCollectionRef = collection(db, "config");
      const configSnapshot = await getDocs(configCollectionRef);
      let configObj = configSnapshot.docs.find(
        (doc) => doc.id === "leaderboardStan"
      );
      let configObj1 = configSnapshot.docs.find((doc) => doc.data());
      configObj = configObj.data();
      setLeaderboardSettingsObj(configObj?.title?.[0]);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      await getConfig();
      utils.mixPannelEvent("leaderboard_page", "LEADERBOARD_PAGE", "leaderboard_page");
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  return (
    <div className="page_container">
      <Breadcrumb
        title="Leaderboard"
        winningBreakUp={true}
        leaderboardSettingsObj={leaderboardSettingsObj}
      />
      {isLoading && <Loading variant="light" />}
      {!isLoading && (
        <LeaderboardMain leaderboardSettingsObj={leaderboardSettingsObj} />
      )}
    </div>
  );
};

export default Leaderboard;
