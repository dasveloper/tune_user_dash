import moment from "moment";

//Maps logs data to user_id
export const mapLogsToUserId = logs => {
  const result = logs.reduce((acc, { user_id, revenue, type, time }) => {
    let curObj = acc[user_id] || {
      revenue: 0,
      impressions: 0,
      conversions: 0,
      dailyConversions: []
    };
    acc[user_id] = {
      revenue: curObj.revenue + revenue * 100,
      impressions: curObj.impressions + (type === "impression" ? 1 : 0),
      conversions: curObj.conversions + (type === "conversion" ? 1 : 0),
      dailyConversions:
        type === "conversion"
          ? [...curObj.dailyConversions, time]
          : curObj.dailyConversions
    };
    return acc;
  }, {});
  return result;
};

//Generic memoizer
let memoize = fn => {
  const cache = {};
  return (...args) => {
    if (cache[args]) {
      return cache[args];
    }
    const result = fn.apply(this, args);
    cache[args] = result;
    return result;
  };
};

export const formatAndSortConversions = memoize(conversions => {
  //Count number of conversions per day
  let countObject = {};
  for (let i = 0; i < conversions.length; i++) {
    const date = moment(conversions[i]).format("MM/DD");
    countObject[date] = countObject[date] + 1 || 1;
  }
  //Format the counts in the format needed by Rechart, {name: date, uv: count}
  let formattedArr = [];
  for (let key in countObject) {
    formattedArr.push({ name: key, uv: countObject[key] });
  }

  //Sort dates
  formattedArr.sort(
    (a, b) =>
      moment(a.name).format("YYYYMMDD") - moment(b.name).format("YYYYMMDD")
  );
  return formattedArr;
});
