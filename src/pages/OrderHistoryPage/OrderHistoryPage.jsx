import { checkToken } from '../../utilities/users-service';
import OrderList from "../../components/OrderList/OrderList"

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  return (
    <>
      <OrderList />
    </>
  );
}