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
import { Amplify } from "aws-amplify";

const redirectUri = import.meta.env.VITE_LOGIN_REDIRECT_URI;

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: import.meta.env.VITE_CLIENT_ID,
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      loginWith: {
        oauth: {
          domain: "event-signup.auth.eu-west-1.amazoncognito.com",
          redirectSignIn: [redirectUri],
          redirectSignOut: [redirectUri],
          responseType: "code",
          scopes: [
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
        },
      },
    },
  },
});

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
      <div className="px-5 sm:px-20">
        <Navbar />
        <Outlet />
      </div>
    );
  }

  function ErrorElement() {
    return (
      <div className="px-5 sm:px-20">
        <Navbar />
        <ErrorPage />
      </div>
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
