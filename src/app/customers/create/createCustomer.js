const createCustomer = async (formData) => {
  const customer_name = formData.get("customer_name");
  const age = formData.get("age");
  const gender = formData.get("gender");

  // ここでAPIサーバーにPOSTリクエスト
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_name, age, gender }),
  });

  if (!res.ok) {
    throw new Error("顧客作成APIエラー");
  }
  return res.json(); // { customer_id: ... } が返る想定
};

export default createCustomer;