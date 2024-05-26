export const requestFaucet = async (address: string) : Promise<string> => {
  const formData = new FormData();
  formData.set("address", address);

  return fetch("/api/fund", {
    method: "POST",
    body: formData,
  }).then(res => res.json()).then(res => res.tx_hash);
}
