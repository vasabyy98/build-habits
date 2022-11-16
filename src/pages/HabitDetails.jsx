import React from "react";
import { useLocation } from "react-router-dom";

function HabitDetails() {
  const location = useLocation();
  const habitData = location.state.habit.data;
  const habitId = location.state.habit.id;

  return <div>HabitDetails</div>;
}

export default HabitDetails;
