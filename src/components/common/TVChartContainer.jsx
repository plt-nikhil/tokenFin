import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { widget } from "../../charting_library/charting_library.esm";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const TVChartContainer = ({ height }) => {
  const chartContainerRef = useRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const tokenList = useSelector((state) => state.tokenReducer.tokenList);
  const tvWidgetRef = useRef(null); // Use ref to store the widget instance

  const getSelectedTokenSymbol = () => {
    const selectedToken = tokenList?.find((s) => s.isSelected);
    return selectedToken?.symbol || "AAPL"; // Default symbol
  };

  const initializeChart = () => {
    if (tvWidgetRef.current) {
      tvWidgetRef.current.remove();
    }

    const widgetOptions = {
      symbol: getSelectedTokenSymbol(),
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        "https://demo_feed.tradingview.com"
      ),
      interval: "D",
      container: chartContainerRef.current,
      library_path: "/charting_library/",
      theme: "dark",
      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      studies_overrides: {},
    };

    const newWidget = new widget(widgetOptions);

    newWidget.onChartReady(() => {
      newWidget.headerReady().then(() => {
        const button = newWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          newWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

    tvWidgetRef.current = newWidget;
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "datafeeds/udf/dist/bundle.js";
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      initializeChart();
    }

    // Clean up on component unmount
    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
      }
    };
  }, [scriptLoaded, tokenList]);

  return (
    <div
      ref={chartContainerRef}
      className={"TVChartContainer"}
      id="tv_chart_container"
      style={{ height: height + "vh" }}
    />
  );
};
