import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BrowseEventsPage from "./pages/BrowseEventsPage";
import ErrorPage from "./pages/ErrorPage";
import EventPage, { eventLoader } from "./pages/EventPage";
import CreateEventsPage from "./pages/CreateEventPage";

const App = () => {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage></ErrorPage>,
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
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="sm:p-20">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
