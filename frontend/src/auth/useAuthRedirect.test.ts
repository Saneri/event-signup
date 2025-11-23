import { renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Mock } from "vitest";

import { useUser } from "../providers/UserProvider";
import { useAuthRedirect } from "./useAuthRedirect";

/**
 * @vitest-environment jsdom
 */

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../providers/UserProvider", () => ({
  useUser: vi.fn(),
}));

describe("useAuthRedirect", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect to /login if not loading and session is null", () => {
    (useUser as Mock).mockReturnValue({ session: null, loading: false });

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should not redirect if loading is true", () => {
    (useUser as Mock).mockReturnValue({ session: null, loading: true });

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should not redirect if session is present", () => {
    (useUser as Mock).mockReturnValue({
      session: { userSub: "sub" },
      loading: false,
    });

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
