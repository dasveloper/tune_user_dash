import React, { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import NumberFormat from "react-number-format";
import { randomColor } from "../utils/randomColor";

//Lazy load ConversionChart so we can render cards while waiting on formatting of chart data
const ConversionChart = React.lazy(() => import("./ConversionChart"));


export const UserCard = ({ user, logs }) => {
  const { name, avatar, occupation } = user;
  const { impressions, conversions, revenue, dailyConversions } = logs || {};

  return (
    <div className="user-card">
      <div className="user-card__top">
        <UserAvatar background={randomColor()} name={name} avatar={avatar} />
        <div className="user-card__user-details">
          <p className="user-card__name">{name}</p>
          <p className="user-card__occupation">{occupation}</p>
        </div>
      </div>
      <div className="user-card__bottom">
        <div className="user-card__chart-wrapper">
          <Suspense
            fallback={
              <div className="user-card__chart-loader">
                <p className="user-card__chart-loader-text">
                  Loading chart data...
                </p>
              </div>
            }
          >
            <ConversionChart conversions={dailyConversions} />
          </Suspense>
        </div>
        <div className="user-card__stats-wrapper">
          <div className="user-card__stats">
            <p className="user-card__stats-amount user-card__stats-amount--impressions">
              {impressions}
            </p>
            <p className="user-card__stats-title">impressions</p>
          </div>
          <div className="user-card__stats">
            <p className="user-card__stats-amount user-card__stats-amount--conversions">
              {conversions}
            </p>
            <p className="user-card__stats-title">conversions</p>
          </div>
          <div className="user-card__stats">
            <p className="user-card__stats-amount user-card__stats-amount--revenue">
              <NumberFormat
                value={revenue / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
