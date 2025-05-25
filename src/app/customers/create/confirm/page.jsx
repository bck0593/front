"use client"; // もしクライアントコンポーネントなら追加

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card";

async function fetchCustomer(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers?customer_id=${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch customer");
  return res.json();
}

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const router = useRouter();

  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customer_id) {
      setError("顧客IDが指定されていません。");
      return;
    }
    fetchCustomer(customer_id)
      .then(data => setCustomer(data[0]))
      .catch(e => setError("顧客情報の取得に失敗しました: " + e.message));
  }, [customer_id]);

  if (error) {
    return (
      <div className="card bordered m-4 p-4 bg-red-100">
        <p>{error}</p>
        <button className="btn btn-primary mt-4" onClick={() => router.push("/customers")}>
          戻る
        </button>
      </div>
    );
  }

  if (!customer) {
    return <p className="m-4">読み込み中...</p>;
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">正常に作成しました</div>
      <OneCustomerInfoCard {...customer} />
      <button className="btn btn-primary m-4" onClick={() => router.push("/customers")}>
        戻る
      </button>
    </div>
  );
}
