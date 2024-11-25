import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const FORMATS = {
  date: "DD/MM/YYYY",
  dateTime: "DD/MM/YYYY hh:mm:ss A",
  time: "hh:mm:ss A",
  human: "DD MMMM YYYY",
} as const;
function formatDate(date: string | Date | Dayjs, format: keyof typeof FORMATS = "date") {
  return dayjs(date).format(FORMATS[format]);
}

export const formatters = {
  decimal: (value: number | string) => Number(value).toFixed(2),
  date: formatDate,
};
