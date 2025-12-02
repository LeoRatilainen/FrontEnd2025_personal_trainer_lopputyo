import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Training, Customer } from "../types";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

type TrainingWithCustomer = Training & { customerName: string };

export default function CalendarView() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await fetch(import.meta.env.VITE_API_URL + "/trainings");
        const trainingsRaw: Training[] = (await data.json())._embedded.trainings;

        const enriched: TrainingWithCustomer[] = await Promise.all(
          trainingsRaw.map(async (t) => {
            try {
              const res = await fetch(t._links.customer.href);
              const customer: Customer = await res.json();
              return { ...t, customerName: `${customer.firstname} ${customer.lastname}` };
            } catch {
              return { ...t, customerName: "Unknown" };
            }
          })
        );

        setTrainings(enriched);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrainings();
  }, []);

  const events = trainings.map((t, idx) => {
    const start = new Date(t.date);
    const end = new Date(start.getTime() + Number(t.duration) * 60000);
    return { id: idx, title: `${t.activity} — ${t.customerName}`, start, end };
  });

  return (
    <div style={{ height: 600, margin: "0 1rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        style={{ height: "100%" }}
      />
    </div>
  );
}