"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (formData) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_age = formData.get("age");
  const creating_gender = formData.get("gender");

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    age: creating_age,
    gender: creating_gender,
  });

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });

  if (!res.ok) {
    throw new Error("Failed to create customer");
  }

  const createdCustomer = await res.json();
  console.log("createdCustomer:", createdCustomer);

  // 顧客IDを返す
  return {
    customer_id: createdCustomer.customer_id,
  };
};

export default createCustomer;
