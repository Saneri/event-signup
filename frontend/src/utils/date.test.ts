import { formatDateAndTime } from "./date";

describe("formatDateAndTime", () => {
  it("should return date and time", () => {
    const act = formatDateAndTime("2023-10-19T15:15");
    const exp = "19.10.2023 15.15.00";
    expect(act).toBe(exp);
  });

  it("should return invalid date", () => {
    const act = formatDateAndTime("definatelyNotDate");
    const exp = "Invalid date";
    expect(act).toBe(exp);
  });
});
