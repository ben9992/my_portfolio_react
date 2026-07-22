import React from "react";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SddDemo from "./SddDemo";
import { RUNS } from "./sddRuns";

/**
 * Drives a whole replay: start, clear every human gate, and assert the run
 * reaches completion with every artifact unlocked. Timers are faked so the
 * test does not wait out the real dwell times.
 */

const renderDemo = () =>
  render(<MemoryRouter><SddDemo /></MemoryRouter>);

// Push the player forward past all pending log-line timers.
const advance = (ms = 30000) => act(() => { jest.advanceTimersByTime(ms); });

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("a run reaches completion only by clearing each human gate", () => {
  renderDemo();
  const run = RUNS[0];
  const gateCount = run.stages.filter((s) => s.gate).length;
  expect(gateCount).toBeGreaterThan(0);

  fireEvent.click(screen.getByRole("button", { name: /run the ticket/i }));

  for (let i = 0; i < gateCount; i++) {
    advance();
    // The pipeline must stop and wait for a human.
    const approve = screen.getByRole("button", { name: /approve/i });
    expect(approve).toBeInTheDocument();
    fireEvent.click(approve);
  }

  advance();

  expect(screen.queryByRole("button", { name: /approve/i })).not.toBeInTheDocument();
  expect(screen.getByText(/run complete/i)).toBeInTheDocument();
});

test("the pipeline does not advance past a gate on its own", () => {
  renderDemo();
  fireEvent.click(screen.getByRole("button", { name: /run the ticket/i }));

  advance(); // reach the first gate
  expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument();

  advance(120000); // a long wait must change nothing
  expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument();
  expect(screen.queryByText(/run complete/i)).not.toBeInTheDocument();
});

test("every artifact is unlocked by the end of the run", () => {
  renderDemo();
  const run = RUNS[0];
  const expected = run.stages.filter((s) => s.artifact).map((s) => s.artifact);

  fireEvent.click(screen.getByRole("button", { name: /run the ticket/i }));
  for (let i = 0; i < run.stages.filter((s) => s.gate).length; i++) {
    advance();
    fireEvent.click(screen.getByRole("button", { name: /approve/i }));
  }
  advance();

  expected.forEach((key) => {
    expect(screen.getByRole("button", { name: run.artifacts[key].label })).toBeInTheDocument();
  });
});

test("reset returns the run to its starting state", () => {
  renderDemo();
  fireEvent.click(screen.getByRole("button", { name: /run the ticket/i }));
  advance();
  expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /reset/i }));

  expect(screen.queryByRole("button", { name: /approve/i })).not.toBeInTheDocument();
  expect(screen.getByText(/press/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /run the ticket/i })).toBeEnabled();
});

test("switching tickets resets the player", () => {
  renderDemo();
  fireEvent.click(screen.getByRole("button", { name: /run the ticket/i }));
  advance();
  expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument();

  // Pick the second ticket from the picker.
  fireEvent.click(screen.getByText(RUNS[1].title));

  expect(screen.queryByRole("button", { name: /approve/i })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /run the ticket/i })).toBeEnabled();
});

test("each run's review stage raises a blocking finding", () => {
  // The demo's whole point is the clean-context reviewer catching something real.
  RUNS.forEach((run) => {
    const review = run.stages.find((s) => s.id === "review");
    expect(review).toBeDefined();
    expect(review.gate).toBe(true);
    expect(review.logs.some((l) => l.t === "bug")).toBe(true);
    expect(run.artifacts.review.body).toMatch(/BLOCKING/);
  });
});

test("every stage that claims an artifact actually has one defined", () => {
  RUNS.forEach((run) => {
    run.stages.forEach((s) => {
      if (s.artifact) expect(run.artifacts[s.artifact]).toBeDefined();
    });
  });
});
