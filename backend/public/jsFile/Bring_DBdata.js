export async function bringDBdata() {
  const getBringDataApi = async () => {
    const res = await fetch("/auth/bringData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  const res1 = await getBringDataApi();
  return JSON.parse(res1).nameData;
}
