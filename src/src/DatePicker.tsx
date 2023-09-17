import { useReducer } from "react";
import { getDateClasses, getDatesInMonth, groupDatesPerWeek } from "./utils/dates";

type State = {
    month: number;
    year: number;
};
type Action = { type: 'SET_MONTH'; payload: number } | { type: 'SET_YEAR'; payload: number };
  
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_MONTH':
        return { ...state, month: action.payload };
      case 'SET_YEAR':
        return { ...state, year: action.payload };
      default:
        return state;
    }
};

export default function DatePicker() {
    const initialState: State = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setMonth = (newMonth: number) => {
        dispatch({ type: 'SET_MONTH', payload: newMonth });
    };

    const setYear = (newYear: number) => {
        dispatch({ type: 'SET_YEAR', payload: newYear });
    };

    const dates = getDatesInMonth(state.year, state.month)

    const groupedDates = groupDatesPerWeek(dates)

    const firstDate = new Date(state.year, state.month - 1, 1);
    const lastDate = new Date(state.year, state.month, 0);
    const today = new Date();
  
    return (
        <div>
            <h1>Current Month: {state.month}</h1>
            <h1>Current Year: {state.year}</h1>
            <button onClick={() => setMonth(state.month - 1)}>Previous Month</button>
            <button onClick={() => setMonth(state.month + 1)}>Next Month</button>
            <button onClick={() => setYear(state.year - 1)}>Previous Year</button>
            <button onClick={() => setYear(state.year + 1)}>Next Year</button>

            <div className="calendar-grid">
                <div className="calendar-header">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                {groupedDates.map((week, weekIndex) => (
                    <div key={weekIndex} className="calendar-week">
                    {week.map((date, dateIndex) => (
                        <div
                        key={dateIndex}
                        className={getDateClasses(date, firstDate, lastDate, today)}

                        >
                        {date ? date.getDate() : ''}
                        </div>
                    ))}
                    </div>
                ))}
                </div>

        </div>
    );
}