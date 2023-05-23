import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const errorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return error.statusText;
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    console.error(error)
    return 'Unknown error'
  }
};

// https://github.com/remix-run/react-router/discussions/9628#discussioncomment-5555901;
export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="w-full h-full text-white grid place-content-center dark:bg-gray-800">
      <p className="text-6xl font-bold">{errorMessage(error)}</p>
    </div>
  );
}