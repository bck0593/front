import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers?customer_id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage({ searchParams }) {
  const id = searchParams?.id;

  if (!id) {
    return (
      <div className="alert alert-error m-4">
        エラー: 顧客IDが指定されていません。
      </div>
    );
  }

  let customerInfo;
  try {
    customerInfo = await fetchCustomer(id);
  } catch (error) {
    return (
      <div className="alert alert-error m-4">
        エラー: 顧客情報の取得に失敗しました。{error.message}
      </div>
    );
  }

  if (!customerInfo || customerInfo.length === 0) {
    return (
      <div className="alert alert-warning m-4">
        該当する顧客情報が見つかりませんでした。
      </div>
    );
  }

  return (
    <>
      <div className="alert alert-success m-4">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...(customerInfo[0] ?? {})} />
      </div>
      <button className="btn btn-outline btn-accent m-4">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}