import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import BrowseEventsPage from "./pages/BrowseEventsPage";
import ErrorPage from "./pages/ErrorPage";
import EventPage, { eventLoader } from "./pages/EventPage";
import CreateEventsPage from "./pages/CreateEventPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { UserProvider } from "./providers/UserProvider";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <NavbarWrapper />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <BrowseEventsPage />,
            },
            {
              path: "/create",
              element: <CreateEventsPage />,
            },
            {
              path: "/events/:id",
              element: <EventPage />,
              loader: eventLoader,
            },
          ],
        },
      ],
    },
  ]);

  function NavbarWrapper() {
    return (
      <>
        <Navbar />
        <div className="sm:p-20">
          <Outlet />
        </div>
      </>
    );
  }

  function ErrorElement() {
    return (
      <>
        <Navbar />
        <div className="sm:p-20">
          <ErrorPage />
        </div>
      </>
    );
  }

  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
