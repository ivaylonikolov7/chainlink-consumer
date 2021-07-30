import { useState } from "react";

import getAPIConsumerContract from "../lib/getAPIConsumerContract";

const useAPIConsumerRequestData = (address: string) => {
  const [requestDataCallError, setRequestDataCallError] = useState("");
  const [requestDataTxHash, setRequestDataTxHash] = useState("");
  const [requestPending, setRequestPending] = useState(false);
  const requestData = async () => {
    if (!address) {
      return;
    }

    try {
      setRequestPending(true);
      setRequestDataCallError("");
      const tx = await getAPIConsumerContract(address).requestVolumeData();
      await tx.wait();
      setRequestDataTxHash(tx.hash);
      setRequestPending(false);
    } catch (e) {
      console.error(e);
      setRequestDataCallError(e.message);
    }
  };

  return {
    requestData,
    requestDataCallError,
    requestDataTxHash,
    requestPending,
  };
};

export default useAPIConsumerRequestData;