"use client";

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function InnerConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");

  const [customer, setCustomer] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!customer_id || customer_id === "null") {
      setError(true);
      setErrorMessage("顧客IDが無効です。URLのクエリパラメータを確認してください。");
      return;
    }

    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData);
      } catch (error) {
        setError(true);
        setErrorMessage("顧客情報の取得に失敗しました。詳細: " + error.message);
      }
    };

    fetchAndSetCustomer();
  }, [customer_id]);

  if (error) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-danger p-4 text-center">{errorMessage}</div>
        <button onClick={() => router.push("/customers")}>
          <div className="btn btn-primary m-4 text-2xl">戻る</div>
        </button>
      </div>
    );
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">正常に作成しました</div>
      <OneCustomerInfoCard {...customer} />
      <button onClick={() => router.push("/customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <InnerConfirmPage />
    </Suspense>
  );
}
