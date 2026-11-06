import "@testing-library/jest-dom/vitest";
import {afterEach} from "vitest";
import {cleanup} from "@testing-library/react";
import {resetPortfolioStore} from "@/infrastructure/portfolioApi";

afterEach(() => {
    cleanup();
    resetPortfolioStore();
});
