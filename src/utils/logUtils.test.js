import { mapLogsToUserId, formatAndSortConversions } from "./logUtils";

const testLogs = [
  { time: "2013-04-19 15:26:10", type: "conversion", user_id: 1, revenue: 5.2 },
  { time: "2013-04-6 10:57:35", type: "conversion", user_id: 1, revenue: 16.9 },
  { time: "2013-04-24 19:20:09", type: "impression", user_id: 1, revenue: 0 },
  { time: "2013-04-16 07:20:32", type: "impression", user_id: 2, revenue: 0 },
  { time: "2013-04-21 02:06:43", type: "impression", user_id: 2, revenue: 0 },
  { time: "2013-04-09 09:08:25", type: "conversion", user_id: 2, revenue: 12.2 }
];

test("maps logs to user_id", () => {
  const result = mapLogsToUserId(testLogs);
  console.log(result);

  expect(result).toEqual({
    1: {
      revenue: 2210,
      impressions: 1,
      conversions: 2,
      dailyConversions: ["2013-04-19 15:26:10", "2013-04-6 10:57:35"]
    },
    2: {
      revenue: 1220,
      impressions: 2,
      conversions: 1,
      dailyConversions: ["2013-04-09 09:08:25"]
    }
  });
});

test("maps empty logs", () => {
  const result = mapLogsToUserId([]);
  expect(result).toEqual({});
});

const testConversions = [
  "2013-04-2 15:26:10",
  "2013-04-6 10:57:35",
  "2013-04-09 02:06:43",
  "2013-04-09 09:08:25",
  "2013-04-21 02:06:43"
];

test("format conversions", () => {
  const result = formatAndSortConversions(testConversions);
  expect(result).toEqual([
    { name: "04/02", uv: 1 },
    { name: "04/06", uv: 1 },

    { name: "04/09", uv: 2 },
    { name: "04/21", uv: 1 }
  ]);
});

test("format empty conversions", () => {
  const result = formatAndSortConversions([]);
  expect(result).toEqual([]);
});
