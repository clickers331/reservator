import React from "react";
import TimeCard from "../TimeCard";
import { nanoid } from "nanoid";
import { getAllRendezvousDay } from "../../api";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { useTheme } from "styled-components";

async function loader({ params: { month, day } }) {
  return defer({ dayData: getAllRendezvousDay("2023", month, day) });
}

export default function Day() {
  const { dayData } = useLoaderData();
  const theme = useTheme();
  return (
    <Suspense fallback={<h1>Yukleniveriveriyor</h1>}>
      <Await resolve={dayData}>
        {(dayData) => {
          return (
            <TimeCard dayView>
              <p>10</p>
              {...dayData.map(({ date, name }) => (
                <p key={nanoid()}>
                  <span
                    style={{
                      width: "30%",
                      textAlign: "right",
                      fontWeight: "700",
                      color: theme.colors.neutrals[200],
                      fontSize: "1em",
                      padding: "0.2em",
                    }}
                  >
                    {new Date(date).getHours()}:00
                  </span>
                  <span
                    style={{
                      width: "70%",
                      textAlign: "left",
                      fontWeight: "700",
                      color: theme.colors.neutrals[100],
                      fontSize: "1.2em",
                      padding: "0.2em",
                    }}
                  >
                    {name}
                  </span>
                </p>
              ))}
            </TimeCard>
          );
        }}
      </Await>
    </Suspense>
  );
}

Day.loader = loader;
