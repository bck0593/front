"use client";
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import createCustomer from './createCustomer';

export default function CreatePage() {
    const formRef = useRef();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);

        try {
            // 顧客作成処理
            const customerData = await createCustomer(formData); // ここで顧客データを作成
            console.log("Customer created with ID:", customerData.customer_id); // 顧客IDを確認

            // 作成された顧客IDを使ってリダイレクト
            if (customerData.customer_id) {
                router.push(`/customers/create/confirm?customer_id=${customerData.customer_id}`);
            } else {
                console.error("顧客IDが取得できませんでした");
            }
        } catch (error) {
            console.error("顧客作成に失敗しました:", error);
            alert("顧客の作成に失敗しました");
        }
    };

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
                <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="card-body">
                            <h2 className="card-title">
                                <p><input type="text" name="customer_name" placeholder="桃太郎" className="input input-bordered" /></p>
                            </h2>
                            <p>Age:<input type="number" name="age" placeholder="30" className="input input-bordered" /></p>
                            <p>Gender:<input type="text" name="gender" placeholder="女" className="input input-bordered" /></p>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn btn-primary m-4 text-2xl">
                                作成
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
