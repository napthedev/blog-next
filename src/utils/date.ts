import dayjs from "dayjs";

export const formatDate = (date: string | number) => {
  return dayjs(date).format("MMMM DD, YYYY");
};
