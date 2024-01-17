import { Link, useRouteError } from "react-router-dom";

const TokenError = () => {

  const error : any = useRouteError();


  return (
    <>
      <div className="flex min-h-full flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
          <p className="text-base font-semibold leading-8 text-AAPrimary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{ error.message }</h1>
          <p className="mt-6 text-base leading-7 text-gray-600"> Make sure you have the right token </p>
          <div className="mt-10">
            <Link to="/" className="text-sm font-semibold leading-7 text-AAPrimary">
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

export default TokenError
