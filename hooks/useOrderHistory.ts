import axios from "axios";
import React from "react";
import { BASE_URL } from "@env";

import { Order, OrderStatus } from "../types";
import { getFromSecureStore } from "../utills/secureStoreHelper";

type Props = {
  customerId: string;
  status: OrderStatus;
  limit: number;
};

type FetchOrderFuncProps = { status: OrderStatus; limit: number; page: number };

export const useOrderHistory = ({ customerId, status, limit }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);

  const fetchOrders = React.useCallback(
    async ({ status, limit = 10, page }: FetchOrderFuncProps) => {
      setLoading(true);
      const authToken = (await getFromSecureStore("auth_token")) as string;
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/customer/order/get_orders?id=${customerId}&status=${status}&limit=${limit}&page=${page}`,
          config
        );
        setLoading(false);

        if (data?.page === 1) {
          setOrders(data?.orders);
        }
        else {
          setOrders((state) => [...state, ...data?.orders]);
        }

        setHasMore(orders.length < data.totalCount);
        setTotalCount(data?.totalCount);
        setPage(data?.page);
      } catch (e: any) {
        setLoading(false);
        console.log("Request Error Occured: ", e);
        console.log("Request Error Occured: ", e.response.data);
      }
    },
    []
  );

  const fetchMore = () => {
    fetchOrders({ page: page + 1, status, limit });
  };

  React.useEffect(() => {
    if (orders.length) return;
    fetchOrders({ status, limit, page: 1 });
  }, [status, limit, orders]);

  return { loading, orders, totalCount, page, hasMore, fetchMore, fetchOrders };
};
